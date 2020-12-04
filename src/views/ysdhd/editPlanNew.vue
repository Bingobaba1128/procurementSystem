<template>
  <el-card>
    <el-row :gutter="10">
      <!-- {{ param[0] }} -->
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

      </el-col>

      <el-col :lg="{span:4}" class="searchCombo">
        <el-input v-model="selectedSupplier.contactName" disabled>
          <template slot="prepend">负责人</template>
        </el-input>
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

    <el-row style="margin-top: 20px">
      <el-table :data="innerForm" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="经纱产地及型号" prop="jingSha" width="120" />
        <el-table-column label="数量（KG）" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.quanity"
              placeholder=""
              clearable
              type="number"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="单价（元/吨）" prop="unitprice" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.unitprice"
              placeholder=""
              clearable
              type="number"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="到货仓库" prop="cangku" width="120" />
        <el-table-column label="纱期" prop="shaQi" width="160">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.shaQi"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="计划交期" prop="shaQi" width="160">
          <template slot-scope="scope">

            <el-date-picker
              v-model="scope.row.shaQi"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="确认交期" prop="chengPinDate" width="160">
          <template slot-scope="scope">

            <el-date-picker
              v-model="scope.row.chengPinDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="生产安排编号" prop="productionNo" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.productionNo"
              placeholder=""
              :disabled="scope.row.state"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="布编" prop="clothId" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.clothId"
              placeholder=""
              clearable
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="交轴日期" prop="jiaoZhouDate" width="160">
          <template slot-scope="scope">

            <el-date-picker
              v-model="scope.row.jiaoZhouDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="坯布交期" prop="huiPiDate" width="160">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.huiPiDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remarks"
              placeholder=""
              clearable
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="属性" prop="nature" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nature" placeholder="请选择" :disabled="scope.row.state">
              <el-option
                v-for="item in natureList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click.native="checkNature(item.value)"
              />
            </el-select>
          </template>
        </el-table-column>        <el-table-column label="说明" prop="explain" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.explain"
              placeholder=""
              :disabled="scope.row.state"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column v-if="!banned" label="外销单价" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.outUnitprice"
              placeholder=""
              clearable
              type="number"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="完成日期" prop="completeDate" width="160">
          <template slot-scope="scope">
            <el-date-picker
              v-model="selectedSupplier.completeDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>

        <el-table-column label="未定天数" prop="noDingDays" width="120" />
        <el-table-column label="订单证书要求" prop="zhengShuQingKuang" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zhengShuQingKuang"
              placeholder=""
              clearable
              :disabled="scope.row.state"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state" type="text" :disabled="!scope.row.able" @click="changeState(scope.$index, scope.row)">启用编辑</el-button>
            <el-button v-if="!scope.row.state" type="text" :disabled="!scope.row.able" @click="disableState(scope.$index, scope.row)">禁用编辑</el-button>
            <el-button v-if="!scope.row.state" type="text" :disabled="!scope.row.able" @click="updateState(scope.$index, scope.row)">更新</el-button>
            <el-button v-if="!scope.row.able" type="text" @click="cancelDelete(scope.$index, scope.row)">取消删除</el-button>
            <el-button v-if="scope.row.able" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { loadPinZhongByCloth, loadFeature, addNewData, addNewYuanSha } from '@/api/ysdhd'

export default {
  props: ['param', 'dialogEditTableVisible'],
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
      // dialogAddNewTableVisible: false,
      selectedSupplier: {
        id: this.param[0].id,
        signDate: this.getNowTime(),
        name: this.param[0].name,
        contactName: this.param[0].contactName,
        chanDi: '',
        pinZhong: '',
        remarks: this.param[0].remarks,
        signer: this.param[0].signer,
        listS: this.param[0].listS,
        clothId: '',
        yuanShaPurchaseNo: this.param[0].yuanShaPurchaseNo
      },
      planData: '',
      newData: '',
      supplierList: '',
      innerForm: this.param[0].listS,
      productFeatures: '',
      natureList: [
        {
          value: '1',
          label: '外销'
        },
        {
          value: '0',
          label: '内销'
        }
      ],
      banned: true
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
        window.console.log('dscdecew')
        window.console.log(this.productFeatures)
      })
      window.console.log(this.innerForm, 'hi innerForm')
      this.innerForm.map((item, index) => {
        this.$set(this.innerForm[index], 'state', true)
        this.$set(this.innerForm[index], 'able', true)
      })
      //             var param = baseUrl + '/api/getPlanList'
      // addNewYuanSha(param).then(res => {
      //   this.planData = res.data.data
      //   this.planData.map((item,index) => {
      //     this.$set(this.planData[index], 'able', false)
      //   })
      // })
    },
    changeState(index, data) {
      this.$set(this.innerForm[index], 'state', false)
    },
    disableState(index, data) {
      this.$set(this.innerForm[index], 'state', true)
    },

    selectPinZhongTrigger(pinZhong) {
      for (var i = 1; i < this.productFeatures.length; i++) {
        if (this.productFeatures[i].pinZhong == pinZhong) {
          this.$set(this.selectedSupplier, 'chanDi', this.productFeatures[i].chanDi)
        }
      }
    },
    updateState(index,data){
      var url = baseUrl + '/updateRemark?id=' + data.planNo
      loadFeature(url).then(res => {
        this.newData = res.data.data[0]
          
            alert('eea')
            this.$set(this.innerForm[index],'quanity',this.newData.dingGouLiang)
            this.$set(this.innerForm[index],'remarks',this.newData.remarks)
          
          
        window.console.log(this.innerForm[index])
      })
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
      return defaultDate
      // this.$set(this.selectedSupplier, 'signDate', defaultDate)
    },
    formatjingOrWei(val) {
      return val == 0 ? '纬' : '经'
    },
    onChange(name) {
      this.$set(this.selectedSupplier, 'name', name)
    },
    saveToServe() {
      window.console.log(this.selectedSupplier)

      if (this.selectedSupplier.name == '') {
        this.$message.error('请选择供应商')
      } else {
        window.console.log(this.selectedSupplier.listS)
        var list = []
        this.innerForm.map(item => {
          if (item.able == true) {
            list.push(item)
          }
        })
        this.$set(this.selectedSupplier, 'listS', list)
        if (this.selectedSupplier.listS.length === 0) {
          this.$message.error('请保留至少一条数据')
        } else {
          addNewData(this.selectedSupplier).then(res => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.$emit('closeDialog')
            }
          })
        }
      }
    },
    handleDelete(index, row) {
      // this.innerForm.splice(index, 1)
      this.$set(this.innerForm[index], 'able', false)
      this.$set(this.innerForm[index], 'state', true)
    },
    cancelDelete(index, row) {
      this.$set(this.innerForm[index], 'able', true)
    },
    checkNature(value) {
      if (value == 1) {
        this.banned = false
      } else {
        this.banned = true
      }
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
    height: 60px;
}

.searchCombo .expand .el-input-group__prepend {
    height: 60px !important;
}
.expand input {
    height: 60px!important
}
.searchCombo1{
    display: flex;
    height: 60px;
    align-items: flex-end;
}
</style>
