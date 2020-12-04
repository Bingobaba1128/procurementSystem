<template>
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="10">

      <!-- 日期选择 -->
      <el-col :span="4">
        <el-date-picker
          v-model="queryInfo.doTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 布编选择 -->
      <el-col :span="4">
        <el-input v-model="queryInfo.clothId" placeholder="请输入布编号" clearable>
          <template slot="prepend">布编</template>
        </el-input>
      </el-col>

      <!-- 生产单号 -->
      <el-col :span="6">
        <el-input v-model="queryInfo.productionNo" placeholder="请输入生产单号" clearable>
          <template slot="prepend">生产单号</template>
        </el-input>
      </el-col>

      <!-- 确认订单状态 -->
      <el-col :span="4">
        <el-select v-model="queryInfo.stateName" placeholder="确认状态">
          <!-- <template slot="prefix">确认状态</template> -->
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            @click.native="changeState(item.value)"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="searchData">检索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="postData">批量提交</el-button>
        <!-- <el-button type="success" @click="getReplaceJs(jsData.jingsha,jsData.shaZhi)">筛选</el-button> -->

      </el-col>
    </el-row>
            <el-dialog v-if="dialogReplaceJSVisible" v-dialogDrag title="选择替换的纬纱" :visible.sync="dialogReplaceJSVisible" :close-on-click-modal="false">
              <el-form style="display:flex">
                <el-form-item label="产地" prop="chanDi" style="flex:1">
                  <el-select v-model="chanDi" filterable placeholder="请选择您所需要的产地">
                    <el-option
                      v-for="item in chanDiList"
                      :key="item.chanDi"
                      :label="item.chanDi"
                      :value="item.chanDi"
                      @click.native="searchJing(item, item.chanDi)"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="纬纱" prop="jingsha" style="flex:1">
                  <el-select v-model="JSvalue" filterable placeholder="请选择您所需要的纬纱">
                    <el-option
                      v-for="item in jingshaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      @click.native="onChange(item)"
                    />
                  </el-select>
                </el-form-item>
                                                <el-form-item label="型号" prop="xingHao"  style="flex:1">
                  <el-select v-model="xingHao" filterable placeholder="" disabled>
                    <el-option
                      v-for="item in jingshaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogReplaceJSVisible = false">取 消</el-button>
                <el-button type="primary" @click="switchJSType( JSvalue, selectedID)">确 定</el-button>
              </div>
            </el-dialog>
    <!-- 列表区 -->
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="jsData"
        border
        stripe
        element-loading-text="努力加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255, 255, 0.9)"
        empty-text=" "
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" prop="doTime" width="120" show-overflow-tooltip />
        <el-table-column label="生产单号" prop="productionNo" width="120" show-overflow-tooltip />
        <el-table-column label="布编" prop="clothId" width="120" show-overflow-tooltip />
        <el-table-column label="织长" prop="huiPiLength" width="120" show-overflow-tooltip />
        <el-table-column label="织缩率" prop="zhiBuZhiChengLv" width="120">
          <template slot-scope="scope">
            {{ scope.row.zhiBuZhiChengLv }}%
          </template>
        </el-table-column>
                <el-table-column label="成品数量" prop="dingDanShuLiang" width="120" show-overflow-tooltip />

        <el-table-column label="纬纱" width="320">
          <template slot-scope="scope">
            <el-button type="text" @click="showReplaceJS(scope.row.jingSha,scope.row.shaZhi,scope.row.id,scope.row,scope.$index)"> {{ scope.row.jingSha }} <i class="el-icon-arrow-down el-icon--right" /> </el-button>

          </template>
        </el-table-column>
        <el-table-column label="型号" prop="xingHao" width="120" show-overflow-tooltip />

        <el-table-column label="需用量" prop="xuYongLiang" width="120" show-overflow-tooltip />
        <el-table-column label="计划轴期" prop="jiaoZhouDate" width="120" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="计划坯期" prop="huiPiDate" width="120" show-overflow-tooltip />
        <!-- <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="参考百米用纬" prop="weiShaBmysl" width="120" show-overflow-tooltip />
        <el-table-column label="证书" prop="zhengShu" width="120" show-overflow-tooltip />

        <!-- <el-table-column label="客户" prop="clientName" width="120" show-overflow-tooltip />
        <el-table-column label="业务员" prop="saleManName" width="120" show-overflow-tooltip /> -->
                <el-table-column
          label="全选"
          type="selection"
          width="80"
        />
        <el-table-column label="备注" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editNote(scope.row.id)"> 编辑备注 </el-button>
            <el-dialog title="编辑您的备注" :visible.sync="dialogNoteVisible" :close-on-click-modal="false">
              已提交备注： {{ showCurrentNote }}
              <el-input
                v-model="note"
                type="textarea"
                :rows="2"
                placeholder="请输入新备注"
              />

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNoteVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNote(selectedID,note)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="updateInfo(scope.row.id,scope.$index)">{{ formateUpload(scope.row.state) }}</el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="工艺变更申请" width="120">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state | statusFilter" @click="showPdf(scope.row.id)"> PDF </el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产安排单备注" prop="remarks" width="120" show-overflow-tooltip />

      </el-table>
      <el-row style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSize"
          :current-page="pageSetting.pageNumber"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-row>

  </el-card>
