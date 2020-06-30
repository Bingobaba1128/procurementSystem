<template>
  <el-card>

    <el-row :gutter="10" style="margin-top: 20px">

      <el-table :data="param" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="型号" prop="xingHao" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />

        <el-table-column label="采购价格（元/吨）" prop="cgjg" />
        <el-table-column label="设置日期" prop="setDate" />
        <el-table-column label="备注" prop="remarks" />
        <el-table-column label="记录人" prop="recordMan" />

        <el-table-column label="记录时间" prop="recordDate" />

      </el-table>
    </el-row>
  </el-card>
</template>
<script>

export default {
  props: {
    param: Array
  },
  data() {
    return {
    }
  },

  methods: {
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
