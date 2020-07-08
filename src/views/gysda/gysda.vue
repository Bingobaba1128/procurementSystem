<template>
  <el-card>
    <!-- 检索区 -->
    <el-row :gutter="10">
      <el-col :span="7" class="searchCombo">
        <div class="searchHeader">供应商名称</div>
        <el-input v-model="queryInfo.Name" placeholder="请填写供应商名称" clearable />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="searchSupplier">检索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain @click="addNewRecord">新增</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-dialog v-if="dialogAddTableVisible" title="供应商档案（新增111）" :visible.sync="dialogAddTableVisible" fullscreen>
      <addNewForm @closeDialog="closeDialog" />
    </el-dialog>

    <el-dialog v-if="dialogEditTableVisible" title="供应商档案（修改）" :visible.sync="dialogEditTableVisible" fullscreen>
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
import { loadData, deleteRecord, getOneRecord, searchData } from '@/api/gysda'
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
        Name: ''
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
    searchSupplier() {
      var url = '/api/supplier/getTotalSupplier?supplierType=1&Name=' + this.queryInfo.Name
      searchData(url).then(res => {
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
