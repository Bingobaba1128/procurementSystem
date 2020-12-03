<template style="font-size:10px">
  <el-card>
    <el-row>
      <el-table :data="dataOrigin" border stripe tooltip-effect="dark" :span-method="objectSpanMethod">
        <el-table-column type="index" label="序号" />
        <el-table-column label="采购单号" prop="yuanShaPurchaseNo" show-overflow-tooltip />
        <el-table-column label="原纱品种" prop="jingSha" show-overflow-tooltip />
        <el-table-column label="采购数量(Kg)" prop="quanity" show-overflow-tooltip />
        <el-table-column label="入库完成情况" prop="ruState">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ruState" clearable placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                @click.native="stateChange(item.value)"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column class="alignCenter" label="入库详情">
          <el-table-column
            prop="ruKuQuanity"
            label="入库数量(Kg)"
            width="120"
          />
          <el-table-column
            prop="ruKuNo"
            label="入库单号"
            width="120"
          />
          <el-table-column
            prop="ruKuDate"
            label="入库日期"
            width="120"
          />
        </el-table-column>

        <el-table-column label="发票号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.faPiaoNo" />
          </template>
        </el-table-column>
        <el-table-column label="发票照片" width="200">

          <template slot-scope="scope">

            <el-button v-if="scope.row.faPiaoPhoto != null && scope.row.faPiaoPhoto != '' " type="text" @click="showFile(scope.row.faPiaoPhoto)"> 查看文件 </el-button>
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              multiple
              :limit="1"
              action="http://120.78.186.60:8097/uploadSalesContracts?"
              :on-preview="handlePreview"
              :on-remove="(response,file,value) => handleRemove1(response,file,scope.row)"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :on-success="(response,file,value) => handleSuccess1(response,file,scope.row.ruKuNo)"
              :file-list="fileList"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </template>

        </el-table-column>
        <el-table-column label="物流单" prop="wuLiuDan">
          <template slot-scope="scope">
            <el-button v-if="scope.row.wuLiuDan != null && scope.row.wuLiuDan != '' " type="text" @click="showFile(scope.row.wuLiuDan)"> 查看文件 </el-button>
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              multiple
              :limit="1"
              action="http://120.78.186.60:8097/uploadSalesContracts?"
              :on-preview="handlePreview"
              :on-remove="(response,file,value) => handleRemove2(response,file,scope.row)"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :on-success="(response,file,value) => handleSuccess2(response,file,scope.row.ruKuNo)"
              :file-list="fileList"
              :auto-upload="true"
              :disabled="scope.row.id === null"
            >
              <el-button slot="trigger" size="small" type="primary" :disabled="scope.row.id === null">选取文件</el-button>
            </el-upload>
          </template>

        </el-table-column>
        <el-table-column label="报关单" prop="baoGuanDan">
          <template slot-scope="scope">
            <el-button v-if="scope.row.baoGuanDan != null && scope.row.baoGuanDan != '' " type="text" @click="showFile(scope.row.baoGuanDan)"> 查看文件 </el-button>
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              multiple
              :limit="1"
              action="http://120.78.186.60:8097/uploadSalesContracts?"
              :on-preview="handlePreview"
              :on-remove="(response,file,value) => handleRemove3(response,file,scope.row)"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :on-success="(response,file,value) => handleSuccess3(response,file,scope.row.ruKuNo)"
              :file-list="fileList"
              :auto-upload="true"
              :disabled="scope.row.id === null"
            >
              <el-button slot="trigger" size="small" type="primary" :disabled="scope.row.id === null">选取文件</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="saveToServe(scope.row.ruKuNo)">操作人保存</el-button>
            <el-button type="text" @click="saveToChuanWu(scope.row.ruKuNo)">船务保存</el-button>
            <el-button type="text" @click="deleteDataF(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>

    </el-row>

  </el-card>
</template>
<script>
import { getAllData, addRecord, deleteData, searchResult, addChuanWuRecord } from '@/api/yshtfp'
import { baseUrl } from '@/api/apiUrl'

