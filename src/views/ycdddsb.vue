<template style="font-size:10px">
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="15">

      <!-- 备纱单日期 -->
      <el-col :lg="{span:7}" class="searchCombo">
        <div class="searchHeader">备纱单日期</div>
        <el-date-picker
          v-model="queryInfo.beiShaDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 状态 -->
      <el-col :lg="{span:5}" class="searchCombo">
        <div class="searchHeader">状态</div>
        <el-select v-model="queryInfo.state" placeholder="请选择">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <!-- 按钮筛选 -->
      <el-col :lg="{span:6}">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
      <!-- <el-col :lg="{span:2}" class="searchCombo">
        <el-button type="success" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </el-col> -->
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table :data="initData" border stripe max-height="750" :span-method="objectSpanMethod">
        <el-table-column type="index" label="序号" />
        <!-- 预测订单带出 -->
        <el-table-column class="alignCenter" label="预测订单信息">
          <el-table-column
            prop="beiShaDate"
            label="备纱单日期"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="yeWuZu"
            label="业务组"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="yuCeNo"
            label="预测订单号"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="yuCeDate"
            label="预测下单日期"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="variety"
            label="品种"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="yuCeQuanity"
            label="预测数量(码长)"
            width="120"
            show-overflow-tooltip
          />
        </el-table-column>
        <el-table-column style="text-align:center" label="备纱信息" width="1200">
          <el-table-column label="经纱/纬纱" prop="jingOrWei" width="120">
            <template slot-scope="scope">
              <span>{{ formatStatus(scope.row.jingOrWei) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经纬纱名称" prop="name" width="120" show-overflow-tooltip />
          <el-table-column label="长度" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.length"
                placeholder="请输入内容"
                type="number"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="百米用量" prop="yongLiangBybm" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.yongLiangBybm"
                placeholder="请输入内容"
                type="number"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="预计备纱" prop="yuJiBeiSha" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.yuJiBeiSha"
                placeholder="请输入内容"
                type="number"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="备纱明细" prop="beiSahRemarks" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.beiSahRemarks"
                placeholder="请输入内容"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.remarks"
                placeholder="请输入内容"
                clearable
              />
            </template>
          </el-table-column>

        </el-table-column>

        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span>{{ formatStatus1(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200" prop="action">
          <template slot-scope="scope">
            <el-button type="text" @click="saveData(scope.row.yuCeNo)">确定存入</el-button>
            <el-button type="text" :disabled="scope.row.approveState == '1'">{{ formatAppStatus(scope.row.approveState) }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize*10"
          :current-page="pageSetting.pageNumber"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { loadSYuCeData, uploadData, searchData } from '@/api/yuDeDingDan'

export default {
  data() {
    return {
      initOData: '',
      initData: '',
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        beiShaDate: '',
        state: ''
      },
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      stateList: [
        {
          value: '2',
          label: '全部'
        },
        {
          value: '1',
          label: '已安排'
        },
        {
          value: '0',
          label: '未安排'
        }
      ],
      toServeList: [],
      totalSize: ''
    }
  },
  created() {
    this.initDataF()
  },
  methods: {

    // 数据初始化
    initDataF() {
      var url = baseUrl + '/LoadYuCeDingDan?'
      var urlParam = toUrlParam(url, this.pageSetting)
      loadSYuCeData(urlParam).then(res => {
        this.initOData = res.data.data
        this.totalSize = this.initOData[0].pageQuanity
        this.initData = this.mergeTableRow(this.initOData, ['yuCeNo', 'beiShaDate', 'yuCeDate', 'variety', 'yuCeQuanity', 'yeWuZu'])

        window.console.log(this.initData)
      })
    },
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data
      }
      merge.forEach((m) => {
        const mList = {}
        // 循环每一组
        data = data.map((v, index) => {
          // 提取每一组需要合并的列， 此时v[m]就是YC2006-012
          const idVal = v['yuCeNo']
          // window.console.log(idVal)

          if (mList[v['yuCeNo']]) {
            mList[v['yuCeNo']]++
            data[index - mList[v['yuCeNo']] + 1][m + '-span'].rowspan++
            v[m + '-span'] = {
              rowspan: 0,
              colspan: 0
            }
          } else {
            mList[v['yuCeNo']] = 1
            // v是提取出来的每组
            v[m + '-span'] = {
              rowspan: 1,
              colspan: 1
            }
          }
          // window.console.log(v[yuCeNo' + '-span'])
          return v
        })
      })
      window.console.log(data)
      for (var i = 0; i < data.length; i++) {
        // window.console.log(data[i])
        // window.console.log(data[i]['yuCeNo-span'])
        this.$set(data[i], 'action-span', data[i]['yuCeNo-span'])
      }
      window.console.log(data)
      return data
    },
    searchData() {
      window.console.log(this.queryInfo)
      if (this.queryInfo.beiShaDate == '' || this.queryInfo.beiShaDate == null) {
        this.$message.error('请输入备纱单日期')
      } {
        var url = baseUrl + '/LoadYuCeDingDan?'
        var urlParam = toUrlParam(url, this.queryInfo)
        // window.console.log(urlParam)
        searchData(urlParam).then(res => {
          this.initOData = res.data.data
          this.initData = this.mergeTableRow(this.initOData, ['yuCeNo', 'beiShaDate', 'yuCeDate', 'variety', 'yuCeQuanity', 'yeWuZu', 'state'])
        })
      }
    },
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData()
    },
    formatStatus1(val) {
      return val == 0 ? '未安排' : val == 1 ? '已安排' : ''
    },
    formatAppStatus(val) {
      return val == 0 ? '未审核' : val == 1 ? '已审核' : ''
    },
    formatStatus(val) {
      return val == 0 ? '纬' : val == 1 ? '经' : ''
    },
    saveData(no) {
      for (var i = 0; i < this.initData.length; i++) {
        if (this.initData[i].yuCeNo === no) {
          this.toServeList.push(this.initData[i])

          // window.console.log(this.initData[i],'eshi')
        }
      }
      window.console.log(this.toServeList)
      var data = this.toServeList
      uploadData(data).then(res => {
        // window.console.log(res.data.code)
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message({
            message: res.data.data,
            type: 'success'

          })
          this.initDataF()
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
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

.cell {
    text-align: center !important
}
</style>
