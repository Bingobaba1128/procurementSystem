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

      <!-- 单号选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.yuanShaPurchaseNo" placeholder="请输入单号" clearable>
          <template slot="prepend">单号</template>
        </el-input>
      </el-col>

      <!-- 供应商选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.customer" placeholder="请选择" clearable>
          <template slot="prepend">供应商</template>
        </el-input>
      </el-col>

      <!-- 信息条件筛选 -->

      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">信息条件</div>
        <el-select v-model="queryInfo.state" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="success" @click="searchData">检索</el-button>
      </el-col>
      <!-- 新增 -->
      <el-col :span="2">
        <el-button type="primary" @click="addNewYS">新增</el-button>
      </el-col>
      <el-dialog title="原纱订货单（申请）" :visible.sync="dialogAddNewTableVisible" width="95%">
        <addNewForm />
      </el-dialog>
      <el-dialog title="原纱订货单（修改）" :visible.sync="dialogEditTableVisible" width="95%">
        <editTable :param="editOriginData" />
      </el-dialog>

      <!-- 计划新增 -->
      <el-col :span="2">
        <el-button type="primary" @click="dialogAddPlanNewTableVisible = true">计划新增</el-button>
      </el-col>
      <el-dialog title="原纱订货单（计划申请）" :visible.sync="dialogAddPlanNewTableVisible" width="95%">
        <addPlanNew />
      </el-dialog>
    </el-row>

    <el-row>
      <el-table :data="initOriginData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="单号" prop="yuanShaPurchaseNo" />
        <el-table-column label="签订日期" prop="signDate" />
        <el-table-column label="供应商" prop="name" />
        <el-table-column label="审核情况" prop="approveState">
          <template slot-scope="scope">
            {{ formatStatus(scope.row.approveState) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.yuanShaPurchaseNo)">修改</el-button>
            <el-button type="text" @click="deleteData(scope.row.yuanShaPurchaseNo)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核" prop="" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'

import addNewForm from '@/views/ysdhd/addNewYs'
import editTable from '@/views/ysdhd/editDingDan'
import addPlanNew from '@/views/ysdhd/addPlanNew'
import { loadYuanShaData, deleteData } from '@/api/ysdhd'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    addNewForm,
    addPlanNew,
    editTable
  },
  data() {
    return {
      infoOptions: [
        {
          value: '1',
          label: '已审批'
        },
        {
          value: '0',
          label: '未审批'
        },
        {
          value: '2',
          label: '全部审批'
        }
      ],
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      queryInfo: {
        orderDate: '',
        yuanShaPurchaseNo: '',
        customer: '',
        state: ''
      },

      dialogAddNewTableVisible: false,
      dialogAddPlanNewTableVisible: false,
      initOriginData: '',
      dialogEditTableVisible: false,
      editOriginData: ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var url = baseUrl + '/LoadPurchase?'
      var urlParam = toUrlParam(url, this.pageSetting)
      loadYuanShaData(urlParam).then(res => {
        // window.console.log(res)
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.initOriginData = res.data.data
        }
        // this.jsData = res.data.data

        // this.passParam.jingSha = this.jsData.jingSha
        // this.passParam.shaZhi = this.jsData.shaZhi
      })
    },
    searchData() {
      var url = baseUrl + '/LoadPurchase?'
      this.$set(this.queryInfo, 'pageNumber', this.pageSetting.pageNumber)
      this.$set(this.queryInfo, 'pageSize', this.pageSetting.pageSize)
      var urlParam = toUrlParam(url, this.queryInfo)
      // window.console.log(urlParam)
      loadYuanShaData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.initOriginData = res.data.data
        }
      })
    },
    addNewYS() {
      this.dialogAddNewTableVisible = true
      // var url = baseUrl + '/api/supplier/getAllSupplier?supplierType=1'
      // // var urlParam = toUrlParam(url, this.queryInfo)
      // window.console.log(url)

      // addNewYuanSha(url).then(res => {
      //   this.supplierList = res.data.data
      //   window.console.log(this.supplierList)
      // })
    },
    formatStatus(val) {
      return val == 0 ? '未审核' : '已审核'
    },
    editData(id) {
      window.console.log(id)
      var url = baseUrl + '/LoadPurchase?yuanShaPurchaseNo=' + id + '&'
      var urlParam = toUrlParam(url, this.pageSetting)
      loadYuanShaData(urlParam).then(res => {
        this.editOriginData = res.data.data
        this.dialogEditTableVisible = true
        // window.console.log(this.editOriginData)
      })
    },
    deleteData(yuanShaPurchaseNo) {
      var url = baseUrl + '/delPurchase?yuanShaPurchaseNo=' + yuanShaPurchaseNo
      deleteData(url).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.initData()
          this.$message.success(res.data.msg)
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
