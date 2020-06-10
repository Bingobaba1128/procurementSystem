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
          选择
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
          选择
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

      <!-- 生产安排单 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">生产安排单</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top:20px">

      <!-- 浆染单号 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">浆纱单号</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>

      <!-- 原纱 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">原纱</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>

      <!-- 型号 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">型号</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>

      <!-- 模糊原纱 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">模糊原纱</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top:20px">

      <!-- 型号 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">型号</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>

      <!-- 新单 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">新单</div>
        <el-dropdown split-button class="dropdownBox" @click="handleClick">
          全部
          <el-dropdown-menu slot="dropdown" />
        </el-dropdown>
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
