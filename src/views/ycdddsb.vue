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
        <el-input placeholder="" clearable />
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table border stripe>
        <el-table-column type="index" label="序号" />
        <!-- 预测订单带出 -->
        <el-table-column style="text-align:center" label="预测订单信息">
          <el-table-column
            prop=""
            label="备纱单日期"
            width="120"
          />
          <el-table-column
            prop=""
            label="业务组"
            width="120"
          />
          <el-table-column
            prop=""
            label="预测订单号"
            width="300"
          />
          <el-table-column
            prop=""
            label="预测下单日期"
            width="120"
          />
          <el-table-column
            prop=""
            label="品种"
            width="120"
          />
          <el-table-column
            prop=""
            label="预测数量(码长)"
            width="120"
          />
        </el-table-column>
        <el-table-column style="text-align:center" label="备纱信息">
          <el-table-column
            prop=""
            label="经纱/纬纱"
            width="120"
          />
          <el-table-column
            prop=""
            label="纱名"
            width="120"
          />
          <el-table-column
            prop=""
            label="长度"
            width="120"
          />
          <el-table-column
            prop=""
            label="百米用量"
            width="120"
          />
          <el-table-column
            prop=""
            label="预计备纱量(Kg)"
            width="120"
          />
          <el-table-column
            prop=""
            label="备纱明细"
            width="120"
          />
        </el-table-column>
        <el-table-column label="备注" />
        <el-table-column label="状态" />
        <el-table-column label="操作" />
      </el-table>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
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

.el-table_1_column_2, .el-table_1_column_9 {
    text-align: center !important
}
</style>
