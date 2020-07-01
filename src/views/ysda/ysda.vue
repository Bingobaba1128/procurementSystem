<template>
  <el-card>
    <!-- 检索区 -->
    <!-- <el-row :gutter="10">

      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">产地</div>
        <el-select v-model="queryInfo.chanDi" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-input v-model="queryInfo.shaZhi" placeholder="请选择" clearable>
          <template slot="prepend">支数（折算支数）</template>
        </el-input>
      </el-col>

      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">工艺停用</div>
        <el-select v-model="queryInfo.gytybz" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

            <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">停用</div>
        <el-select v-model="queryInfo.tybz" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">吊牌</div>
        <el-select v-model="queryInfo.dpbz" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">原纱颜色</div>
        <el-select v-model="queryInfo.yanSe" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="queryInfo.name" placeholder="请输入单号" clearable>
          <template slot="prepend">名称</template>
        </el-input>
      </el-col>
            <el-col :span="4">
        <el-input v-model="queryInfo.xingHao" placeholder="请输入单号" clearable>
          <template slot="prepend">型号</template>
        </el-input>
      </el-col>
            <el-col :lg="{span:4}" class="searchCombo">
        <div class="searchHeader">分类</div>
        <el-select v-model="queryInfo.state" clearable placeholder="请选择">
          <el-option
            v-for="item in infoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="searchData">检索</el-button>
      </el-col>
    </el-row> -->

    <!-- 列表区 -->
    <el-row style="margin-bottom: 20px">
      <el-col :span="2">
        <el-button type="primary" @click="addNewRecord">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-dialog v-if="dialogAddTableVisible" title="原纱档案（新增）" :visible.sync="dialogAddTableVisible" width="95%">
      <addNewForm @closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog v-if="dialogEditTableVisible" title="原纱档案（修改）" :visible.sync="dialogEditTableVisible" width="95%">
      <editForm :param="editData" @closeDialog="closeDialog" />
    </el-dialog>
    <el-row>
      <el-table id="out-table" :data="initAllData" height="500" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="产地" prop="chanDi" />
        <el-table-column label="类型" prop="lx" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="属性" prop="shuXing" />
        <el-table-column label="型号" prop="xingHao" />
        <el-table-column label="支数（折算支数）" prop="shaZhi" />
        <el-table-column label="核算价格（万元/吨）" prop="hsjg" />
        <el-table-column label="工艺标志" prop="jspsbz">
          <!-- <template slot-scope="scope">
            {{ statusCheck(scope.row.jspsbz) }}
          </template> -->
        </el-table-column>
        <el-table-column label="成分" prop="chengFen">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.chengFen" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note" width="160" />
        <el-table-column label="停用标志" prop="tybz">
          <template slot-scope="scope">
            {{ statusCheck(scope.row.tybz) }}
          </template>
        </el-table-column>
        <el-table-column label="单纱强力标准" prop="dsqlbz" />
        <el-table-column label="最低单纱强力标准" prop="zddsqlbz" />
        <el-table-column label="强力CV标准" prop="qlcvbz" />
        <el-table-column label="支偏上限标准" prop="zpsbz" />
        <el-table-column label="捻度标准" prop="ndbz" />
        <el-table-column label="捻系数标准" prop="nxsbz" />
        <el-table-column label="断裂伸长率标准" prop="dlsclbz" />
        <el-table-column label="条干（CV）标准" prop="tgbz" />
        <el-table-column label="存货编码" prop="chbm" />
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editDataM(scope.row.id)">修改</el-button>
            <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </el-card>
</template>

<script>
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { getAllYarnArchives, deleteRecord, getOneRecord } from '@/api/ysda'
import addNewForm from '@/views/ysda/addNewDa'
import editForm from '@/views/ysda/editForm'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  components: {
    addNewForm,
    editForm
  },

  data() {
    return {
      initAllData: '',
      queryInfo: {
        chanDi: '',
        shaZhi: '',
        gytybz: '',
        tybz: '',
        yanSe: '',
        dpbz: '',
        name: '',
        xingHao: ''
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
      dialogAddTableVisible: false,
      dialogEditTableVisible: false,
      editData: ''
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
    },
    exportExcel() {
      this.downloadLoading = true
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '原纱档案.xlsx')
        this.downloadLoading = false
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    addNewRecord() {
      this.dialogAddTableVisible = true
    },
    closeDialog() {
      this.dialogAddTableVisible = false
      this.dialogEditTableVisible = false

      this.initData()
    },
    deleteData(id) {
      // alert(id)

      var url = '/api/deleteYarn/' + id
      deleteRecord(url).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success(res.data.tipInfo)
          this.initData()
        }
        window.console.log(res)
      })
    },
    editDataM(id) {
      this.dialogEditTableVisible = true

      var url = '/api/getOneYarnArchives/' + id
      getOneRecord(url).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.editData = res.data.data
          window.console.log(this.editData)
        }
      })
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
