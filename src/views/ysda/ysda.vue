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
            v-for="item in options"
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
      <el-col :span="6" class="searchCombo">
        <div class="searchHeader">型号</div>

        <el-input v-model="queryInfo.xingHao" placeholder="请输入型号" clearable />
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">

      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">分类</div>
        <el-select v-model="queryInfo.fl" clearable placeholder="请选择">
          <el-option
            v-for="item in fenLeiList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row style="margin-bottom: 20px; margin-top: 20px">
      <el-col :span="2">
        <el-button type="primary" plain @click="addNewRecord">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="handleExport">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-dialog v-if="dialogAddTableVisible" title="原纱档案（新增）" :visible.sync="dialogAddTableVisible" fullscreen>
      <addNewForm @closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog v-if="dialogEditTableVisible && editData" title="原纱档案（修改）" :visible.sync="dialogEditTableVisible" fullscreen>
      <editForm :key="editData.id" :param="editData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-row>
      <el-table id="out-table" :data="initAllData" height="500" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" show-overflow-tooltip />
        <el-table-column label="类型" prop="fl" show-overflow-tooltip />
        <el-table-column label="名称" prop="name" show-overflow-tooltip />
        <el-table-column label="属性" prop="shuXingList" width="160" show-overflow-tooltip />
        <el-table-column label="型号" prop="xingHao" show-overflow-tooltip />
        <el-table-column label="支数（折算支数）" prop="shaZhi" show-overflow-tooltip />
        <el-table-column label="核算价格（万元/吨）" prop="hsjg" show-overflow-tooltip />
        <el-table-column label="工艺标志" prop="jspsbz" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            {{ statusCheck(scope.row.jspsbz) }}
          </template> -->
        </el-table-column>

        <el-table-column label="成分" prop="chengFen" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.chengFen" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note" width="160" show-overflow-tooltip />

        <el-table-column label="停用标志" prop="tybz" show-overflow-tooltip />
        <el-table-column label="单纱强力标准" prop="dsqlbz" show-overflow-tooltip />
        <el-table-column label="最低单纱强力标准" prop="zddsqlbz" show-overflow-tooltip />
        <el-table-column label="强力CV标准" prop="qlcvbz" show-overflow-tooltip />
        <el-table-column label="支偏上限标准" prop="zpsbz" show-overflow-tooltip />
        <el-table-column label="捻度标准" prop="ndbz" show-overflow-tooltip />
        <el-table-column label="捻系数标准" prop="nxsbz" show-overflow-tooltip />
        <el-table-column label="断裂伸长率标准" prop="dlsclbz" show-overflow-tooltip />
        <el-table-column label="条干（CV）标准" prop="tgbz" show-overflow-tooltip />
        <el-table-column label="存货编码" prop="chbm" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editDataM(scope.row.id)">修改</el-button>
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize*10"
          :current-page="pageSetting.PageIndex"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>

  </el-card>
</template>

<script>
import { getAllYarnArchives, deleteRecord, getOneRecord, getSettingList, searchBycCondition } from '@/api/ysda'
import addNewForm from '@/views/ysda/addNewDa'
import editForm from '@/views/ysda/editForm'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    addNewForm,
    editForm
  },

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
        xingHao: '',
        fl: ''
      },
      options: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        },
        {
          value: '全部',
          label: '全部'
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
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: '',
      yanSeList: '',
      diaoPaiList: '',
      chanDiList: '',
      totalSize: '',
      pageSetting: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },

  created() {
    this.initData()
  },

  methods: {

    // 数据初始化
    initData() {
      var url = '/api/getAllYarnArchives?'
      var urlParam = toUrlParam(url, this.pageSetting)
      getAllYarnArchives(urlParam).then(res => {
        this.totalSize = res.data.count
        this.initAllData = res.data.data
        for (var i = 0; i < this.initAllData.length; i++) {
          window.console.log(this.initAllData[i])
          let str = ''
          if (this.initAllData[i].tzsbz) {
            str += '特种纱,'
          }
          if (this.initAllData[i].gpmbz) {
            str += '高配棉,'
          }
          if (this.initAllData[i].oabz) {
            str += 'OA,'
          }
          if (this.initAllData[i].oebz) {
            str += 'OE,'
          }
          if (this.initAllData[i].sirobz) {
            str += 'SIRO,'
          }
          if (this.initAllData[i].jsbz) {
            str += '精梳,'
          }
          if (this.initAllData[i].sgfbz) {
            str += '紧密纺,'
          }
          if (this.initAllData[i].zjbz) {
            str += '竹节纱,'
          }
          if (this.initAllData[i].gtlbz) {
            str += '弹力纱,'
          }
          if (this.initAllData[i].ygbz) {
            str += '有色纱,'
          }
          if (this.initAllData[i].hxsbz) {
            str += '化纤纱,'
          }
          if (this.initAllData[i].qtsbz) {
            str += '全天丝,'
          }
          if (this.initAllData[i].qtbz) {
            str += '其他,'
          }
          this.$set(this.initAllData[i], 'shuXingList', str)

          this.$set(this.initAllData[i], 'tybz', this.statusCheck(this.initAllData[i].tybz))
        }
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
    statusCheck(val) {
      return val == false ? '否' : '是'
    },

    handleExport() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['产地', '类型', '名称', '属性', '型号', '支数（折算支数）', '核算价格（万元/吨）', '成分', '备注', '停用标志', '单纱强力标准', '最低单纱强力标准', '强力CV标准', '支偏上限标准', '捻度标准', '捻系数标准', '断裂伸长率标准', '条干（CV）标准', '存货编码']
        const filterVal = ['chanDi', 'fl', 'name', 'shuXing', 'xingHao', 'shaZhi', 'hsjg', 'chengFen', 'note', 'tybz', 'dsqlbz', 'zddsqlbz', 'qlcvbz', 'zpsbz', 'ndbz', 'nxsbz', 'dlsclbz', 'tgbz', 'chbm']
        const list = this.initAllData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '原纱档案')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, list) {
      return list.map(v => {
        return filterVal.map(j => {
          return v[j]
        })
      }
      )
    },
    addNewRecord() {
      this.dialogAddTableVisible = true
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false

      this.initData()
    },
    deleteData(id) {
      var url = '/api/deleteYarn/' + id
      deleteRecord(url).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success(res.data.tipInfo)
          this.initData()
        }
        window.console.log(res)
      })
    },
    editDataM(id) {
      this.dialogEditTableVisible = true

      var url = '/api/getOneYarnArchives/' + id
      getOneRecord(url).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.editData = res.data.data
          // alert(this.editData.id)
          // var value = this.editData.tybz == true ? '是' : '否'
          // this.$set(this.editData, 'value', value)
          // alert(this.editData.value)
        }
      })
    },
    searchData() {
      window.console.log(this.queryInfo)
      var url = baseUrl + '/api/getAllYarnArchives?'
      var urlParam = toUrlParam(url, this.queryInfo)
      searchBycCondition(urlParam).then(res => {
        this.initAllData = res.data.data
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.PageIndex = val
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
