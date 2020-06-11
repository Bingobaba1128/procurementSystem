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
        <el-select v-model="queryInfo.jingOrWei" placeholder="请选择">
            <el-option
              v-for="item in jingOrWeiSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-col>
      <!-- 购纱计划 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">购纱计划</div>
        <el-select v-model="queryInfo.gsPlan" placeholder="请选择">
            <el-option
              v-for="item in gsPlanSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-top:20px">

      <!-- 排序 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">排序</div>
        <el-select v-model="queryInfo.orderStandard" placeholder="请选择">
            <el-option
              v-for="item in orderList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <!-- <el-dropdown split-button class="dropdownBox" @click="handleClick">
          生产单排序
          <el-dropdown-menu slot="dropdown" />
        </el-dropdown> -->
      </el-col>


      <!-- 生产安排单 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">{{queryInfo.orderStandard}}</div>
        <el-input v-model="queryInfo.bbNo" placeholder="" clearable />
      </el-col>
            <!-- 检索按钮 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <el-button type="success" @click="print">检索</el-button>
      </el-col>
    </el-row>


    <!-- 列表区 -->
    <el-row>
      <el-table ref="multipleTable" :data="getInitData" border stripe tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" />

        <el-table-column label="下单日期" prop="doTime" />
        <el-table-column label="布编" prop="clothId" />
        <el-table-column label="浆纱单号" prop="productionNo" />
        <el-table-column label="浆长(米)" prop="jiaoZhouLength" />
        <el-table-column label="坯布长(米)" prop="huiPiLength" />
        <el-table-column label="生产安排单" prop="produceRequestNo" />
        <el-table-column label="浆染厂" prop="jiangRanChang" />
        <el-table-column label="织造厂" prop="zhiZaoChang" />
        <el-table-column label="交轴日期" prop="jiaoZhouDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="坯布交期" prop="huiPiDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="经/纬纱">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.jingOrWei) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="经纬纱名称" prop="jingSha" />

        <el-table-column label="需用量(KG)" prop="" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.xuYaoLiang" placeholder="scope.row.xuYaoLiang" />
          </template>
        </el-table-column>
        <el-table-column label="备纱情况" prop="beiShaQingKuang" />
        <el-table-column label="证书情况" prop="zhengShuQingKuang" />
        <el-table-column label="库存(KG)" prop="kuCun" />
        <el-table-column label="最低周转量" prop="zhouZhuanLiang" />
        <el-table-column label="消化量(KG)" prop="xiaoHuaLiang" />
        <el-table-column label="总需量" prop="totalXuYaoLiang" />
        <el-table-column label="订购量(KG)" prop="">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dingGouLiang" placeholder="0" />
          </template>
        </el-table-column>
        <el-table-column label="纱期" prop="shaQi" />

        <el-table-column label="成品交期" prop="chengPinDate" />
        <el-table-column label="备注" prop="remarks" width="350">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remarks"
              type="textarea"
              placeholder="请输入内容"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-button type="success" @click="clickToShow()">确定上传</el-button>
  </el-card>
</template>

<script>
import { loadSJDSBData, updatePlanData } from '@/api/scjhdsb'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'

export default {
  data() {
    return {
      multipleSelection: [],
      orderDate: '',
      queryInfo: {
        selectedDate: '',
        jingOrWei: '全部',
        gsPlan: '全部',
        orderStandard: ''

      },
      orderList: [
        {
          value: '生产安排单',
          label: '生产安排单'
        },
        {
          value: '经纬纱名称',
          label: '经纬纱名称'
        },
        {
          value: '浆纱单号',
          label: '浆纱单号'
        }],
      jingOrWeiSelect: [
        {
          value: '2',
          label: '全部'
        },
        {
          value: '1',
          label: '经纱'
        },
        {
          value: '0',
          label: '纬纱'
        }],
        gsPlanSelect: [
        {
          value: '2',
          label: '全部'
        },
        {
          value: '1',
          label: '已确认'
        },
        {
          value: '0',
          label: '未确认'
        }],
      form: {
        min: '',
        max: ''
      },
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      getInitData: '',
      checkedBox: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      var url = baseUrl + '/LoadPlanList?'
      var urlParam = toUrlParam(url, this.pageSetting)
      loadSJDSBData(urlParam).then(res => {
        this.getInitData = res.data.data
        window.console.log(this.getInitData)
      })
    },

    formatStatus(val) {
      return val == 0 ? '纬' : val == 1 ? '经' : ''
    },
    // 勾选表单
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    print() {
      window.console.log(this.queryInfo)
    },
    clickToShow() {
      // window.console.log(this.getInitData)
      // window.console.log(this.multipleSelection)
      updatePlanData(this.multipleSelection).then(res => {
        window.console.log(res)
      })
    }
  }
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
