<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 日期选择 -->

      <el-col :lg="{span:7}" class="searchCombo">
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
      <el-col :span="5">
        <el-input v-model="queryInfo.yuanShaPurchaseNo" placeholder="请输入单号" clearable>
          <template slot="prepend">单号</template>
        </el-input>
      </el-col>

      <!-- 供应商选择 -->
      <el-col :span="5">
        <el-input v-model="queryInfo.name" placeholder="请选择" clearable>
          <template slot="prepend">供应商</template>
        </el-input>
      </el-col>

      <!-- 信息条件筛选 -->

      <el-col :lg="{span:5}" class="searchCombo">
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
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>

      <el-dialog v-if="dialogAddNewTableVisible" title="原纱订货单（申请）" :visible.sync="dialogAddNewTableVisible" fullscreen>
        <addNewForm @closeDialog="closeDialog" />
      </el-dialog>
      <el-dialog v-if="dialogEditTableVisible" title="原纱订货单（修改）" :visible.sync="dialogEditTableVisible" fullscreen>
        <editTable :param="editOriginData" @closeDialog="closeDialog" />
      </el-dialog>

      <el-dialog v-if="dialogAddPlanNewTableVisible" title="原纱订货单（计划申请）" :visible.sync="dialogAddPlanNewTableVisible" fullscreen>
        <addPlanNew @closeDialog1="closeDialog1"  @closeDialog="closeDialog"/>
      </el-dialog>
      <el-dialog v-if="dialogEditPlanTableVisible" title="计划原纱订货单（修改）" :visible.sync="dialogEditPlanTableVisible" fullscreen>
        <editPlanTable :param="editOriginData" @closeDialog="closeDialog" />
      </el-dialog>
    </el-row>

    <el-row style="margin-top: 20px">
      <!-- 新增 -->
      <el-col :span="2">
        <el-button type="primary" plain @click="addNewYS">新增</el-button>
      </el-col>
      <!-- 计划新增 -->
      <el-col :span="2">
        <el-button type="primary" plain @click="addPlanNewForm">计划新增</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="initOriginData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
                <el-table-column label="供应商" prop="name" show-overflow-tooltip/>

        <el-table-column label="单号" prop="yuanShaPurchaseNo" show-overflow-tooltip/>
        <el-table-column label="签订日期" prop="signDate" show-overflow-tooltip/>
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
        <el-table-column label="导出">
          <template slot-scope="scope">
            <el-button type="text" @click="exportPDF(scope.row.yuanShaPurchaseNo)">PDF</el-button>
            <el-button type="text" @click="exportExcel(scope.row.yuanShaPurchaseNo)">EXCEL</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核" prop="" />

      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize * 10"
          :current-page="pageSetting.pageNumber"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { getGuid } from '@/utils/getGuid'

import addNewForm from '@/views/ysdhd/addNewYs'
import editTable from '@/views/ysdhd/editDingDan'
import addPlanNew from '@/views/ysdhd/addPlanNew'
import editPlanTable from '@/views/ysdhd/editPlanNew'
import { loadYuanShaData, deleteData, getFile } from '@/api/ysdhd'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    addNewForm,
    addPlanNew,
    editTable,
    editPlanTable
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
        name: '',
        state: ''
      },

      dialogAddNewTableVisible: false,
      dialogAddPlanNewTableVisible: false,
      initOriginData: '',
      dialogEditTableVisible: false,
      dialogEditPlanTableVisible: false,
      editOriginData: '',
      flag: false,
      totalSize: ''
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
          // this.$message.error(res.data.msg)
        } else {
          this.initOriginData = res.data.data
          this.totalSize = this.initOriginData[0].pageQuanity
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
      window.console.log(urlParam)
      loadYuanShaData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.initOriginData = res.data.data
        }
      })
    },
    addNewYS() {
//             let { href } = this.$router.resolve({ path: '/原纱订货单新增' })
// window.open(href, '_blank')
                                  this.$router.push({ path: '/原纱合同及发票管理/原纱订货单新增', query: { guid: getGuid() }})

      // this.dialogAddNewTableVisible = true
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
        if (res.data.data[0].listS[0].planNo == '') {
          this.editOriginData = res.data.data
          this.flag = true
          this.dialogEditTableVisible = true
        } else {
          this.editOriginData = res.data.data
          this.flag = true
          this.dialogEditPlanTableVisible = true
        }
        // this.editOriginData = res.data.data
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
    },
    exportPDF(yuanShaPurchaseNo) {
      var url = baseUrl + '/shengChengPDF?style=1&yuanShaPurchaseNo=' + yuanShaPurchaseNo
      getFile(url).then(res => {
        var pdfLink = baseUrl + res.data.data
        window.open(pdfLink, '_blank')
      })
    },
    exportExcel(yuanShaPurchaseNo) {
      var url = baseUrl + '/shengChengPDF?style=2&yuanShaPurchaseNo=' + yuanShaPurchaseNo
      getFile(url).then(res => {
        var excelLink = baseUrl + res.data.data
        window.open(excelLink, '_blank')
      })
    },
    addPlanNewForm() {
                                  this.$router.push({ path: '/原纱合同及发票管理/原纱订货单计划新增', query: { guid: getGuid() }})

      // this.$router.push('/原纱订货单计划新增')
//       let { href } = this.$router.resolve({ path: '/原纱订货单计划新增' })
// window.open(href, '_blank')
      // this.dialogAddPlanNewTableVisible = true
    },
    closeDialog() {
      this.dialogEditTableVisible = false
      // this.dialogAddNewTableVisible = false
      // this.dialogAddPlanNewTableVisible = false
      this.dialogEditPlanTableVisible = false
      this.initData()
    },
    //     closeDialog1() {
    //   this.dialogAddPlanNewTableVisible = false

    //   setTimeout(function(){ 
    //     this.dialogAddPlanNewTableVisible = true 
    //     alert('is meeee')

    //   }, 20020);


    // },
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