</template>

<script>
import { loadWSData, updateWSData } from '@/api/wsqrApi'
import { searchJSData, insteadOfJing, searchPdf } from '@/api/jsqrApi'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'
import { combineObject } from '@/utils/combineObject'

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
      note: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      multipleSelection: [],

      JSvalue: '',
      dialogVisible: false,
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      queryInfo: {
        doTime: '',
        clothId: '',
        productionNo: '',
        state: 0,
        stateName: '未确认'
      },
      jsData: '',

      statusOptions: [
        {
          value: null,
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
      passParam: {
        shaZhi: '',
        jingSha: ''
      },
      dialogReplaceJSVisible: false,
      dialogNoteVisible: false,
      jingshaList: '',
      selectedJS: '',
      selectedID: '',
      updateParam: '',
      showCurrentNote: '',
      pdfLink: '',
      totalSize: '',
      chanDiList: '',
      chanDi: '',
      allData: '',
      xingHao: ''

    }
  },

  created() {
    this.initData()
  },

  methods: {
    changeState(val) {
      this.queryInfo.state = val
    },
    // 打开pdf
    showPdf(id) {
      const loading = this.$loading({
        lock: true, // lock的修改符--默认是false
        text: 'Loading', // 显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', // 自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', // 遮罩层颜色
        target: document.querySelector('#table')// loadin覆盖的dom元素节点
      })
      var url = baseUrl + '/searchWeiShaPDF?' + 'id=' + id
      //   window.console.log(url)
      searchPdf(url).then(res => {
        // window.console.log(res)
        loading.close()

        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.pdfLink = baseUrl + res.data.data
          // window.console.log(this.pdfLink)
          window.open(this.pdfLink, '_blank')
        }
      })
    },
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
    // 状态过滤
    formatStatus(val) {
      return val == 0 ? '未确认' : val == 1 ? '已确认' : ''
    },
    // 操作状态
    formateUpload(val) {
      return val == 0 ? '确认提交' : val == 1 ? '提交修改' : ''
    },
    // 数据初始化
    initData() {
      var url = baseUrl + '/LoadWeiShaData?'
      var searchInfo = combineObject(this.queryInfo, this.pageSetting)

      var urlParam = toUrlParam(url, searchInfo)
      this.listLoading = true

      loadWSData(urlParam).then(res => {
        this.listLoading = false
        this.jsData = res.data.data
        this.jsData.map((item, index) => {
          this.$set(this.jsData[index], 'jiaoZhouDate', item.jiaoZhouDate.join(', '))
          this.$set(this.jsData[index], 'huiPiDate', item.huiPiDate.join(', '))
          this.$set(this.jsData[index], 'chanDiZhongJian', '')
          this.$set(this.jsData[index], 'jingShaZhongJian', item.jingSha)
          this.$set(this.jsData[index], 'jingShaDangAnZhongJian', item.jingShaDangAn)
          this.$set(this.jsData[index], 'yarnIdZhongJian', item.yarnId)
          this.$set(this.jsData[index], 'index', index)
        })
        this.totalSize = parseInt(this.jsData[0].pageQuanity)

        this.passParam.jingSha = this.jsData.jingSha
        this.passParam.shaZhi = this.jsData.shaZhi
      })
    },

    // 查询数据
    searchData() {
      this.initData()
    },
    handleCurrentChange(val) {
      this.pageSetting.pageNumber = val
      this.initData()
    },
    // 替代经纱查询
    showReplaceJS(jingsha, shaZhiNo, id, alldata, index) {
      // 加载产地
      var param = baseUrl + '/api/getAllYarnChanDi'
      loadWSData(param).then(res => {
        this.chanDiList = res.data.data
      })
      this.chanDi = ''
      this.JSvalue = ''
      this.allData = this.jsData[index]
      window.console.log(this.allData, 'allldata')
      this.dialogReplaceJSVisible = true
    },
    searchJing(data, val) {
      this.jingshaList = ''
            this.xingHao = ''

      var url = baseUrl + '/loadChangeYuanSha?' + '&chanDi=' + val + '&'
      var data = {
        shaZhi: this.allData.shaZhi,
        jingSha: this.allData.jingSha
      }
      var urlParam = toUrlParam(url, data)
      insteadOfJing(urlParam).then(res => {
        this.jingshaList = Object.assign({}, this.jingshaList, res.data.data)
      })
      this.JSvalue = ''
      window.console.log(this.allData, 'search jing')
    },
    switchJSType(JSvalue, id) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].index === this.allData.index) {
          this.$set(this.jsData[i], 'jingSha', JSvalue)
          this.$set(this.jsData[i], 'jingShaD', JSvalue)
        }
      }
      this.chanDi = ''
      this.JSvalue = ''
      this.dialogReplaceJSVisible = false
    },
    //
    onChange(data) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].index === this.allData.index) {
          this.$set(this.jsData[i], 'jingShaDangAnD', data.gongYingShang)
          this.$set(this.jsData[i], 'jingShaD', data.name)
          this.$set(this.jsData[i], 'xingHao', data.xingHao)
                    this.xingHao = data.xingHao

          this.$set(this.jsData[i], 'yarnIdD', data.yarnId)
          this.$set(this.jsData[i], 'jingSha', data.name)
          window.console.log(this.jsData[i], 'test')
        }
      }
    },
    // 存储备注
    saveNote(id, textarea) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === id) {
          this.$set(this.jsData[i], 'note', textarea)
        }
      }
      this.note = ''
      this.showCurrentNote = ''
      this.dialogNoteVisible = false
    },
    editNote(id) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === id) {
          // window.console.log(id, this.jsData[i].note)
          this.showCurrentNote = this.jsData[i].note
          // this.$set(this.jsData[i], 'note', textarea)
        }
      }
      this.selectedID = id
      this.dialogNoteVisible = true
    },

    // 更新编辑信息(传参格式特殊)
    updateData(param1) {
      updateWSData(param1).then(res => {
        // 点击提交后，后端传回数据
        window.console.log(param1)
        window.console.log('点击提交后，后端传回数据')
        window.console.log(res)
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
        }
        this.jsData = res.data.data
        this.initData()
      })
    },
    // 上传变更后信息
    updateInfo(id, i) {
      // this.updateData(this.jsData[i])
      this.updateParams = JSON.parse(JSON.stringify(this.jsData[i]))
      this.$delete(this.updateParams, 'clothNo')
      this.$delete(this.updateParams, 'dangAnId')
      this.$delete(this.updateParams, 'doTime')
      this.$delete(this.updateParams, 'huiPiDate')
      this.$delete(this.updateParams, 'jiaoZhouDate')
      this.$delete(this.updateParams, 'jiaoZhouLength')
      this.$delete(this.updateParams, 'applyTime')
      this.$delete(this.updateParams, 'shaZhi')
      //   this.$delete(this.updateParams, 'jingSha')
      //   this.$delete(this.updateParams, 'jingShaDangAn')

      this.$set(this.updateParams, 'personId', '10001')
      this.$set(this.updateParams, 'personName', '邓科')
      this.$set(this.updateParams, 'jingSha', this.jsData[i].jingShaZhongJian)
      this.$set(this.updateParams, 'jingShaDangAn', this.jsData[i].jingShaDangAnZhongJian)
      this.$set(this.updateParams, 'yarnId', this.jsData[i].yarnIdZhongJian)
      if (this.updateParams.state == 0) {
        this.$set(this.updateParams, 'id', null)
      }
      window.console.log(this.updateParams)
      this.updateData(this.updateParams)
    },
    postData() {
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map((item, index) => {
          this.$set(this.multipleSelection[index], 'jingSha', this.multipleSelection[index].jingShaZhongJian)
          this.$set(this.multipleSelection[index], 'jingShaDangAn', this.multipleSelection[index].jingShaDangAnZhongJian)
          this.$set(this.multipleSelection[index], 'yarnId', this.multipleSelection[index].yarnIdZhongJian)
        })
        // window.console.log(this.multipleSelection,'target')
        this.updateData(this.multipleSelection)
      }
    }

  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}
</style>
