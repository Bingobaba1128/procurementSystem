<template>
  <el-card>
    <!-- 列表区 -->
    <el-row style="margin-bottom: 20px">
          <el-col :span="2" >
        <el-button type="primary" @click="editSelected">新增</el-button>
      </el-col>
      <el-col :span="2" >
        <el-button type="primary" @click="exportExcel">导出Excel</el-button>
      </el-col>
      </el-row>
    <el-row>
      <el-table :data="initAllData" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="类型" prop="" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="属性" prop="shuXing" />
        <el-table-column label="型号" prop="xingHao" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />
        <el-table-column label="核算价格（万元/吨）" prop="hsjg" />
        <el-table-column label="工艺标志" prop="jspsbz" />
        <el-table-column label="成分" prop="" />
        <el-table-column label="备注" prop="note" />
        <el-table-column label="停用标志" prop="tybz">
          <template slot-scope="scope">
            {{ statusCheck(scope.row.tybz) }}
          </template>
        </el-table-column>
        <el-table-column label="单纱强力标准" prop="dsqlbz" />
        <el-table-column label="最低单纱强力标准" prop="zddsqlbz" />
        <el-table-column label="强力CV标准" prop="qlcvbz" />
        <el-table-column label="织偏上限标准" prop="zpsbz" />
        <el-table-column label="捻度标准" prop="ndbz" />
        <el-table-column label="捻系数标准" prop="nxsbz" />
        <el-table-column label="断裂伸长率标准" prop="dlsclbz" />
        <el-table-column label="条干（CV）标准" prop="tgbz" />
        <el-table-column label="存货编码" prop="" />
        <el-table-column label="selfid" prop="" />
        <el-table-column label="操作" />
      </el-table>
    </el-row>

  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { getAllYarnArchives } from '@/api/ysda'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: true,
        1: false
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      initAllData: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {

    // 数据初始化
    initData() {
      getAllYarnArchives().then(res => {
        this.initAllData = res.data.data
        window.console.log(this.initAllData)
      })
    },
    statusCheck(val) {
      return val == false ? '否' : '是'
    }
  }
}
</script>

<style scrope>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}

.jingsha .el-dialog {
  width: 20%;
}
</style>
