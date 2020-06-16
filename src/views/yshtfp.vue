<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 备纱单日期 -->
      <el-col :lg="{span:8}" class="searchCombo">
        <div class="searchHeader">采购单号</div>
        <el-input placeholder="" clearable />
      </el-col>

      <!-- 状态 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">入库完成情况</div>
        <el-input placeholder="" clearable />
      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table border stripe>
        <el-table-column type="index" label="序号" />

        <el-table-column label="采购单号" />
        <el-table-column label="原纱品种" />
        <el-table-column label="采购数量(Kg)" />

        <!-- 原纱仓库带入 -->
        <el-table-column class="alignCenter" label="入库详情">
          <el-table-column
            prop=""
            label="入库数量(Kg)"
            width="120"
          />
          <el-table-column
            prop=""
            label="入库日期"
            width="120"
          />
        </el-table-column>

        <el-table-column label="入库完成情况" />
        <el-table-column label="物流单" />
        <el-table-column label="报关单" />
        <el-table-column label="发票号" />
        <el-table-column label="发票照片" />

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

.cell {
    text-align: center !important
}
</style>
