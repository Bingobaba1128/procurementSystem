<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 单号选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.clothId" placeholder="请输入单号" clearable>
          <template slot="prepend">单号</template>
        </el-input>
      </el-col>

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

      <!-- 供应商选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.productionNo" placeholder="请选择" clearable>
          <template slot="prepend">供应商</template>
        </el-input>
      </el-col>

      <el-col :lg="{span:4}" class="searchCombo">
        <el-input v-model="queryInfo.productionNo" clearable>
          <template slot="prepend">负责人</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px" :gutter="10">

      <el-col :lg="{span:12}" class="searchCombo">

        <el-input v-model="queryInfo.productionNo" clearable class="expand">
          <template slot="prepend">备注</template>
        </el-input>
      </el-col>
      <el-col :lg="{span:3}" class="searchCombo1">
        <el-input v-model="queryInfo.productionNo" clearable>
          <template slot="prepend">签订人</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="initData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="经纱产地及型号" prop="" />
        <el-table-column label="数量（KG）" prop="" />
        <el-table-column label="单价（元/吨）" prop="" />
        <el-table-column label="指导入库超限量（KG）" prop="" />
        <el-table-column label="到货仓库" prop="" />
        <el-table-column label="交期" prop="" />
        <el-table-column label="生产安排编号" prop="" />
        <el-table-column label="备注" prop="" />
        <el-table-column label="包装规格（个/包）" prop="" />
        <el-table-column label="包重（KG）" prop="" />
        <el-table-column label="外销单价" prop="" />
        <el-table-column label="类型" prop="" />
        <el-table-column label="说明" prop="" />
        <el-table-column label="删除" prop="" />
        <el-table-column label="完成日期" prop="" />
        <el-table-column label="布编" prop="" />
        <el-table-column label="未定天数" prop="" />
        <el-table-column label="属性" prop="" />
        <el-table-column label="订单" prop="" />

      </el-table>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="10">
      <el-col :span="2">
        <el-button type="primary">确定存入</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">继续添加</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px" :gutter="10">

      <el-col :span="3" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 经纬</span>
        </el-col>

        <el-col :span="16">
          <el-select v-model="value" clearable placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>

      <el-col :span="5" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 纱</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 排序</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">检索</el-button>
      </el-col>

    </el-row>

    <el-row>
      <el-table :data="initData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="勾选采购" prop="" />
        <el-table-column label="未定天数" prop="" />
        <el-table-column label="布编" prop="" />
        <el-table-column label="生产安排单号" prop="" />
        <el-table-column label="经纬" prop="" />
        <el-table-column label="纱产地及型号" prop="" />
        <el-table-column label="需用量（KG）" prop="" />
        <el-table-column label="订购量（KG）" prop="" />
        <el-table-column label="数量（KG）" prop="" />
        <el-table-column label="单价（元/吨）" prop="" />
        <el-table-column label="外销单价" prop="" />
        <el-table-column label="指导入库超量限（KG）" prop="" />
        <el-table-column label="类型" prop="" />
        <el-table-column label="到货仓库" prop="" />
        <el-table-column label="计划交期" prop="" />
        <el-table-column label="确认交期" prop="" />
        <el-table-column label="交轴日期" prop="" />
        <el-table-column label="坯布交期" prop="" />
        <el-table-column label="备注" prop="" />
        <el-table-column label="属性" prop="" />
        <el-table-column label="客户性质" prop="" />
        <el-table-column label="说明" prop="" />
        <el-table-column label="属性" prop="" />

      </el-table>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
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
      dialogAddNewTableVisible: false
    }
  }
}
</script>

<style>
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

.searchCombo .expand{
    height: 200px;
}

.searchCombo .expand .el-input-group__prepend {
    height: 200px !important;
}
.expand input {
    height: 200px!important
}
.searchCombo1{
    display: flex;
    height: 200px;
    align-items: flex-end;
}
</style>
