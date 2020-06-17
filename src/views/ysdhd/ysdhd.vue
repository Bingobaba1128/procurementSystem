<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 日期选择 -->
      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">日期</div>
        <el-date-picker
          v-model="s"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 单号选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.clothId" placeholder="请输入单号" clearable>
          <template slot="prepend">单号</template>
        </el-input>
      </el-col>

      <!-- 供应商选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.productionNo" placeholder="请选择" clearable>
          <template slot="prepend">供应商</template>
        </el-input>
      </el-col>

      <!-- 信息条件筛选 -->

      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">信息条件</div>
        <el-select v-model="queryInfo.state" placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="2">
        <el-button type="success" @click="searchData">检索</el-button>
      </el-col>
      <!-- 新增 -->
      <el-col :span="2">
        <el-button type="primary" @click="dialogAddNewTableVisible = true">新增</el-button>
      </el-col>
      <el-dialog title="原纱订货单（申请）" :visible.sync="dialogAddNewTableVisible" width="95%">
        <addNewForm />
      </el-dialog>

      <!-- 计划新增 -->
      <el-col :span="2">
        <el-button type="primary" @click="dialogAddPlanNewTableVisible = true">计划新增</el-button>
      </el-col>
      <el-dialog title="原纱订货单（计划申请）" :visible.sync="dialogAddPlanNewTableVisible" width="95%">
        <addPlanNew />
      </el-dialog>
    </el-row>

    <el-row>
      <el-table :data="initData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="单号" prop="" />
        <el-table-column label="签订日期" prop="" />
        <el-table-column label="供应商" prop="" />
        <el-table-column label="审核情况" prop="" />
        <el-table-column label="修改" prop="" />
        <el-table-column label="审核" prop="" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
import addNewForm from '@/views/ysdhd/addNewYs'
import addPlanNew from '@/views/ysdhd/addPlanNew'

export default {
  components: {
    addNewForm,
    addPlanNew
  },
  data() {
    return {
      infoOptions: [
        {
          value: '1',
          label: '通过信息'
        },
        {
          value: '0',
          label: '未通过信息'
        },
        {
          value: '2',
          label: '全部信息'
        }
      ],
      queryInfo: {
        doTime: '',
        clothId: '',
        productionNo: '',
        state: ''
      },
      dialogAddNewTableVisible: false,
      dialogAddPlanNewTableVisible: false
    }
  }
}
</script>

<style scoped>
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
