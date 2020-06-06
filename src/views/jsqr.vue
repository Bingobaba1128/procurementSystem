<template>
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="10">

      <!-- 日期选择 -->
      <el-col :span="5">
        <el-date-picker
          v-model="queryInfo.selectedDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 布编选择 -->
      <el-col :span="5">
        <el-input v-model="queryInfo.bbNo" placeholder="请输入布编号" clearable>
          <template slot="prepend">布编</template>
        </el-input>
      </el-col>

      <!-- 生产单号 -->
      <el-col :span="6">
        <el-input v-model="queryInfo.scNo" placeholder="请输入生产单号" clearable>
          <template slot="prepend">生产单号</template>
        </el-input>
      </el-col>

      <!-- 确认订单状态 -->
      <el-col :span="5">
        <el-select v-model="queryInfo.value" placeholder="确认状态">
          <!-- <template slot="prefix">确认状态</template> -->
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 http://192.168.41.102/8088-->
      <el-col :span="3">
        <el-button type="success" @click="print">筛选</el-button>
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table :data="jsData" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" />
        <el-table-column label="生产单号" />
        <el-table-column label="布编" />
        <el-table-column label="浆长" />
        <el-table-column label="经纱">
          <template slot-scope="scope">
            <el-dropdown split-button type="primary" @click="handleClick">
              A产品
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="需用量" />
        <el-table-column label="生产安排单备注" />
        <el-table-column label="计划轴期" />
        <el-table-column label="计划坯期" />
        <el-table-column label="备注" />
        <el-table-column label="操作" />
        <el-table-column label="工艺变更申请" />
        <el-table-column label="状态" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
import { getTestResult } from '@/api/jsqrApi'

export default {
  data() {
    return {
      dialogVisible: false,

      queryInfo: {
        selectedDate: '',
        bbNo: '',
        scNo: '',
        value: ''
      },

      statusOptions: [
        {
          value: 'status0',
          label: '已确认已审批'
        },
        {
          value: 'status1',
          label: '已确认未审批'
        },
        {
          value: 'status2',
          label: '未确认'
        }]

    }
  },
  methods: {
    print() {
      window.console.log(this.queryInfo.selectedDate)

      getTestResult().then(response => {
        window.console.log(response)
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
