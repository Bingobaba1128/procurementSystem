<template>
  <el-card>
    <el-col :span="3">
      <el-button type="primary" plain @click="addNewData">新增</el-button>
    </el-col>
    <el-row style="margin-top: 40px">
      <el-table :data="initFormData" border stripe max-height="750">
        <el-table-column type="index" label="序号" />

        <el-table-column label="产地" prop="chengFen" />
        <el-table-column label="停用">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.tybz) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">修改</el-button>
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-if="dialogEditVisible" title="原纱成分（编辑）" :visible.sync="dialogEditVisible" :close-on-click-modal="false">
      <editYscf :param="selectedData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog v-if="dialogAddVisible" title="原纱成分（新增）" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
      <addYscf @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { getAllYarnChengFen, deleteChengFen, getOneYarnChengFen, addNewChengFen } from '@/api/yscf'
import editYscf from '@/views/ysdaCf/editYscf'
import addYscf from '@/views/ysdaCf/addYscf'

export default {
  components: {
    editYscf,
    addYscf
  },
  data() {
    return {
      initFormData: '',
      dialogEditVisible: false,
      selectedData: '',
      dialogAddVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getAllYarnChengFen().then(res => {
        this.initFormData = res.data.data
      })
    },
    deleteData(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          var url = '/api/deleteYarnChengFen/' + id
          deleteChengFen(url).then(res => {
            if (res.status !== 200) {
              this.$message.error(res.data.tipInfo)
            } else {
              this.$message.success(res.data.tipInfo)
              this.initData()
            }
          })
        })
        .catch(_ => {})
    },
    editData(id) {
      var url = '/api/getOneYarnChengFen/' + id
      getOneYarnChengFen(url).then(res => {
        this.selectedData = res.data.data
        this.dialogEditVisible = true
      })
    },
    closeDialog() {
      this.dialogEditVisible = false
      this.dialogAddVisible = false
      this.initData()
    },
    addNewData() {
      this.dialogAddVisible = true
    },
    formatStatus(val) {
      return val == true ? '是' : val == false ? '否' : ''
    }

  }
}
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
