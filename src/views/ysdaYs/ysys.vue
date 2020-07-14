<template>
  <el-card>
    <el-col :span="3">
      <el-button type="primary" plain @click="addNewData">新增</el-button>
    </el-col>
    <el-row style="margin-top: 40px">
      <el-table :data="initFormData" border stripe max-height="750">
        <el-table-column type="index" label="序号" />

        <el-table-column label="颜色" prop="yanSe" />
        <el-table-column label="停用">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.tybz) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="bz" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">修改</el-button>
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
    <el-dialog v-if="dialogEditVisible" title="原纱颜色（编辑）" :visible.sync="dialogEditVisible" :close-on-click-modal="false">
      <editYsys :param="selectedData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog v-if="dialogAddVisible" title="原纱颜色（新增）" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
      <addYsys @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { getAllYarnYanSe, deleteYanSe, getOneYarnYanSe } from '@/api/ysys'
import editYsys from '@/views/ysdaYs/editYsys'
import addYsys from '@/views/ysdaYs/addYsys'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    editYsys,
    addYsys
  },
  data() {
    return {
      initFormData: '',
      dialogEditVisible: false,
      selectedData: '',
      dialogAddVisible: false,
      pageSetting: {
        PageIndex: 1,
        PageSize: 10
      },
      totalSize: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var url = '/api/getAllYarnYanSe?'
      var urlParam = toUrlParam(url, this.pageSetting)
      getAllYarnYanSe(urlParam).then(res => {
        this.totalSize = res.data.count

        window.console.log(res.data.data)
        this.initFormData = res.data.data
      })
    },
    deleteData(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          var url = '/api/deleteYarnYanSe/' + id
          deleteYanSe(url).then(res => {
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
      var url = '/api/getOneYarnYanSe/' + id
      getOneYarnYanSe(url).then(res => {
        window.console.log(res.data.data)
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
    },
    handleCurrentChange(val) {
      this.pageSetting.PageIndex = val
      this.initData()
    }

  }
}
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
