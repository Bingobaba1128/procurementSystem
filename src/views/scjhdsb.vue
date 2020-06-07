<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 下单日期 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">下单日期</div>
        <el-date-picker
          v-model="orderDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>

      <!-- 布编选择 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">布编</div>
        <el-input v-model="queryInfo.bbNo" placeholder="请输入布编号" clearable />
      </el-col>

      <!-- 经纬选择 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">经纬</div>
        <el-dropdown split-button class="dropdownBox" @click="handleClick">
          全部
          <el-dropdown-menu slot="dropdown" />
        </el-dropdown>
      </el-col>
      <!-- 购纱计划 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">购纱计划</div>
        <el-dropdown split-button class="dropdownBox" @click="handleClick">
          选择
          <el-dropdown-menu slot="dropdown" style="width:20%" />
        </el-dropdown>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-top:20px">

      <!-- 排序 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">排序</div>
        <el-dropdown split-button class="dropdownBox" @click="handleClick">
          生产单排序
          <el-dropdown-menu slot="dropdown" />
        </el-dropdown>
      </el-col>
      <!-- 需求量 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">需求量</div>
        <el-dropdown split-button class="dropdownBox" @click="handleClick">
          全部
          <el-dropdown-menu slot="dropdown" />
        </el-dropdown>
      </el-col>

      <!-- 订购量-->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">订购量</div>
        <el-form ref="form" style="display:flex" :model="form" :rules="rules">
          <el-form-item style="margin-bottom:0">
            <el-input v-model="form.min" />
          </el-form-item>
          <div style="font-size:30px">
            ~
          </div>
          <el-form-item style="margin-bottom:0">
            <el-input v-model="form.max" />
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 检索按钮 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <el-button type="success" @click="print">检索</el-button>
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
