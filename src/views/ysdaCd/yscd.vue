<template>
  <el-card>
    <el-col :span="3">
      <el-button type="primary" plain @click="addNewData">新增</el-button>
    </el-col>
    <el-row style="margin-top: 40px">
      <el-table :data="initFormData" border stripe max-height="750">
        <el-table-column type="index" label="序号" />

        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="预计到货天数" prop="yjdhts" />
        <el-table-column label="耗纱系数" prop="hsxs" />
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
    <el-dialog v-if="dialogEditVisible" title="原纱产地（编辑）" :visible.sync="dialogEditVisible" :close-on-click-modal="false">
      <editYscd :param="selectedData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog v-if="dialogAddVisible" title="原纱产地（新增）" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
      <addYscd @closeDialog="closeDialog" />
    </el-dialog>
  </el-card>
</template>
<script>
import { getAllYarnChanDi, deleteChanDi, getOneYarnChanDi, addNewChanDi } from '@/api/ysdaComponents'
import editYscd from '@/views/ysdaCd/editYscd'
import addYscd from '@/views/ysdaCd/addYscd'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  components: {
    editYscd,
    addYscd
  },
  data() {
    return {
      initFormData: '',
      dialogEditVisible: false,
      selectedData: '',
      dialogAddVisible: false,
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
    initData() {
      var url = '/api/getAllYarnChanDi?'
      var urlParam = toUrlParam(url, this.pageSetting)
      getAllYarnChanDi(urlParam).then(res => {
        this.totalSize = res.data.count
        this.initFormData = res.data.data
      })
    },
    deleteData(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          var url = '/api/deleteYarnChanDi/' + id
          deleteChanDi(url).then(res => {
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
      var url = '/api/getOneYarnChanDi/' + id
      getOneYarnChanDi(url).then(res => {
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
