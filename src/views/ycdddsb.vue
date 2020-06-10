<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 备纱单日期 -->
      <el-col :lg="{span:8}" class="searchCombo">
        <div class="searchHeader">备纱单日期</div>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
        />
      </el-col>

      <!-- 状态 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">状态</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table :data="jsData" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" />
        <el-table-column label="布编" />
        <el-table-column label="浆纱单号" />
        <el-table-column label="浆长(米)" />
        <el-table-column label="坯布长(米)" />
        <el-table-column label="生产安排单" />
        <el-table-column label="浆染厂" />
        <el-table-column label="织造厂" />
        <el-table-column label="交轴日期" />
        <el-table-column label="坯布交期" />
        <el-table-column label="经纬" />
        <el-table-column label="经/纬纱" />
        <el-table-column label="需用量(KG)" />
        <el-table-column label="库存(KG)" />
        <el-table-column label="最低周转量" />
        <el-table-column label="消化量(KG)" />
        <el-table-column label="总需量" />
        <el-table-column label="订购量(KG)" />
        <el-table-column label="预购数量" />
        <el-table-column label="确认完成" />
        <el-table-column label="计划交期" />
        <!-- <el-table-column label="到纱日" />
        <el-table-column label="到纱量" /> -->
        <!-- <el-table-column label="布编" /> -->
        <el-table-column label="备注" />
      </el-table>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      orderDate: '',
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
        }],
      form: {
        min: '',
        max: ''
      }
    }
  },
  methods: {}
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
</style>
