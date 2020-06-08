<template>
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="10">

      <!-- 日期选择 -->
      <el-col :span="5">
        <el-date-picker
          v-model="queryInfo.doTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 布编选择 -->
      <el-col :span="5">
        <el-input v-model="queryInfo.clothId" placeholder="请输入布编号" clearable>
          <template slot="prepend">布编</template>
        </el-input>
      </el-col>

      <!-- 生产单号 -->
      <el-col :span="6">
        <el-input v-model="queryInfo.productionNo" placeholder="请输入生产单号" clearable>
          <template slot="prepend">生产单号</template>
        </el-input>
      </el-col>

      <!-- 确认订单状态 -->
      <el-col :span="5">
        <el-select v-model="queryInfo.status" placeholder="确认状态">
          <!-- <template slot="prefix">确认状态</template> -->
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="3">
        <el-button type="success" @click="searchData">筛选</el-button>
        <!-- <el-button type="success" @click="getReplaceJs(jsData.jingsha,jsData.shaZhi)">筛选</el-button> -->

      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table :data="jsData" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" prop="doTime" />
        <el-table-column label="生产单号" prop="productionNo" />
        <el-table-column label="布编" prop="clothId" />
        <el-table-column label="浆长" prop="jiaoZhouLength" />
        <el-table-column label="经纱" prop="jingSha">
          <!-- {{scope.row.jingSha}} <i class="el-icon-arrow-down el-icon--right"> </i> -->
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="dialogTableVisible = true"> {{scope.row.jingSha}} <i class="el-icon-arrow-down el-icon--right"> </i> </el-button> -->
            <el-button type="text" @click="showReplaceJS(scope.row.jingSha,scope.row.shaZhi)"> {{ scope.row.jingSha }} <i class="el-icon-arrow-down el-icon--right" /> </el-button>
            <el-dialog title="选择替换的经纱" :visible.sync="dialogReplaceJSVisible">

          <!-- <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
          </el-select> -->

              <el-form>
                <el-form-item label="经纱" :label-width="formLabelWidth">
                  <el-select v-model="value" placeholder="请选择您所需要的经纱">
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option> -->
                    <el-option label="经纱1" value="shanghai" />
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogReplaceJSVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogReplaceJSVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="需用量" prop="xuYaoLiang" />
        <el-table-column label="生产安排单备注" prop="remarks" />
        <el-table-column label="计划轴期" prop="jiaoZhouDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="计划坯期" prop="huiPiDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="getReplaceJs(scope.row.jingsha,scope.row.shaZhi)">筛选</el-button>
          </template>
        </el-table-column>
        <el-table-column label="工艺变更申请" />
        <el-table-column label="状态" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
import { loadJSData, searchJSData, insteadOfJing } from '@/api/jsqrApi'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogVisible: false,
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        doTime: '',
        clothId: '',
        productionNo: '',
        status: ''
      },
      jsData: '',

      statusOptions: [
        {
          value: '1',
          label: '已审批'
        },
        {
          value: '0',
          label: '未确认'
        }],
      passParam: {
        shaZhi: '',
        jingSha: ''
      },
      dialogReplaceJSVisible: false,
      jingshaList: ''
    }
  },
  created() {
    var url = baseUrl + '/LoadData?'
    // var url = 'http://192.168.41.102:8088/LoadData1?'
    var urlParam = toUrlParam(url, this.pageSetting)
    loadJSData(urlParam).then(res => {
      this.jsData = res.data.data
      window.console.log(this.jsData)
      this.passParam.jingSha = this.jsData.jingSha
      this.passParam.shaZhi = this.jsData.shaZhi
    })
  },
  methods: {
    searchData() {
      var url = baseUrl + '/LoadData?'
      // window.console.log(url)
      var urlParam = toUrlParam(url, this.queryInfo)
      // window.console.log(urlParam)
      searchJSData(urlParam).then(res => {
        // window.console.log(res)
        this.jsData = res.data.data
      })
    },
    showReplaceJS(jingsha, shaZhiNo) {
      // window.console.log('tesing`````````````')
      // window.console.log(parseInt(shaZhiNo))
      // window.console.log(jingsha)
      var url = baseUrl + '/loadChangeYuanSha?'
      // window.console.log(url)
      var data = {
        shaZhi: parseInt(shaZhiNo),
        jingsha: jingsha
      }
      var urlParam = toUrlParam(url, data)
      insteadOfJing(urlParam).then(res => {
        this.jingshaList = res.data.data
        window.console.log(this.jingshaList)
      })
      this.dialogReplaceJSVisible = true
    }
  }
}
</script>

<style scrope>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}
</style>
