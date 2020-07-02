<template>
  <el-card>
    <!-- 检索区 -->
    <el-row :gutter="10">
      <!-- <el-col :span="6" class="searchCombo">
        <div class="searchHeader">供应商名称</div>
        <el-input v-model="queryInfo.shaZhi" placeholder="请填写供应商名称" clearable/>
      </el-col> -->
      <el-col :span="2">
        <el-button>检索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="addNewRecord">新增</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-dialog v-if="dialogAddTableVisible" title="供应商档案（新增）" :visible.sync="dialogAddTableVisible" width="95%">
      <addNewForm @closeDialog="closeDialog" />
    </el-dialog>

    <el-dialog v-if="dialogEditTableVisible" title="供应商档案（修改）" :visible.sync="dialogEditTableVisible" width="95%">
      <editForm :key="editData.id" :param="editData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-row>
      <el-table :data="initAllData" height="500" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="供应商名称" prop="name" />
        <el-table-column label="简称" prop="shortName" />
        <el-table-column label="代码" prop="code" />
        <el-table-column label="地址" prop="address" />
        <el-table-column label="负责人" prop="contactName" />
        <el-table-column label="联系电话" prop="contactPhone" />

        <el-table-column label="停用" prop="enable">
          <template slot-scope="scope">
            {{ statusCheck(scope.row.enable) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editDataM(scope.row.id)">修改</el-button>
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadData, deleteRecord, getOneRecord } from '@/api/gysda'
import addNewForm from '@/views/gysda/addNewForm'
import editForm from '@/views/gysda/eidtNewForm'

export default {
  components: {
    addNewForm,
    editForm
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {

      },
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {

    // 数据初始化
    initData() {
      loadData().then(res => {
        this.initAllData = res.data.data
      })
    },
    statusCheck(val) {
      return val == false ? '否' : '是'
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
      var url = '/api/supplier/deleteSupplier/' + id
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

      var url = '/api/supplier/getOneSupplier?id=' + id
      getOneRecord(url).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.editData = res.data.data
        //   window.console.log(this.editData)
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
