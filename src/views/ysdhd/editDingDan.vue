<template>
  <el-card>
    <el-row :gutter="10">
      {{param[0]}}
      <!-- 单号选择 -->
      <el-col :span="5">
        <el-input v-model="param[0].yuanShaPurchaseNo" placeholder="" disabled>
          <template slot="prepend">单号</template>
        </el-input>
      </el-col>
      <!-- 日期选择 -->
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">日期</div>
        <el-date-picker
          v-model="selectedSupplier.signDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <!-- 供应商选择 -->

      <el-col :lg="{span:5}" class="searchCombo">
        <el-input v-model="param[0].name" placeholder="" disabled>
          <template slot="prepend">供应商</template>
        </el-input>
        <!-- <el-select
          v-model="selectedSupplier.id"
          filterable
          placeholder="请选择"
          @change="selectTrigger(selectedSupplier.id)"
          disabled
        >
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="onChange(item.name)"
          /> -->
        <!-- </el-select> -->
      </el-col>

      <el-col :lg="{span:4}" class="searchCombo">
        <el-input v-model="selectedSupplier.contactName" disabled>
          <template slot="prepend">负责人</template>
        </el-input>
      </el-col>

      <!-- 导出订单 -->
      <el-col :span="2">
        <el-button type="primary" @click="searchData">导出订单</el-button>
      </el-col>
      <!-- 导出模板 -->
      <el-col :span="2">
        <el-button type="primary" @click="dialogAddNewTableVisible = true">导出模板</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px" :gutter="10">

      <el-col :lg="{span:12}" class="searchCombo">

        <el-input v-model="selectedSupplier.remarks" clearable class="expand">
          <template slot="prepend">备注</template>
        </el-input>
      </el-col>
      <el-col :lg="{span:5}" class="searchCombo1">
        <el-input v-model="selectedSupplier.signer" clearable>
          <template slot="prepend">签订人</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="10">

      <el-col :span="3">
        <el-button type="primary" @click="addRow">增加行</el-button>
      </el-col>

      <el-col :span="5" :offset="2" style="display:flex">
        <el-input v-model="selectedSupplier.chanDi" disabled>
          <template slot="prepend">产地</template>
        </el-input>
      </el-col>

      <el-col :span="7" :offset="1" class="searchCombo">
        <div class="searchHeader">品种</div>
        <el-select
          v-model="selectedSupplier.pinZhong"
          filterable
          placeholder="请选择"
          @change="selectPinZhongTrigger(selectedSupplier.pinZhong)"
        >
          <el-option
            v-for="item in productFeatures"
            :key="item.id"
            :label="item.pinZhong"
            :value="item.pinZhong"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="10">
      <el-col :span="3" />
      <el-col :span="5">
        <el-input v-model="queryInfo.clothId" placeholder="请输入" clearable>
          <template slot="prepend">原纱名称</template>
        </el-input>
      </el-col>

      <el-col :span="6" class="searchCombo">
        <div class="searchHeader">到货仓库</div>

        <el-select v-model="value" clearable disabled placeholder="越南原纱仓">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="5" class="searchCombo">
        <div class="searchHeader">属性</div>

        <el-select v-model="nature" clearable placeholder="请选择">
          <el-option
            v-for="item in property"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-col>
      <el-col :span="5" style="display:flex">
        <el-input v-model="selectedSupplier.clothId" placeholder="请输入" clearable @change="selectClothTrigger(selectedSupplier.clothId)">
          <template slot="prepend">布编</template>
        </el-input>
      </el-col>

    </el-row>

    <el-row>
      <el-table :data="innerForm" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="经纱产地及型号" prop="jingSha" />
        <el-table-column label="数量（KG）">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.quanity"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="单价（元/吨）" prop="unitprice">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.unitprice"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="到货仓库" prop="cangku" />
        <el-table-column label="纱期" prop="shaQi">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.shaQi"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="生产安排编号" prop="productionNo">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.productionNo"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remarks"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="外销单价" prop="outUnitprice">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.outUnitprice"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="nature" />
        <el-table-column label="说明" prop="explain">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.explain"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="删除" prop="" />
        <el-table-column label="布编" prop="clothId">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.clothId"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="未定天数" prop="noDingDays">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.noDingDays"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="订单证书要求" prop="zhengShu">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zhengShu"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="10">
      <el-col :span="2">
        <el-button type="primary" @click="saveToServe">确定存入</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { addNewYuanSha, loadContactPerson, loadPinZhongByCloth, loadFeature, addNewData } from '@/api/ysdhd'

export default {
  props: ['param'],
  data() {
    return {
      property: [{
        value: '0',
        label: '内销'
      }, {
        value: '1',
        label: '外销'
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
        id: this.param[0].name,
        signDate: this.getNowTime(),
        name: '',
        contactName: this.param[0].contactName,
        chanDi: '',
        pinZhong: '',
        remarks: this.param[0].remarks,
        signer: this.param[0].signer,
        listS: this.param[0].listS,
        clothId: '',
        yuanShaPurchaseNo: this.param[0].yuanShaPurchaseNo
      },
      supplierList: '',
      innerForm: this.param[0].listS,
      nature: '内销',
      productFeatures: ''
    }
  },
  created() {
    this.initOData()
  },
  methods: {
    test() {
      window.console.log(this.param)
    },
    // 供应商初始化
    initOData() {
      var url2 = baseUrl + '/api/getYarnArchives?GysId=' + this.param[0].id
      loadFeature(url2).then(res => {
        this.productFeatures = res.data.data
      })
    },
    selectPinZhongTrigger(pinZhong) {
      for (var i = 1; i < this.productFeatures.length; i++) {
        if (this.productFeatures[i].pinZhong == pinZhong) {
          this.$set(this.selectedSupplier, 'chanDi', this.productFeatures[i].chanDi)
        }
      }
    },
    selectClothTrigger(clothId) {
      window.console.log(clothId)
      var url = baseUrl + '/searchPinZhongByClothId?clothId=' + clothId
      loadPinZhongByCloth(url).then(res => {
        this.productFeatures = res.data.data
        window.console.log(this.productFeatures)
      })
      // window.console.log('here 2: ' + this.productFeatures)
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      console.log(defaultDate)
      return defaultDate
      // this.$set(this.selectedSupplier, 'signDate', defaultDate)
    },
    addRow() {
      var insertItem = {
        id: null,
        jingSha: this.selectedSupplier.pinZhong + '' + this.selectedSupplier.chanDi,
        quanity: '',
        unitprice: '',
        cangku: '越南原纱仓',
        shaQi: '',
        productionNo: '',
        remarks: '',
        outUnitprice: '',
        nature: this.nature,
        explain: '',
        clothId: '',
        noDingDays: '',
        zhengShu: ''
      }
      this.innerForm.push(insertItem)
      this.$set(this.selectedSupplier, 'listS', this.innerForm)
    },
    onChange(name) {
      this.$set(this.selectedSupplier, 'name', name)
    },
    saveToServe() {
      window.console.log(this.selectedSupplier)
      addNewData(this.selectedSupplier).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          window.console.log(res.data)
        }
      })
    },
    handleDelete(index, row) {
      this.innerForm.splice(index, 1)
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
