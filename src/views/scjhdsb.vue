<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 生产安排单 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">生产单号</div>
        <el-input v-model="queryInfo.produceRequestNo" placeholder="请输入生产安排单" clearable />
      </el-col>

      <!-- 布编选择 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">布编</div>
        <el-input v-model="queryInfo.clothId" placeholder="请输入布编号" clearable />
      </el-col>
      <!-- 经纬纱名称 -->
      <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">经纬纱名称</div>
        <el-input v-model="queryInfo.jingSha" placeholder="请输入经纬纱名称" clearable />
      </el-col>
      <!-- 浆纱单号 -->
      <!-- <el-col :lg="{span:6}" class="searchCombo">
        <div class="searchHeader">浆纱单号</div>
        <el-input v-model="queryInfo.productionNo" placeholder="请输入浆纱单号" clearable />
      </el-col> -->
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">需用量</div>
        <el-select v-model="queryInfo.xuYongName" placeholder="请选择">
          <el-option
            v-for="item in xuYongList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click.native="bindvalue(item.value)"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-top:20px">

      <!-- 下单日期 -->
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">下单日期</div>
        <el-date-picker
          v-model="queryInfo.orderDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <!-- 经纬选择 -->
      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">经纬</div>
        <el-select v-model="queryInfo.jingOrWei" placeholder="请选择">
          <el-option
            v-for="item in jingOrWeiSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <!-- 购纱计划 -->
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">购纱计划</div>
        <el-select v-model="queryInfo.queRenComplete" placeholder="请选择">
          <el-option
            v-for="item in gsPlanSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">证书</div>
        <el-input v-model="queryInfo.zhengshu" placeholder="请输入证书" clearable />
      </el-col>
            <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">备注</div>
        <el-input v-model="queryInfo.remark" placeholder="请输入备注" clearable />
      </el-col>
      <!-- 检索按钮 -->



    </el-row>
    <el-row style="margin-top: 20px">
            <el-col :lg="{span:2}" class="searchCombo">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
      <el-col :lg="{span:2}" class="searchCombo">
        <el-button type="primary" :loading="downloadLoading" icon="el-icon-download" plain @click="exportExcel">导出</el-button>
      </el-col>
      <el-col :lg="{span:2}" class="searchCombo">
        <el-button type="primary" plain @click="clickToShow">批量保存</el-button>
      </el-col>
      <el-col :lg="{span:4}" class="searchCombo" style="margin-left: 20px">
        <div style="display:flex; flex-direction:column; width:100%">
          <div class="searchHeader">需用量合计：{{ totalNeeded }}</div>
          <div class="searchHeader">订购量合计：{{ totalOrderAmount }}</div>
        </div>
      </el-col>
    </el-row>
    <!-- 列表区 -->
    <el-row>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="getInitData"
        border
        stripe
        tooltip-effect="dark"
        :span-method="objectSpanMethod"
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        @selection-change="handleSelectionChange"
      >

        <el-table-column label="序号" prop="clothId">
          <template slot-scope="scope">
            {{ scope.row.indexNo }}
          </template>
        </el-table-column>

        <el-table-column label="下单日期" prop="doTime" width="120" />
        <el-table-column label="布编" prop="clothId" width="120" />
        <el-table-column label="生产单号" prop="productionNo" width="120" />
        <el-table-column label="浆长(米)" prop="jiaoZhouLength" />
        <el-table-column label="坯布长(米)" prop="huiPiLength" />
        <!-- <el-table-column label="生产安排单" prop="produceRequestNo" width="120"/>
        <el-table-column label="浆染厂" prop="jiangRanChang" />
        <el-table-column label="织造厂" prop="zhiZaoChang" /> -->
        <el-table-column label="交轴日期" prop="jiaoZhouDate1" width="100" show-overflow-tooltip />

        <el-table-column label="坯布交期" prop="huiPiDate1" width="100" show-overflow-tooltip />

        <el-table-column label="成品交期" prop="chengPinDate1" width="100" show-overflow-tooltip />

        <!--二级表头 -->
        <el-table-column label="经纬纱信息" width="1900">
          <!-- <el-table ref="multipleTable" border stripe @selection-change="handleSelectionChange"> -->

          <el-table-column label="经/纬纱">
            <template slot-scope="scope">
              <span>{{ formatStatus(scope.row.jingOrWei) }}</span>
            </template>

          </el-table-column>
          <el-table-column label="经纬纱名称" prop="jingSha" width="300" show-overflow-tooltip />
          <!-- <el-table-column label="型号" prop="xingHao" show-overflow-tooltip /> -->

          <el-table-column label="需用量(KG)" prop="xuYaoLiang" width="160">
            <template slot-scope="scope">
              <input v-model="scope.row.xuYaoLiang" placeholder="scope.row.xuYaoLiang" type="number">
            </template>
          </el-table-column>

          <el-table-column label="库存(KG)" prop="kuCun" show-overflow-tooltip />
          <el-table-column label="最低周转量" prop="zhouZhuanLiang" show-overflow-tooltip />
          <el-table-column label="消化量(KG)" prop="xiaoHuaLiang" show-overflow-tooltip />
          <el-table-column label="总需量" prop="totalXuYaoLiang" show-overflow-tooltip />
          <el-table-column label="订购量(KG)" prop="dingGouLiang" width="160">
            <template slot-scope="scope">
              <input v-model="scope.row.dingGouLiang" placeholder="0" type="number">
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column label="备纱情况" prop="beiShaQingKuang" show-overflow-tooltip/>
          <el-table-column label="证书" prop="zhengShuQingKuang" />
          <el-table-column label="纱期" prop="shaQi" />

          <el-table-column label="备注" prop="remarks" width="350">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.remarks"
                type="textarea"
                placeholder="请输入内容"
              />
            </template>
          </el-table-column>
          <el-table-column label="业务组" prop="departmentName" width="120" show-overflow-tooltip/>
          <el-table-column label="客户" prop="clientHu" width="120" show-overflow-tooltip/>
                <el-table-column label="成品数量" prop="dingDanShuLiang" width="120" show-overflow-tooltip />

          <el-table-column label="购纱计划状态" prop="queRenComplete" width="150">
            <template slot-scope="scope">
              <span>{{ formatConfirmStatus(scope.row.queRenComplete) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经纬纱确认状态" prop="querenSymbol" width="120" />

        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize*5"
          :current-page="pageSetting.pageNumber"
          @current-change="handleCurrentChange"
        />
      </el-row>

      <el-table id="out-table" ref="multipleTable" style="display:none" :data="getInitData" border stripe tooltip-effect="dark" :span-method="objectSpanMethod" @selection-change="handleSelectionChange">

        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" prop="doTime" show-overflow-tooltip />
        <el-table-column label="布编" prop="clothId" show-overflow-tooltip />
        <el-table-column label="浆纱单号" prop="productionNo" show-overflow-tooltip />
        <el-table-column label="浆长(米)" prop="jiaoZhouLength" show-overflow-tooltip />
        <el-table-column label="坯布长(米)" prop="huiPiLength" show-overflow-tooltip />
        <el-table-column label="生产安排单" prop="produceRequestNo" show-overflow-tooltip />
        <el-table-column label="浆染厂" prop="jiangRanChang" show-overflow-tooltip />
        <el-table-column label="织造厂" prop="zhiZaoChang" show-overflow-tooltip />
        <el-table-column label="交轴日期" prop="jiaoZhouDate" width="100" show-overflow-tooltip />
        <el-table-column label="坯布交期" prop="huiPiDate" width="100" show-overflow-tooltip />
        <el-table-column label="成品交期" prop="chengPinDate" width="100" show-overflow-tooltip />
        <el-table-column label="经纬纱信息" width="1900">
          <el-table-column label="经/纬纱">
            <template slot-scope="scope">
              <span>{{ formatStatus(scope.row.jingOrWei) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经纬纱名称" prop="jingSha" show-overflow-tooltip />
          <el-table-column label="需用量(KG)" prop="xuYaoLiang" width="160" show-overflow-tooltip />
          <el-table-column label="库存(KG)" prop="kuCun" show-overflow-tooltip />
          <el-table-column label="最低周转量" prop="zhouZhuanLiang" show-overflow-tooltip />
          <el-table-column label="消化量(KG)" prop="xiaoHuaLiang" show-overflow-tooltip />
          <el-table-column label="总需量" prop="totalXuYaoLiang" show-overflow-tooltip />
          <el-table-column label="订购量(KG)" prop="dingGouLiang" show-overflow-tooltip />
          <el-table-column label="备纱情况" prop="beiShaQingKuang" show-overflow-tooltip />
          <el-table-column label="证书情况" prop="zhengShuQingKuang" show-overflow-tooltip />
          <el-table-column label="纱期" prop="shaQi" show-overflow-tooltip />
          <el-table-column label="备注" prop="remarks" width="350" show-overflow-tooltip />
          <el-table-column label="购纱计划状态" prop="queRenComplete" width="350">
            <template slot-scope="scope">
              <span>{{ formatConfirmStatus(scope.row.queRenComplete) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经纬纱确认状态" prop="querenSymbol" width="350" show-overflow-tooltip />
        </el-table-column>
      </el-table>

    </el-row>
  </el-card>
</template>

<script>
import { loadSJDSBData, updatePlanData, searchTotalAmount } from '@/api/scjhdsb'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      xuYongList: [
        { label: '隐藏无需用量', value: '' },
        { label: '显示无需用量', value: '0' }

      ],
      multipleSelection: [],
      totalNeeded: '',
      totalOrderAmount: '',
      queryInfo: {
        produceRequestNo: '',
        clothId: '',
        jingSha: '',
        productionNo: '',
        orderDate: this.getInitDate(),
        jingOrWei: '2',
        queRenComplete: '0',
        pageNumber: 1,
        pageSize: 20,
        xuYongName: '',
        xuYong: '',
        zhengshu: '',
        remark:''
      },
      listLoading: true,

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
        // orderDate: this.systemDate + ',' + this.systemDate,
        pageNumber: 1,
        pageSize: 20
      },
      getInitOData: '',
      getInitData: '',
      checkedBox: [],
      systemDate: '',
      downloadLoading: false,
      totalSize: ''
    }
  },

  created() {
    this.DateFormat()
    this.initData(this.pageSetting)
  },
  methods: {
    initData(setting) {
      var url = baseUrl + '/LoadPlanList?'
      var searchInfo = combineObject(this.queryInfo, setting)

      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true

      loadSJDSBData(urlParam).then(res => {
        this.listLoading = false

        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          if (res.data.data.length === 0) {
            this.getInitData = []
            this.totalNeeded = 0
            this.totalOrderAmount = 0
          } else {
            this.getInitOData = res.data.data
            this.totalSize = this.getInitOData[0].pageQuanity

            // this.totalNeeded = this.getInitOData[0].xyl
            // this.totalOrderAmount = this.getInitOData[0].dgl
            this.totalNeeded = 0
            this.totalOrderAmount = 0

            // 进行计算
            this.getInitOData.map(item => {
              this.totalNeeded += parseInt(item.xuYaoLiang)
              this.totalOrderAmount += parseInt(item.dingGouLiang)
            })

            // 合并的地方
            var list = []
            this.getInitOData.map(item => {
              if (list.indexOf(item.produceRequestNo) === -1) {
                list.push(item.produceRequestNo)
              }
            })
            list.map((no, index) => {
              this.getInitOData.map((item, index1) => {
                if (item.produceRequestNo === no) {
                  this.$set(this.getInitOData[index1], 'indexNo', index + 1)
                }
              })
            })

            window.console.log(this.getInitOData)
            this.getInitOData.map((item, index) => {
              this.$set(this.getInitOData[index], 'jiaoZhouDate1', item.jiaoZhouDate.join(','))
              this.$set(this.getInitOData[index], 'huiPiDate1', item.huiPiDate.join(','))
              this.$set(this.getInitOData[index], 'chengPinDate1', item.chengPinDate.join(','))
            })
            this.getInitData = this.mergeTableRow(this.getInitOData, ['doTime', 'clothId', 'productionNo', 'jiaoZhouLength', 'huiPiLength', 'produceRequestNo', 'jiangRanChang', 'zhiZaoChang', 'jiaoZhouDate', 'huiPiDate', 'chengPinDate'])
          }
        }
      })
    },
    getInitDate() {
      var list = []
      list.push(this.getPreMonthTime())
      list.push(this.getNowTime())
      return list
    },
    bindvalue(value) {
      this.queryInfo.xuYong = value
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
    },
    getPreMonthTime() {
      var now = new Date()

      now.setMonth(now.getMonth() - 1)
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    },
    // 给合并提供样式
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data
      }
      merge.forEach((m) => {
        const mList = {}
        // 循环每一组
        data = data.map((v, index) => {
          // 提取每一组需要合并的列， 此时v[m]就是YC2006-012
          // const idVal = v['produceRequestNo']
          // window.console.log(idVal)

          if (mList[v['productionNo']]) {
            mList[v['productionNo']]++
            data[index - mList[v['productionNo']] + 1][m + '-span'].rowspan++
            v[m + '-span'] = {
              rowspan: 0,
              colspan: 0
            }
          } else {
            mList[v['productionNo']] = 1
            // v是提取出来的每组
            v[m + '-span'] = {
              rowspan: 1,
              colspan: 1
            }
          }
          // window.console.log(v[m + '-span'])
          return v
        })
      })
      // window.console.log(data)
      return data
    },
    // 合并实现方法
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData(this.pageSetting)
    },
    formatStatus(val) {
      return val == 0 ? '纬' : val == 1 ? '经' : ''
    },
    formatConfirmStatus(val) {
      // 这里反了
      return val == 0 ? '未确认' : val == 1 ? '已确认' : ''
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
    searchData() {
      // window.console.log(this.queryInfo)
      if (this.queryInfo.orderDate == '') {
        this.$message.error('请添加下单日期')
      } else {
        this.initData(this.queryInfo)
        // searchTotalAmount()
        // searchTotalAmount().then(res => {
        //   this.totalNeeded = res.data.data.totalXuYaoLiang
        //   this.totalOrderAmount = res.data.data.totalDingGouLiang
        // })
      }
    },
    clickToShow() {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].querenSymbol == '未确认') {
          this.$message.error('勾选中包含未确认的经纬纱')
          return
        }
      }
      updatePlanData(this.multipleSelection).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.initData(this.queryInfo)
        }
      })
    },
    DateFormat() {
      var date = new Date()
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString().padStart(2, '0')
      var day = date.getDate().toString().padStart(2, '0')
      var formatedDate = year + '-' + month + '-' + day
      this.systemDate = formatedDate
      // this.$set(this.queryInfo, 'orderDate', this.systemDate + ',' + this.systemDate)
      // this.$set(this.pageSetting, 'orderDate', this.systemDate + ',' + this.systemDate)
    },
    exportExcel() {
      this.downloadLoading = true
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '生产计划订纱表.xlsx')
        this.downloadLoading = false
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    }
  }
}
</script>

<style scoped>
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
