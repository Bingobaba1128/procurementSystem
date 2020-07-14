<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 备纱单日期 -->
      <el-col :lg="{span:8}" class="searchCombo">
        <div class="searchHeader">采购单号</div>
        <el-input v-model="query.yuanShaPurchaseNo" placeholder="" clearable />
      </el-col>

      <!-- 状态 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">入库完成情况</div>
        <el-select v-model="query.ruState" clearable placeholder="请选择">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row gutter="20">
      <el-col :span="24">
        <el-row>
          <el-table border stripe :data="dataList" tooltip-effect="dark">
            <el-table-column type="index" label="序号" />
            <el-table-column label="采购单号" prop="yuanShaPurchaseNo" />
            <el-table-column label="原纱品种" prop="jingSha" />
            <el-table-column label="采购数量(Kg)" prop="quanity" />

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="addRecord(scope.row)">查看详情</el-button>
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
      </el-col>
      <el-col :span="24">
        <el-row>

          <el-table :data="addOriginData" border stripe tooltip-effect="dark">
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
            <el-table-column label="发票照片" width="200">

              <template slot-scope="scope">

                <el-button v-if="scope.row.faPiaoPhoto != null && scope.row.faPiaoPhoto != '' " type="text" @click="showFile(scope.row.faPiaoPhoto)"> 查看文件 </el-button>
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
                  action="http://192.168.5.103:8097/uploadSalesContracts?"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :on-success="(response,file,value) => handleSuccess2(response,file,scope.row.ruKuNo)"
                  :file-list="fileList"
                  :auto-upload="true"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
                  action="http://192.168.5.103:8097/uploadSalesContracts?"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :on-success="(response,file,value) => handleSuccess3(response,file,scope.row.ruKuNo)"
                  :file-list="fileList"
                  :auto-upload="true"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
      </el-col>
    </el-row>
    <!-- <el-dialog v-if="dialogAddNewTableVisible" title="入库发票（新增）" :visible.sync="dialogAddNewTableVisible" fullscreen>
      <addNewForm :param="addOriginData" @closeDialog="closeDialog" />
    </el-dialog> -->
  </el-card>
</template>

<script>
import { getAllData, addRecord, deleteData, searchResult, addChuanWuRecord } from '@/api/yshtfp'
import { toUrlParam } from '@/utils/toUrlParam'
import { baseUrl } from '@/api/apiUrl'

export default {

  data() {
    return {
      pageSetting: {
        pageSize: 10,
        pageNumber: 1
      },
      fileList: [],
      dataList: '',
      totalSize: '',
      dialogAddNewTableVisible: false,
      addOriginData: [],
      stateList: [{
        label: '完成',
        value: '完成'
      }, {
        label: '未完成',
        value: '未完成'
      }],
      resUrl: '',
      resUrl1: '',
      resUrl2: '',
      openUrl: '',
      fileLink: '',
      query: {
        yuanShaPurchaseNo: '',
        ruState: ''
      }
    }
  },
  created() {
    this.initData(this.pageSetting)
  },
  methods: {
    initData(pageSetting) {
      var url = '/loadYuanShaContract?'
      var urlParam = toUrlParam(url, pageSetting)
      getAllData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.dataList = res.data.data
          // window.console.log(res.data.data)
          this.totalSize = this.dataList[0].pageQuanity
        }
      })
    },
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData(this.pageSetting)
    },
    addRecord(data) {
      window.console.log(data.listS.length)
      for (var i = 0; i < data.listS.length; i++) {
        this.$set(data.listS[i], 'yuanShaPurchaseNo', data.yuanShaPurchaseNo)
        this.$set(data.listS[i], 'quanity', data.quanity)
        this.$set(data.listS[i], 'jingSha', data.jingSha)
      }
      this.addOriginData = data.listS
      window.console.log(this.addOriginData)
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
      for (var i = 0; i < this.addOriginData.length; i++) {
        if (this.addOriginData[i].ruKuNo == no) {
          this.$set(this.addOriginData[i], 'operator', '邓科')

          addRecord(this.addOriginData[i]).then(res => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.initData(this.pageSetting)
            }
          })
        }
      }
    },
    saveToChuanWu(no) {
      for (var i = 0; i < this.addOriginData.length; i++) {
        if (this.addOriginData[i].ruKuNo == no) {
          this.$set(this.addOriginData[i], 'operator', '邓科')

          addChuanWuRecord(this.addOriginData[i]).then(res => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.initData(this.pageSetting)
            }
          })
        }
      }
    },
    handleSuccess1(response, file, index) {
      this.resUrl = response.data[0].url
      for (var i = 0; i < this.addOriginData.length; i++) {
        if (this.addOriginData[i].ruKuNo == index) {
          this.$set(this.addOriginData[i], 'faPiaoPhoto', this.resUrl)
        }
      }
    },
    handleSuccess2(response, file, index) {
      this.resUrl2 = response.data[0].url
      for (var i = 0; i < this.addOriginData.length; i++) {
        if (this.addOriginData[i].ruKuNo == index) {
          this.$set(this.addOriginData[i], 'wuLiuDan', this.resUrl2)
        }
      }
    },
    handleSuccess3(response, file, index) {
      this.resUrl1 = response.data[0].url
      for (var i = 0; i < this.addOriginData.length; i++) {
        if (this.addOriginData[i].ruKuNo == index) {
          this.$set(this.addOriginData[i], 'baoGuanDan', this.resUrl1)
        }
      }
    },
    showFile(url) {
      this.fileLink = baseUrl + url
      window.open(this.fileLink, '_blank')
    },
    deleteDataF(id) {
      var urlParam = baseUrl + '/delYuanShaConract?id=' + id
      deleteData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.initData(this.pageSetting)
        }
      })
    },
    test() {
      alert(this.resUrl2)
      window.console.log(this.resUrl2, this.resUrl1, this.resUrl)
    },
    searchData() {
      window.console.log(this.query)
      var url = '/loadYuanShaContract?'
      this.$set(this.query, 'pageSize', this.pageSetting.pageSize)
      this.$set(this.query, 'pageNumber', this.pageSetting.pageNumber)

      var urlParam = toUrlParam(url, this.query)
      searchResult(urlParam).then(res => {
        this.dataList = res.data.data
        this.totalSize = this.dataList[0].pageQuanity
      })
    }
  }
}
</script>

<style scrope>

.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
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

.dropdownBox {
  width: 100%;
}

.dropdownBox .el-button-group .el-button {
  width: 80%;
}

.dropdownBox .el-button-group .el-dropdown__caret-button {
  width: 20%;
}

.cell {
    text-align: center !important
}
</style>