export default {
  props: ['param', 'no', 'id'],

  data() {
    return {
      dataOrigin: [],
      dataOOrigin: '',
      resUrl: '',
      allData: '',
      fileLink: '',
      stateList: [{
        label: '完成',
        value: '完成'
      }, {
        label: '未完成',
        value: '未完成'
      }]
    }
  },

  created() {
    this.initAllData()
  },

  methods: {
    initAllData() {
      var url = '/loadYuanShaContractFP?yuanShaPurchaseNo=' + this.no + '&id=' + this.id
      getAllData(url).then(res => {
        this.dataOOrigin = res.data.data

        if (this.dataOOrigin.length >= 1) {
          var jsonObj = { rowspan: this.dataOOrigin.length, colspan: 1 }
          var newJsonObj = { rowspan: 0, colspan: 0 }
          this.$set(this.dataOOrigin[0], 'yuanShaPurchaseNo-span', jsonObj)
          this.$set(this.dataOOrigin[0], 'jingSha-span', jsonObj)
          this.$set(this.dataOOrigin[0], 'quanity-span', jsonObj)
          this.$set(this.dataOOrigin[0], 'ruState-span', jsonObj)
          this.dataOOrigin.map((item, index) => {
            if (index !== 0) {
              this.$set(this.dataOOrigin[index], 'yuanShaPurchaseNo-span', newJsonObj)
              this.$set(this.dataOOrigin[index], 'jingSha-span', newJsonObj)
              this.$set(this.dataOOrigin[index], 'quanity-span', newJsonObj)
              this.$set(this.dataOOrigin[index], 'ruState-span', newJsonObj)
            }
          })
          this.dataOrigin = this.dataOOrigin
          window.console.log(this.dataOrigin)
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    stateChange(val) {
      this.dataOrigin.map((item, index) => {
        this.$set(this.dataOrigin[index], 'ruState', val)
      })
    },
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
    saveToServe(no) {
      // addOriginData
      for (var i = 0; i < this.dataOrigin.length; i++) {
        if (this.dataOrigin[i].ruKuNo == no) {
          this.$set(this.dataOrigin[i], 'operator', '邓科')

          addRecord(this.dataOrigin[i]).then(res => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.initAllData()
            }
          })
        }
      }
    },
    deleteDataF(id) {
      var urlParam = baseUrl + '/delYuanShaConract?id=' + id
      deleteData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.initAllData()
        }
      })
    },
    saveToChuanWu(no) {
      for (var i = 0; i < this.dataOrigin.length; i++) {
        if (this.dataOrigin[i].ruKuNo == no) {
          this.$set(this.dataOrigin[i], 'operator', '邓科')

          addChuanWuRecord(this.dataOrigin[i]).then(res => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.initAllData()
            }
          })
        }
      }
    },
    handleRemove1(response, file, data) {
      this.dataOrigin.map((item, index) => {
        if (this.dataOrigin[index].ruKuNo === data.ruKuNo) {
          this.$set(this.dataOrigin[index], 'faPiaoPhoto', '')
        }
      })
    },
    handleRemove2(response, file, data) {
      this.dataOrigin.map((item, index) => {
        if (this.dataOrigin[index].ruKuNo === data.ruKuNo) {
          this.$set(this.dataOrigin[index], 'wuLiuDan', '')
        }
      })
    },
    handleRemove3(response, file, data) {
      this.dataOrigin.map((item, index) => {
        if (this.dataOrigin[index].ruKuNo === data.ruKuNo) {
          this.$set(this.dataOrigin[index], 'baoGuanDan', '')
        }
      })
    },
    handleSuccess1(response, file, index) {
      this.resUrl = response.data[0].url
      for (var i = 0; i < this.dataOrigin.length; i++) {
        if (this.dataOrigin[i].ruKuNo == index) {
          this.$set(this.dataOrigin[i], 'faPiaoPhoto', this.resUrl)
        }
      }
    },
    handleSuccess2(response, file, index) {
      this.resUrl2 = response.data[0].url
      for (var i = 0; i < this.dataOrigin.length; i++) {
        if (this.dataOrigin[i].ruKuNo == index) {
          this.$set(this.dataOrigin[i], 'wuLiuDan', this.resUrl2)
        }
      }
    },
    handleSuccess3(response, file, index) {
      this.resUrl1 = response.data[0].url
      for (var i = 0; i < this.dataOrigin.length; i++) {
        if (this.dataOrigin[i].ruKuNo == index) {
          this.$set(this.dataOrigin[i], 'baoGuanDan', this.resUrl1)
        }
      }
    },
    showFile(url) {
      this.fileLink = baseUrl + url
      window.open(this.fileLink, '_blank')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(response, file, fileList) {
      this.resUrl = response.data[0].url
      this.$set(this.dataOrigin[0], 'faPiaoPhoto', this.resUrl)
    }
  }
}
</script>
