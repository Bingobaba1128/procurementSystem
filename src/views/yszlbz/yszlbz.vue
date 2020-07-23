<template>
  <el-card>
    <!-- 检索区 -->
    <el-row :gutter="10">
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">产地</div>
        <el-select v-model="queryInfo.chanDi" clearable placeholder="请选择">
          <el-option
            v-for="item in chanDiList"
            :key="item.chanDi"
            :label="item.chanDi"
            :value="item.chanDi"
          />
        </el-select>
      </el-col>

      <el-col :span="6" class="searchCombo">
        <div class="searchHeader">支数（折算支数）</div>

        <el-input v-model="queryInfo.shaZhi" placeholder="请选择" clearable type="number" />
      </el-col>

      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">工艺停用</div>
        <el-select v-model="queryInfo.gytybz" clearable placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">停用</div>
        <el-select v-model="queryInfo.tybz" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">

      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">吊牌</div>
        <el-select v-model="queryInfo.dpbz" clearable placeholder="请选择">
          <el-option
            v-for="item in diaoPaiList"
            :key="item.diaoPai"
            :label="item.diaoPai"
            :value="item.diaoPai"
          />
        </el-select>
      </el-col>
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">原纱颜色</div>
        <el-select v-model="queryInfo.yanSe" clearable placeholder="请选择">
          <el-option
            v-for="item in yanSeList"
            :key="item.yanSe"
            :label="item.yanSe"
            :value="item.yanSe"
          />
        </el-select>
      </el-col>
      <el-col :span="6" class="searchCombo">
        <div class="searchHeader">名称</div>

        <el-input v-model="queryInfo.name" placeholder="请输入名称" clearable />
      </el-col>

    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="12" class="searchCombo">
        <div class="searchHeader">每包个数</div>

        <el-input v-model="queryInfo.meiBaoGeShu1" placeholder="请输入最低个数" clearable type="number" @change="triggerGeShu2" />
        ~
        <el-input v-model="queryInfo.meiBaoGeShu2" placeholder="请输入最高个数" clearable type="number" />

      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain @click="saveToServe">批量存入</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table id="out-table" :data="initAllData" height="500" border stripe @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="型号" prop="xingHao" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />
        <el-table-column label="每包个数" prop="meiBaoGeShu">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.meiBaoGeShu"
              placeholder="请输入每包个数"
              type="number"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="每包重量" prop="meiBaoZhongLiang">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.meiBaoZhongLiang"
              placeholder="请输入每包重量"
              type="number"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="原纱定长" prop="yuanShaDingChang" />

        <el-table-column label="原纱使用长度" prop="yuanShaUserLength">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.yuanShaUserLength"
              placeholder="请输入使用长度"
              type="number"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="原纱定长使用率" prop="yuanShaUserLv">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.yuanShaUserLv"
              placeholder="请输入定长使用率"
              type="number"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="原纱定长" prop="biLi" />

      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize*10"
          :current-page="pageSetting.pageNumber"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>

  </el-card>
</template>

<script>
import { getAllData, getSettingList, saveNewForm } from '@/api/yszlbz'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'

export default {

  data() {
    return {
      initAllData: '',
      queryInfo: {
        chanDi: '',
        shaZhi: '',
        gytybz: '',
        tybz: '',
        yanSe: '',
        dpbz: '',
        name: '',
        meiBaoGeShu1: '',
        meiBaoGeShu2: ''
      },
      options: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ],
      options1: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ],
      fenLeiList: [
        {
          value: 'T类'
        },
        {
          value: '开发类'
        },
        {
          value: '主力类'
        },
        {
          value: '常备类'
        },
        {
          value: '淘汰类'
        }
      ],
      editData: '',
      yanSeList: '',
      diaoPaiList: '',
      chanDiList: '',
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      multipleSelection: [],
      totalSize: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {

    // 数据初始化
    initData() {
      var url = '/loadZhongLiang?'
      var urlParam = toUrlParam(url, this.pageSetting)
      getAllData(urlParam).then(res => {
        this.initAllData = res.data.data
        this.totalSize = this.initAllData[0].pageQuanity
      })
      getSettingList('getAllYarnYanSeName').then(res => {
        this.yanSeList = res.data.data
      })
      getSettingList('getAllYarnDiaoPaiName').then(res => {
        this.diaoPaiList = res.data.data
      })
      getSettingList('getAllYarnChanDiName').then(res => {
        this.chanDiList = res.data.data
      })
    },

    searchData() {
      window.console.log(this.queryInfo)
      // if (this.queryInfo.meiBaoGeShu2 < this.queryInfo.meiBaoGeShu1) {
      //   window.console.log(this.queryInfo.meiBaoGeShu2)
      //   window.console.log(this.queryInfo.meiBaoGeShu1)
      //   this.$message.error('输入的最高个数要大于最低个数')
      // } else {
      this.$set(this.queryInfo, 'pageNumber', this.pageSetting.pageNumber)
      this.$set(this.queryInfo, 'pageSize', this.pageSetting.pageSize)

      var url = baseUrl + '/loadZhongLiang?'
      var urlParam = toUrlParam(url, this.queryInfo)
      window.console.log(urlParam)
      getAllData(urlParam).then(res => {
        this.initAllData = res.data.data
      })
      //       this.$set(this.queryInfo, 'pageNumber', this.pageSetting.pageNumber)
      // this.$set(this.queryInfo, 'pageSize', this.pageSetting.pageSize)

      // var url = baseUrl + '/loadZhongLiang?'
      // var urlParam = toUrlParam(url, this.queryInfo)
      // window.console.log(urlParam)
      // getAllData(urlParam).then(res => {
      //   this.initAllData = res.data.data
      // })
    },
    // 勾选表单
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    saveToServe() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请勾选需要存入的条目')
      } else {
        window.console.log(this.multipleSelection)
        this.multipleSelection.map(object => {
          window.console.log(object)
          if (object.meiBaoGeShu == '' || object.meiBaoZhongLiang == '' || object.yuanShaUserLength == null || object.yuanShaUserLv == null) {
            this.$message.error('请填写需要输入的部分')
          } 
          else {
            saveNewForm(this.multipleSelection).then(res => {
              if (res.data.code !== 200) {
                this.$message.error(res.data.data)
              } else {
                this.$message.success(res.data.data)
                this.initData()
              }
            })
          }
        })
      }
      // saveNewForm(this.multipleSelection).then(res => {
      //   if (res.data.code !== 200) {
      //     this.$message.error(res.data.data)
      //   } else {
      //     this.$message.success(res.data.data)
      //     this.initData()
      //   }
      // })
    },
    triggerGeShu2() {
      this.queryInfo.meiBaoGeShu2 = this.queryInfo.meiBaoGeShu1
    },
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData()
    }
  }
}
</script>

<style scrope>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}

.jingsha .el-dialog {
  width: 20%;
}
.searchCombo {
  display: flex;
}
.searchHeader {
  width:auto;
    display: flex !important;
    align-items: center;
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    padding: 0 20px;
    white-space: nowrap;
}
</style>
