<template>
  <el-card>
    <el-row :gutter="10">

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
      <el-col :span="6" class="searchCombo">
        <div class="searchHeader">已设置周转量</div>

        <el-select v-model="queryInfo.state" clearable placeholder="请选择">
          <el-option
            v-for="item in zhouZhuanList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="2" style="margin-bottom: 20px; margin-right:20px">
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
        <el-table-column label="产地" prop="chanDi" show-overflow-tooltip />
        <el-table-column label="支数（折算支数）" prop="shaZhi" show-overflow-tooltip />
        <el-table-column label="名称" prop="name" show-overflow-tooltip />
        <el-table-column label="属性" prop="shuXing" show-overflow-tooltip />
        <el-table-column label="型号" prop="xingHao" show-overflow-tooltip />

        <el-table-column label="购纱周转量（T）" prop="gouShaL" show-overflow-tooltip />
        <el-table-column label="库存周转量（T）" prop="kuCunL" show-overflow-tooltip />
        <el-table-column label="最低周转量（T）" prop="zuiDiL" show-overflow-tooltip />
        <el-table-column label="仓库">

          {{ cangKu }}
        </el-table-column>

        <el-table-column label="备注" prop="liangRemarks" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
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
    <el-dialog v-if="dialogHistoryVisible" title="历史价格表" :visible.sync="dialogHistoryVisible" fullscreen>
      <priceHistory :param="historyData" @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { loadData, deleteOData } from '@/api/kczzljz'
import { toUrlParam } from '@/utils/toUrlParam'
import editSelected from '@/views/kczzljz/editSelected'
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
      chanDiList: '',
      zhouZhuanList: [
        { value: '1',
          label: '是' },
        { value: '0',
          label: '否' },
        { value: '2',
          label: '全部' }
      ],
      totalSize: ''
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
        this.totalSize = this.searchResult[0].pageQuanity
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
      window.console.log(this.queryInfo)
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
      if (this.multipleSelection.length == 0) {
        this.$message.error('请勾选需要调整的项目')
      } else {
        this.dialogEditTableVisible = true
      }
    },
    closeDialog() {
      this.dialogEditTableVisible = false
      this.initData()
    },
    exportExcel() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['产地', '名称', '属性', '型号', '支数（折算支数）', '购纱周转量（T）', '库存周转量（T）', '最低周转量（T）', '仓库', '备注']
        const filterVal = ['chanDi', 'name', 'shuXing', 'xingHao', 'shaZhi', 'gouShaL', 'kuCunL', 'zuiDiL', '越南原纱仓', 'liangRemarks']
        var list = ''
        if (this.multipleSelection.length == 0) {
          list = this.searchResult
        } else {
          list = this.multipleSelection
        }
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '原纱库存周转量基准')
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
