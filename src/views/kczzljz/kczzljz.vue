<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 产地选择 -->
      <el-col :span="5" class="searchCombo">
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
      <el-col :span="5">
        <el-input v-model="queryInfo.shaZhi" clearable type="number">
          <template slot="prepend">支数</template>
        </el-input>
      </el-col>

      <!-- 名称 -->
      <el-col :span="5">
        <el-input v-model="queryInfo.name" clearable>
          <template slot="prepend">名称</template>
        </el-input>
      </el-col>

      <!-- 实际价格 -->
      <el-col :span="3">
        <el-checkbox v-model="queryInfo.state">已设置周转量</el-checkbox>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="success" @click="searchData">检索</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="2" style="margin-bottom: 20px; margin-right:20px">
        <el-button type="primary" @click="editSelected">批量调整</el-button>
      </el-col>
      <el-col :span="3" style="margin-bottom: 20px">
        <el-button type="primary" @click="exportExcel">导出Excel</el-button>
      </el-col>

      <el-dialog v-if="dialogEditTableVisible" title="数据修改" :visible.sync="dialogEditTableVisible" width="95%">
        <editSelected :param="multipleSelection" @closeDialog="closeDialog" />
      </el-dialog>
      <el-table id="out-table" ref="multipleTable" :data="searchResult" border stripe max-height="750" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="属性" prop="shuXing" />
        <el-table-column label="型号" prop="xingHao" />

        <el-table-column label="购纱周转量（T）" prop="gouShaL" />
        <el-table-column label="库存周转量（T）" prop="kuCunL" />
        <el-table-column label="最低周转量（T）" prop="zuiDiL" />
        <el-table-column label="仓库">

          {{ cangKu }}
        </el-table-column>

        <el-table-column label="备注" prop="liangRemarks" />
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-if="dialogHistoryVisible" title="历史价格表" :visible.sync="dialogHistoryVisible" width="95%">
      <priceHistory :param="historyData" @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { loadData, deleteOData } from '@/api/kczzljz'
import { toUrlParam } from '@/utils/toUrlParam'
import editSelected from '@/views/kczzljz/editSelected'
import priceHistory from '@/views/ysdjd/priceHistory'
import { getSettingList } from '@/api/ysda'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

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
        chanDi: '',
        shaZhi: '',
        state: '',
        name: ''
      },
      cangKu: '越南原纱仓',
      searchResult: '',
      multipleSelection: [],
      dialogEditTableVisible: false,
      dialogHistoryVisible: false,
      chanDiList: ''

    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var url = '/LoadZhouZhuanL?'
      var urlParam = toUrlParam(url, this.pageSetting)
      loadData(urlParam).then(res => {
        this.searchResult = res.data.data
      })
      getSettingList('getAllYarnChanDiName').then(res => {
        this.chanDiList = res.data.data
      })
    },
    searchData() {
      this.$set(this.queryInfo, 'pageNumber', this.pageSetting.pageNumber)
      this.$set(this.queryInfo, 'pageSize', this.pageSetting.pageSize)
      var url = '/LoadZhouZhuanL?'
      var urlParam = toUrlParam(url, this.queryInfo)
      loadData(urlParam).then(res => {
        // window.console.log(res.data.data)
        this.searchResult = res.data.data
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
      this.dialogEditTableVisible = true
    },
    closeDialog() {
      this.dialogEditTableVisible = false
      this.initData()
    },
    exportExcel() {
      this.downloadLoading = true
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '原纱库存周转量基准表.xlsx')
        this.downloadLoading = false
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    deleteData(id) {
      var url = '/delZhouZhuanL?id=' + id

      deleteOData(url).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.data)
        } else {
          this.$message.success(res.data.data)
          this.initData()
        }
      })
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
