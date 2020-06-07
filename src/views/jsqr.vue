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
        <el-table-column label="经纱" prop="jingSha" />
        <el-table-column label="需用量" prop="xuYaoLiang" />
        <el-table-column label="生产安排单备注" prop="remarks" />
        <el-table-column label="计划轴期" prop="jiaoZhouDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" v-bind:key="item" style="margin:0px">
              {{item}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="计划坯期" prop="huiPiDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" v-bind:key="item" style="margin:0px">
              {{item}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" />
        <el-table-column label="操作" />
        <el-table-column label="工艺变更申请" />
        <el-table-column label="状态" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
import { loadJSData, searchJSData, insteadOfJing } from '@/api/jsqrApi'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  data() {
    return {
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
        }]

    }
  },
  created() {
    var url = 'http://192.168.41.102:8088/LoadData1?'
    var urlParam = toUrlParam(url, this.pageSetting)
    loadJSData(urlParam).then(res => {
      this.jsData = res.data.data
    })
  },
  methods: {
    searchData() {
      var url = 'http://192.168.41.102:8088/LoadData?'
      var urlParam = toUrlParam(url, this.queryInfo)
      window.console.log(urlParam)
      searchJSData(urlParam).then(res => {
        window.console.log(res)
        this.jsData = res.data.data
      })
    }
  }
}
</script>

<style scrope>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}
</style>
