<template style="font-size:10px">
  <el-card>

    <el-row />

    <el-row>
      <el-table :data="data" border stripe tooltip-effect="dark">
        <el-table-column type="index" label="序号" />
        <el-table-column label="采购单号" prop="yuanShaPurchaseNo" />
        <el-table-column label="原纱品种" prop="jingSha" />
        <el-table-column label="采购数量(Kg)" prop="quanity" />

        <el-table-column class="alignCenter" label="入库详情">
          <el-table-column
            prop="ruKuQuanity"
            label="入库数量(Kg)"
            width="120"
          />
          <el-table-column
            prop="ruKuDate"
            label="入库日期"
            width="120"
          />
        </el-table-column>

        <el-table-column label="入库完成情况">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ruState" clearable placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="发票号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.faPiaoNo" />
          </template>
        </el-table-column>
        <el-table-column label="发票照片">
          <template>
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              multiple
              :limit="1"
              action="http://192.168.5.103:8097/uploadSalesContracts?"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
          </template>

        </el-table-column>

      </el-table>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="10">
      <el-col :span="2">
        <el-button type="primary" @click="saveToServe">确定存入</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>

export default {
//   props: {
//     param: Object
//   },
  props: ['param'],
  data() {
    return {
      data: this.param,
      resUrl: '',
      stateList: [{
        label: '完成',
        value: '完成'
      }, {
        label: '未完成',
        value: '未完成'
      }]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    saveToServe() {
      window.console.log(this.data)

      this.$emit('closeDialog')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(response, file, fileList) {
      this.resUrl = response.data[0].url
      this.$set(this.data[0], 'faPiaoPhoto', this.resUrl)
    }

  }
}
</script>
