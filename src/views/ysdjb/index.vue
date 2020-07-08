<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 日期选择 -->

      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">日期</div>
        <el-date-picker
          v-model="queryInfo.orderDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 产地选择 -->
      <el-col :span="4" class="searchCombo">
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

      <!-- 支数选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.shaZhi" clearable type="number">
          <template slot="prepend">支数</template>
        </el-input>
      </el-col>

      <!-- 名称 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.name" clearable>
          <template slot="prepend">名称</template>
        </el-input>
      </el-col>

      <!-- 实际价格 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.sjjg" clearable type="number">
          <template slot="prepend">实际价格</template>
        </el-input>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="3" style="margin-bottom: 20px">
        <el-button type="primary" plain @click="editSelected">批量调整</el-button>
      </el-col>
      <el-col :span="3" style="margin-bottom: 20px">
        <el-button type="primary" plain @click="exportExcel">导出Excel</el-button>
      </el-col>
      <el-dialog v-if="dialogEditTableVisible" title="数据修改" :visible.sync="dialogEditTableVisible" :close-on-click-modal="false">
        <editSelected :param="multipleSelection" @closeDialog="closeDialog" />
      </el-dialog>
      <el-table id="out-table" ref="multipleTable" :data="searchResult" border stripe max-height="750" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="属性" prop="shuXing" />
        <el-table-column label="型号" prop="xingHao" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />

        <el-table-column label="实际价格（元/吨）" prop="sjjg" />
        <el-table-column label="核算价格（元/吨）" prop="hsjg" />
        <el-table-column label="设置日期" prop="setDate" />
        <el-table-column label="备注" prop="sjjgbz" />

        <el-table-column label="历史价格">
          <template slot-scope="scope">
            <el-button type="text" @click="searchHistory(scope.row.id)">查阅</el-button>
          </template>
        </el-table-column>

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
    <el-dialog v-if="dialogHistoryVisible" title="历史价格表" :visible.sync="dialogHistoryVisible" :close-on-click-modal="false">
      <priceHistory :param="historyData" @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { getInitData, getHistoryData } from '@/api/ysdjb'
import { toUrlParam } from '@/utils/toUrlParam'
import editSelected from '@/views/ysdjb/editSelected'
import priceHistory from '@/views/ysdjb/priceHistory'
import { getSettingList } from '@/api/ysda'

export default {
  components: {
    editSelected,
    priceHistory
  },

  data() {
    return {
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      queryInfo: {
        orderDate: '',
        chanDi: '',
        shaZhi: '',
        sjjg: '',
        name: ''
      },
      searchResult: '',
      multipleSelection: [],
      dialogEditTableVisible: false,
      dialogHistoryVisible: false,
      historyData: '',
      chanDiList: '',
      totalSize: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var url = '/LoadyuanShaUnitPrice?'
      var urlParam = toUrlParam(url, this.pageSetting)
      getInitData(urlParam).then(res => {
        this.searchResult = res.data.data
        this.totalSize = this.searchResult[0].pageQuanity
      })
      getSettingList('getAllYarnChanDiName').then(res => {
        this.chanDiList = res.data.data
      })
    },
    searchData() {
      this.$set(this.queryInfo, 'pageNumber', this.pageSetting.pageNumber)
      this.$set(this.queryInfo, 'pageSize', this.pageSetting.pageSize)
      var url = '/LoadyuanShaUnitPrice?'
      var urlParam = toUrlParam(url, this.queryInfo)
      getInitData(urlParam).then(res => {
        // window.console.log(res.data.data)
        this.searchResult = res.data.data
      })
    },
    searchHistory(id) {
      var url = 'loadHistoryPrice?id=' + id
      getHistoryData(url).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.dialogHistoryVisible = true
          this.historyData = res.data.data
        }
      })
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
    editSelected() {
      window.console.log(this.multipleSelection)
      if (this.multipleSelection.length == 0) {
        this.$message.error('请勾选需要调整的单价')
      } else {
        this.dialogEditTableVisible = true
      }
    },
    closeDialog() {
      this.dialogEditTableVisible = false
      this.initData()
    },
    // exportExcel() {
    //   this.downloadLoading = true
    //   /* generate workbook object from table */
    //   var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
    //   /* get binary string as output */
    //   var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //   try {
    //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '原纱定价表.xlsx')
    //     this.downloadLoading = false
    //   } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //   return wbout
    // }
    exportExcel() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['产地', '名称', '属性', '型号', '支数（折算支数）', '实际价格（元/吨）', '核算价格（元/吨）', '设置日期', '备注']
        const filterVal = ['chanDi', 'name', 'shuXing', 'xingHao', 'shaZhi', 'sjjg', 'hsjg', 'setDate', 'sjjgbz']
        var list = ''
        if (this.multipleSelection.length == 0) {
          list = this.searchResult
        } else {
          list = this.multipleSelection
        }
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '原纱定价表')
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
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData()
    }
  }
}
</script>

<style scoped>
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
