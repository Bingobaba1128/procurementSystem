<template>
  <el-card>
    <el-row :gutter="10">

      <!-- 单号选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.clothId" placeholder="" disabled>
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
        <div class="searchHeader">供应商</div>
        <el-select
          v-model="selectedSupplier.name"
          filterable
          placeholder="请选择"
          @change="onChange(selectedSupplier.name)"
        >
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="selectTrigger(item.id)"
          />
        </el-select>
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
    <el-row style="margin-top: 20px" :gutter="10">

      <el-col :span="4" class="searchCombo">
        <div class="searchHeader">经纬</div>

        <el-select v-model="searchQuery.jingOrWei" clearable placeholder="请选择">
          <el-option
            v-for="item in jingWeiList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="5">
        <el-input v-model="searchQuery.jingSha" placeholder="请输入" clearable>
          <template slot="prepend">纱</template>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchJingData">检索</el-button>
      </el-col>

    </el-row>

    <el-row>
      <el-table :data="planData" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="勾选采购">
          <template slot-scope="scope">
            <el-button type="text" @click="addRow(scope.row.id)">确定</el-button>
          </template>
        </el-table-column>
        <el-table-column label="未定天数" prop="noDingDays" width="120" />
        <el-table-column label="布编" prop="clothId" width="120" />
        <el-table-column label="生产安排单号" prop="productionNo" width="120" />
        <el-table-column label="经纬" prop="jingOrWei" width="120">
          <template slot-scope="scope">
            {{ formatjingOrWei(scope.row.jingOrWei) }}
          </template>
        </el-table-column>
        <el-table-column label="纱产地及型号" prop="jingShaD" width="120" />
        <el-table-column label="需用量（KG）" prop="xuYaoLiang" width="120" />
        <el-table-column label="订购量（KG）" prop="dingGouLiang" width="120" />
        <el-table-column label="价格" prop="hsjg" width="120" />

        <el-table-column label="到货仓库" width="120">
          越南原纱仓
        </el-table-column>
        <el-table-column label="计划交期" prop="shaQi" width="120" />
        <el-table-column label="确认交期" prop="chengPinDate" width="120">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.chengPinDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="交轴日期" prop="jiaoZhouDate" width="120">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="坯布交期" prop="huiPiDate" width="120">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks" width="120" />
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-table :data="innerForm" border stripe max-height="750">

        <el-table-column type="index" label="序号" />
        <el-table-column label="经纱产地及型号" prop="jingSha" width="120" />
        <el-table-column label="数量（KG）" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.dingGouLiang"
              placeholder=""
              clearable
              type="number"
            />
          </template>
        </el-table-column>
        <el-table-column label="单价（元/吨）" prop="unitPrice" width="120" />
        <el-table-column label="到货仓库" prop="cangku" width="120" />
        <el-table-column label="纱期" prop="shaQi" width="160">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.shaQi"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              
            />
          </template>
        </el-table-column>
        <el-table-column label="确认交期" prop="chengPinDate" width="160">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.chengPinDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>

        </el-table-column>
        <el-table-column label="生产安排编号" prop="productionNo" width="120" />
        <el-table-column label="交轴日期" prop="jiaoZhouDate" width="160">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="坯布交期" prop="huiPiDate" width="160">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remarks"
              placeholder=""
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="属性" prop="nature" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nature" placeholder="请选择">
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
            />
          </template>
        </el-table-column>
        <el-table-column label="完成日期" prop="" width="160" />
        <el-table-column label="布编" prop="clothId" width="120" />
        <el-table-column label="未定天数" prop="noDingDays" width="120" />
        <el-table-column label="订单证书要求" prop="zhengShuQingKuang" width="120" />
        <el-table-column label="操作" width="120">
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
import { addNewYuanSha, loadContactPerson, searchData, loadPinZhongByCloth, loadFeature, addNewData } from '@/api/ysdhd'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  data() {
    return {
      jingWeiList: [{
        value: '0',
        label: '纬'
      }, {
        value: '1',
        label: '经'
      },
      {
        value: '2',
        label: '全部'
      }
      ],
      property: [{
        value: '0',
        label: '内销'
      }, {
        value: '1',
        label: '外销'
      }],
      searchQuery: {
        jingOrWei: '',
        jingSha: '',
        name: ''
      },
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
      userInput: {
        amount: '',
        unitPrice: '',
        outUnitprice: ''
      },
      queryInfo: {
        doTime: '',
        clothId: '',
        productionNo: '',
        state: '',
        suppler: ''
      },
      dialogAddNewTableVisible: false,
      selectedSupplier: {
        signDate: this.getNowTime(),
        name: '',
        contactName: '',
        chanDi: '',
        pinZhong: '',
        remarks: '',
        signer: '',
        listS: '',
        clothId: ''
      },
      supplierList: '',
      innerForm: [],
      nature: '0',
      productFeatures: '',
      planData: '',
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
      window.console.log(this.productFeatures)
    },
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
        this.selectedSupplier.contactName = res.data.data
        this.$set(this.selectedSupplier, 'id', id)
        window.console.log(this.selectedSupplier)
      })
      // 加载产地品种
      var url2 = baseUrl + '/api/getYarnArchives?GysId=' + id
      loadFeature(url2).then(res => {
        // window.console.log(res.data.data)
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
    addRow(id) {
      for (var i = 0; i < this.planData.length; i++) {
        if (this.planData[i].id == id) {
          var data = this.planData[i]
          window.console.log(data,'data')
          var insertItem = {
            id: data.id,
            jingSha: data.jingShaD,
            quanity: data.xuYaoLiang,
            cangku: '越南原纱仓',
            shaQi: data.shaQi,
            productionNo: data.productionNo,
            remarks: data.remarks,
            outUnitprice: '',
            nature: data.nature,
            explain: '',
            clothId: data.clothId,
            noDingDays: data.noDingDays,
            planNo: data.id,
            chengPinDate: data.chengPinDate,
            huiPiDate: data.huiPiDate,
            jiaoZhouDate: data.jiaoZhouDate,
            jingOrWei: data.jingOrWei,
            dingGouLiang: data.dingGouLiang,
            zhengShuQingKuang: data.zhengShuQingKuang,
            unitPrice: data.hsjg
          }
          window.console.log(insertItem.unitPrice)
          this.innerForm.push(insertItem)
          window.console.log(this.innerForm,'indneer')
          this.$set(this.selectedSupplier, 'listS', this.innerForm)
        }
      }
    },
    onChange(name) {
      this.$set(this.selectedSupplier, 'name', name)
    },
    saveToServe() {
      window.console.log(this.selectedSupplier)
      this.$set(this.selectedSupplier.listS[0], 'quanity',this.selectedSupplier.listS[0].dingGouLiang)
      this.$set(this.selectedSupplier.listS[0], 'unitprice',this.selectedSupplier.listS[0].unitPrice)
      if (this.selectedSupplier.name == '') {
        this.$message.error('请选择供应商')
      } else {
        window.console.log(this.selectedSupplier.listS)
        if (this.selectedSupplier.listS[0].unitPrice == '' || this.selectedSupplier.listS[0].quanity == '') {
          this.$message.error('请添加产品数量和单价')
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
      this.innerForm.splice(index, 1)
    },
    searchJingData() {
      var url = baseUrl + '/loadPlanData?'
      this.$set(this.searchQuery,'name', this.selectedSupplier.name)
      var urlParam = toUrlParam(url, this.searchQuery)
      searchData(urlParam).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.planData = res.data.data
          for (var i = 0; i < this.planData.length; i++) {
            this.$set(this.planData[i], 'nature', '0')
          }
        }
      })
    },
    checkNature(value) {
      if (value == 1) {
        this.banned = false
      } else {
        this.banned = true
      }
    },
    formatjingOrWei(val) {
      return val == 0 ? '纬' : '经'
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
