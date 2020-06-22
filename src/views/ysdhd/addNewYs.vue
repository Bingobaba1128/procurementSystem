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

      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">供应商</div>
        <el-select
          v-model="selectedSupplier.id"
          filterable
          placeholder="请选择"
          @change="selectTrigger(selectedSupplier.id)"
        >
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>

      <el-col :lg="{span:4}" class="searchCombo">
        <el-input v-model="selectedSupplier.personInchargeName" disabled>
          <template slot="prepend">负责人</template>
        </el-input>
      </el-col>

      <!-- 导出订单 -->
      <el-col :span="2">
        <el-button type="primary" @click="searchData">导出订单</el-button>
      </el-col>
      <!-- 原始订单 -->
      <el-col :span="2">
        <el-button type="primary" @click="dialogAddNewTableVisible = true">原始订单</el-button>
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
    <el-row style="margin-top: 20px" :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" @click="addRow">增加行</el-button>
      </el-col>

      <el-col :span="3" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 产地</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="selectedSupplier.chanDi" disabled />
        </el-col>
      </el-col>

      <el-col :span="5" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 品种*</span>
        </el-col>
        <el-col :span="16">
          <el-select
            v-model="selectedSupplier.pinZhong"
            filterable
            placeholder="请选择"
            @change="selectPinZhongTrigger(selectedSupplier.pinZhong)"
          >
            <el-option
              v-for="item in productFeature"
              :key="item.id"
              :label="item.pinZhong"
              :value="item.pinZhong"
            />
          </el-select>
        </el-col>
      </el-col>

      <el-col :span="3" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 到货仓库</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="value" clearable disabled placeholder="越南原纱仓">
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
          <span> 属性</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3" style="display:flex">
        <el-col :span="8" style="text-align:center; line-height:40px">
          <span> 客户</span>
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

    </el-row>

    <el-row>
      <el-table :data="initData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="修改" prop="" />
        <el-table-column label="经纱产地及型号" prop="" />
        <el-table-column label="数量（KG）" prop="" />
        <el-table-column label="单价（元/吨）" prop="" />
        <el-table-column label="到货仓库" prop="" />
        <el-table-column label="纱期" prop="" />
        <el-table-column label="生产安排编号" prop="" />
        <el-table-column label="备注" prop="" />
        <el-table-column label="外销单价" prop="" />
        <el-table-column label="类型" prop="" />
        <el-table-column label="说明" prop="" />
        <el-table-column label="删除" prop="" />
        <el-table-column label="布编" prop="" />
        <el-table-column label="未定天数" prop="" />
        <el-table-column label="订单证书要求" prop="" />

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
  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { addNewYuanSha, loadContactPerson, loadFeature } from '@/api/ysdhd'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  data() {
    return {
      filterList: [{
        value: '选项1',
        label: '供应商A'
      }, {
        value: '选项2',
        label: '供应商B'
      }, {
        value: '选项3',
        label: '供应商C'
      }, {
        value: '选项4',
        label: '供应商D'
      }, {
        value: '选项5',
        label: '供应商E'
      }],
      property: [{
        value: '0',
        label: '内销'
      }, {
        value: '1',
        label: '外销'
      }],
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
        state: '',
        suppler: ''
      },
      dialogAddNewTableVisible: false,
      selectedSupplier: {
        name: '',
        id: '',
        contactName: '',
        personInchargeName: '',
        chanDi: '',
        pinZhong: ''
      },
      supplierList: '',
      productFeature: ''
    }
  },
  created() {
    this.initOData()
  },
  methods: {
    // 供应商初始化
    initOData() {
      var url = baseUrl + '/api/supplier/getAllSupplier?supplierType=1'
      // var urlParam = toUrlParam(url, this.queryInfo)
      window.console.log(url)
      addNewYuanSha(url).then(res => {
        this.supplierList = res.data.data
        window.console.log(this.supplierList)
      })
    },
    selectTrigger(id) {
      // 加载指定供应商联系人
      var url = baseUrl + '/api/supplier/getLoadContactName?id=' + id
      loadContactPerson(url).then(res => {
        this.selectedSupplier.personInchargeName = res.data.data
        window.console.log(this.selectedSupplier)
      })
      // 加载产地品种
      var url2 = baseUrl + '/api/getYarnArchives?GysId=' + id
      loadFeature(url2).then(res => {
        // window.console.log(res.data.data)
        this.productFeature = res.data.data
      })
    },
    selectPinZhongTrigger(pinZhong) {
      for (var i = 1; i < this.productFeature.length; i++) {
        if (this.productFeature[i].pinZhong == pinZhong) {
          this.$set(this.selectedSupplier, 'chanDi', this.productFeature[i].chanDi)
        }
      }
    },
    addRow() {
      window.console.log(this.selectedSupplier)
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
