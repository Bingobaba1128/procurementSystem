<template>
  <el-card>
    <!--筛选区域 -->
    <el-row :gutter="10">

      <!-- 日期选择 -->
      <el-col :span="5">
        <el-date-picker
          v-model="queryInfo.doTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-col>

      <!-- 布编选择 -->
      <el-col :span="5">
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
      <el-col :span="5">
        <el-select v-model="queryInfo.state" placeholder="确认状态">
          <!-- <template slot="prefix">确认状态</template> -->
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- 按钮筛选 -->
      <el-col :span="3">
        <el-button type="success" @click="searchData">筛选</el-button>
        <!-- <el-button type="success" @click="getReplaceJs(jsData.jingsha,jsData.shaZhi)">筛选</el-button> -->

      </el-col>
    </el-row>

    <!-- 列表区 -->
    <el-row>
      <el-table :data="jsData" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="下单日期" prop="doTime" />
        <el-table-column label="生产单号" prop="productionNo" />
        <el-table-column label="布编" prop="clothId" />
        <el-table-column label="织长" prop="huiPiLength" />
        <el-table-column label="织缩率" prop="zhiBuZhiChengLv">
          <template slot-scope="scope">
            {{ scope.row.zhiBuZhiChengLv }}%
          </template>
        </el-table-column>
        <el-table-column label="纬纱">
          <template slot-scope="scope">
            <el-button type="text" @click="showReplaceJS(scope.row.jingSha,scope.row.shaZhi,scope.row.id)"> {{ scope.row.jingSha }} <i class="el-icon-arrow-down el-icon--right" /> </el-button>
            <el-dialog title="选择替换的纬纱" :visible.sync="dialogReplaceJSVisible">
              <el-form>
                <el-form-item label="纬纱" prop="jingsha">
                  <el-select v-model="JSvalue" filterable placeholder="请选择您所需要的纬纱">
                    <el-option
                      v-for="item in jingshaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      @click.native="onChange(item.gongYingShang)"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogReplaceJSVisible = false">取 消</el-button>
                <el-button type="primary" @click="switchJSType( JSvalue, selectedID)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="需用量" prop="xuYaoLiang" />
        <el-table-column label="生产安排单备注" prop="remarks" />
        <el-table-column label="计划轴期" prop="jiaoZhouDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.jiaoZhouDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="计划坯期" prop="huiPiDate">
          <template slot-scope="scope">
            <p v-for="(item) in scope.row.huiPiDate" :key="item" style="margin:0px">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="参考百米用纬" prop="weiShaBmysl" />
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-button type="text" @click="editNote(scope.row.id)"> 备注 </el-button>
            <el-dialog title="编辑您的备注" :visible.sync="dialogNoteVisible">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="updateInfo(scope.row.id)">{{ formateUpload(scope.row.state) }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="工艺变更申请">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state | statusFilter" @click="showPdf(scope.row.id)"> PDF </el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.state) }}</span>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

  </el-card>
</template>

<script>
import { loadWSData, updateWSData } from '@/api/wsqrApi'
import { searchJSData, insteadOfJing, searchPdf } from '@/api/jsqrApi'
import { baseUrl } from '@/api/apiUrl'
import { toUrlParam } from '@/utils/toUrlParam'

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
      JSvalue: '',
      dialogVisible: false,
      pageSetting: {
        pageNumber: 1,
        pageSize: 10
      },
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        doTime: '',
        clothId: '',
        productionNo: '',
        state: ''
      },
      jsData: '',

      statusOptions: [
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
      pdfLink: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {
    // 打开pdf
    showPdf(id) {
      var url = baseUrl + '/searchPDF?' + 'id=' + id
      //   window.console.log(url)
      searchPdf(url).then(res => {
        // window.console.log(res)
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.pdfLink = baseUrl + res.data.data
          // window.console.log(this.pdfLink)
          window.open(this.pdfLink, '_blank')
        }
      })
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
      var urlParam = toUrlParam(url, this.pageSetting)
      loadWSData(urlParam).then(res => {
        window.console.log(res)
        this.jsData = res.data.data

        this.passParam.jingSha = this.jsData.jingSha
        this.passParam.shaZhi = this.jsData.shaZhi
      })
    },

    // 查询数据
    searchData() {
      var url = baseUrl + '/LoadWeiShaData?'
      var urlParam = toUrlParam(url, this.queryInfo)
      searchJSData(urlParam).then(res => {
        this.jsData = res.data.data
      })
    },

    // 替代经纱查询
    showReplaceJS(jingsha, shaZhiNo, id) {
      // 储存原始数据
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === id) {
          this.$set(this.jsData[i], 'zhongJian', this.jsData[i].jingSha)
          this.$set(this.jsData[i], 'original', this.jsData[i].jingShaDangAn)
        }
      }
      var url = baseUrl + '/loadChangeYuanSha?'
      var data = {
        shaZhi: parseInt(shaZhiNo),
        jingSha: jingsha
      }
      var urlParam = toUrlParam(url, data)
      insteadOfJing(urlParam).then(res => {
        this.jingshaList = Object.assign({}, this.jingshaList, res.data.data)
      })
      this.selectedID = id
      this.dialogReplaceJSVisible = true
    },
    switchJSType(JSvalue, id) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === id) {
          this.$set(this.jsData[i], 'jingSha', JSvalue)
          this.$set(this.jsData[i], 'jingShaD', JSvalue)
        }
      }
      this.dialogReplaceJSVisible = false
    },
    //
    onChange(val) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === this.selectedID) {
          this.$set(this.jsData[i], 'jingShaDangAnD', val)
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
    updateInfo(id) {
      for (var i = 0; i < this.jsData.length; i++) {
        if (this.jsData[i].id === id) {
          // this.updateData(this.jsData[i])
          this.updateParams = Object.assign({}, this.updateParams, this.jsData[i])
          this.$delete(this.updateParams, 'clothNo')
          this.$delete(this.updateParams, 'dangAnId')
          this.$delete(this.updateParams, 'doTime')
          this.$delete(this.updateParams, 'huiPiDate')
          this.$delete(this.updateParams, 'jiaoZhouDate')
          this.$delete(this.updateParams, 'jiaoZhouLength')
          this.$delete(this.updateParams, 'xuYaoLiang')
          this.$delete(this.updateParams, 'applyTime')
          this.$delete(this.updateParams, 'shaZhi')
          //   this.$delete(this.updateParams, 'jingSha')
          //   this.$delete(this.updateParams, 'jingShaDangAn')

          this.$set(this.updateParams, 'personId', '10001')
          this.$set(this.updateParams, 'personName', '邓科')
          if (this.updateParams.state == 0) {
            this.$set(this.updateParams, 'id', null)
          }
          window.console.log(this.updateParams)
          this.updateData(this.updateParams)
        }
      }
    }

  }
}
</script>

<style scrope>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}
</style>
