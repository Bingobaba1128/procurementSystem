<template>
  <el-card class="newFont">
    <!-- {{param.id}} -->
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称" prop="name" label-width="160px">
            <el-input v-model="param.name" placeholder="填写名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="支数（折算支数）" prop="shaZhi" label-width="160px">
            <el-input v-model="param.shaZhi" placeholder="添加支数" type="number" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="核算价格（万元/吨）" prop="hsjg" label-width="160px">
            <el-input v-model="param.hsjg" placeholder="添加成分" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产地" prop="chanDi" label-width="160px">
            <el-select v-model="param.chanDi" placeholder="请选择">
              <el-option
                v-for="item in chanDiList"
                :key="item.chanDi"
                :label="item.chanDi"
                :value="item.chanDi"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="颜色" prop="yanSe" label-width="160px">
            <el-select v-model="param.yanSe" placeholder="请选择">
              <el-option
                v-for="item in yanSeList"
                :key="item.yanSe"
                :label="item.yanSe"
                :value="item.yanSe"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="分类" prop="fl" label-width="160px">
            <el-select v-model="param.fl" placeholder="请选择">
              <el-option
                v-for="item in fenLeiList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>

      </el-row>
    </el-form> -->

    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="编码"  prop="otherName" label-width="160px">
            <el-input v-model="param.otherName" placeholder="添加编码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="存货编码" label-width="160px">
            <el-input v-model="param.chbm" placeholder="添加编码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="吊牌" label-width="160px">
            <el-select v-model="param.dpbz" placeholder="请选择">
              <el-option
                v-for="item in diaoPaiList"
                :key="item.diaoPai"
                :label="item.diaoPai"
                :value="item.diaoPai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="工艺标志" label-width="160px">
            <el-select v-model="param.jspsbz" placeholder="请选择">
              <el-option
                v-for="item in bzOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">

          <el-form-item label="工艺停用" label-width="160px">
            <el-select v-model="key" placeholder="请选择" @change="bindValue1(key)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="停用" label-width="160px">
            <el-select v-model="value" placeholder="请选择" @change="bindValue(value)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="经纬纱需用量分类" label-width="160px">
            <el-select v-model="param.qlfhdfbz" placeholder="请选择">
              <el-option
                v-for="item in xuYongLiangOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="单纱强力（标准）" label-width="160px">
            <el-input v-model="param.dsqlbz" placeholder="添加单纱强力" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="最低单纱强力（标准）" label-width="160px">
            <el-input v-model="param.zddsqlbz" placeholder="添加最低单纱强力" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="最低CV（标准）" label-width="160px">
            <el-input v-model="param.qlcvbz" placeholder="添加最低CV" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="支偏上限（标准）" label-width="160px">
            <el-input v-model="param.zpsbz" placeholder="添加支偏上限" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="支偏下限（标准）" label-width="160px">
            <el-input v-model="param.zpxbz" placeholder="添加支偏下限" type="number" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="捻度（标准）" label-width="160px">
            <el-input v-model="param.ndbz" placeholder="添加捻度" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="捻系数（标准）" label-width="160px">
            <el-input v-model="param.nxsbz" placeholder="添加捻系数" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="断裂伸长率（标准）" label-width="160px">
            <el-input v-model="param.dlsclbz" placeholder="添加断裂伸长率" type="number" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
            <el-row>
                <el-col :span="8">

          <el-form-item label="型号" label-width="160px">
            <el-input v-model="param.xingHao" placeholder="添加型号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="条干（CV）（标准）" label-width="160px">
            <el-input v-model="param.tgbz" placeholder="添加条干" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商" label-width="160px">
            <el-select v-model="param.gysName" placeholder="请选择">
              <el-option
                v-for="item in gongYingList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="saveName(item.id,item.name)"
              />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="param.tzsbz" border>特种纱</el-checkbox>
          <el-checkbox v-model="param.gpmbz" border>高配棉</el-checkbox>
          <el-checkbox v-model="param.oabz" border>OA</el-checkbox>
          <el-checkbox v-model="param.oebz" border>OE</el-checkbox>
          <el-checkbox v-model="param.sirobz" border>SIRO</el-checkbox>
          <el-checkbox v-model="param.jsbz" border>精梳</el-checkbox>
          <el-checkbox v-model="param.sgfbz" border>紧密纺</el-checkbox>
          <el-checkbox v-model="param.zjbz" border>竹节纱</el-checkbox>
          <el-checkbox v-model="param.gtlbz" border>弹力纱</el-checkbox>
          <el-checkbox v-model="param.ygbz" border>有色纱</el-checkbox>
          <el-checkbox v-model="param.hxsbz" border>化纤纱</el-checkbox>
          <el-checkbox v-model="param.qtsbz" border>全天丝</el-checkbox>
          <el-checkbox v-model="param.qtbz" border>其他</el-checkbox>
        </el-col>
      </el-row>

    </el-form>

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px">
      <el-row>
        <el-col :span="18" class="text">
          <el-form-item label="备注" label-width="160px">
            <el-input v-model="param.note" placeholder="添加备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" @click="saveToServe">确定存入</el-button>

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成分" label-width="160px">
            <el-select v-model="param.chengFen" placeholder="请选择">
              <el-option
                v-for="item in chengFenList"
                v-show="item.isSelected"
                :key="item.chengFen"
                :label="item.chengFen"
                :value="item.chengFen"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addRow">增加行</el-button>

        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="saveChengFen">成分存入</el-button>

        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-table :data="innerForm" height="500" border stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column label="成分" prop="chengFen" />

        <el-table-column label="含量" prop="hanLiang">
          <template slot-scope="scope">
            <el-input v-model="scope.row.hanLiang" placeholder="添加含量数据" type="number" />
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="editDataM(scope.row.id)">修改</el-button> -->
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-card>
</template>
<script>
import { getSettingList, saveNewForm, addNewChengFen, getChengFen } from '@/api/ysda'
import { loadData } from '@/api/gysda'

export default {
  props: {
    param: Object
  },
  data() {
    return {
      width: '160px',
      data: {
        chengFen: '',
        tybz: ''
      },
      options: [
        {
          value: 'true',
          label: '是'
        },
        {
          value: 'false',
          label: '否'
        }
      ],
      fenLeiList: [
        {
          value: 'T类'
        },
        {
          value: '开发类'
        },
        {
          value: '主力类'
        },
        {
          value: '常备类'
        },
        {
          value: '淘汰类'
        }
      ],
      innerForm: [],
      xuYongLiangOptions: [
        {
          value: '全棉不弹力'
        },
        {
          value: '全棉弹力'
        },
        {
          value: '化纤不弹力'
        },
        {
          value: '化纤弹力'
        },
        {
          value: '棉化纤不弹力'
        },
        {
          value: '棉化纤弹力'
        }
      ],
      bzOptions: [
        {
          value: '精梳'
        },
        {
          value: '普梳'
        },
        {
          value: '半精梳'
        }
      ],

      value: this.param.tybz == true ? '是' : '否',
      key: this.param.gytybz == true ? '是' : '否',
      yanSeList: '',
      diaoPaiList: '',
      chanDiList: '',
      chengFenList: '',
      chengFenTable: '',
      gongYingList: '',

      rules: {
        chanDi: [
          { required: true, message: '请选择产地', trigger: 'blur' }
        ],
        fl: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        shaZhi: [
          { required: true, message: '请输入纱织', trigger: 'blur' }
        ],
        yanSe: [
          { required: true, message: '请输入颜色', trigger: 'blur' }
        ],
        hsjg: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
                        otherName: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getInitSetting()
  },
  methods: {
    // saveValue(val) {
    //   this.$set(this.data, 'tybz', val)
    // },
    getInitSetting() {
      getSettingList('getAllYarnYanSeName').then(res => {
        this.yanSeList = res.data.data
      })
      getSettingList('getAllYarnDiaoPaiName').then(res => {
        this.diaoPaiList = res.data.data
      })
      getSettingList('getAllYarnChanDiName').then(res => {
        this.chanDiList = res.data.data
      })
      this.initChengFen()
      getSettingList('getAllYarnChengFenName').then(res => {
        this.chengFenList = res.data.data
        for (let i = 0; i < this.chengFenList.length; i++) {
          this.$set(this.chengFenList[i], 'isSelected', true)
        }
        window.console.log(this.chengFenList)
      })
      loadData().then(res => {
        this.gongYingList = res.data.data
      })
      // alert(this.param)
      //
      // key: this.param.gytybz == true ? '是' : '否',
    },
    bindValue(val) {
      this.$set(this.param, 'tybz', val)
    },
    bindValue1(val) {
      this.$set(this.param, 'gytybz', val)
    },
    saveToServe() {
      if (this.param.chanDi == '' || this.param.fl == '' || this.param.name == '' || this.param.shaZhi == '' || this.param.yanSe == '') {
        this.$message.error('请输入必填项')
      } else {
        window.console.log(this.param)
        this.$set(this.param, 'chengFen', null)
        saveNewForm(this.param).then(res => {
          if (res.status !== 200) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
    addRow() {
      // 预验证供应商品种不为空
      window.console.log(this.chengFenList)
      window.console.log(this.innerForm)
      if (this.param.chengFen == '' || this.param.chengFen == null) {
        this.$message.error('请选择成分')
      } else {
        var insertItem = {
          chengFen: this.param.chengFen,
          hanLiang: '',
          yarnId: this.param.id,
          addUserId: '',
          addUsername: '',
          addDatetime: ''
        }
        this.innerForm.push(insertItem)
        this.checkAndRemove()
        this.param.chengFen = ''
      }
    },
    initChengFen() {
      getChengFen(this.param.id).then(res => {
        // window.console.log(res.data)
        if (res.data.data != null) {
          this.innerForm = res.data.data
          this.checkAndRemove()
        }
      })
    },
    checkAndRemove() {
      for (let i = 0; i < this.innerForm.length; i++) {
        for (let j = 0; j < this.chengFenList.length; j++) {
          if (this.chengFenList[j].chengFen == this.innerForm[i].chengFen) {
            this.$set(this.chengFenList[j], 'isSelected', false)
          }
        }
      }
    },

    handleDelete(index, row) {
      this.innerForm.splice(index, 1)
      window.console.log(this.innerForm)
      window.console.log(this.chengFenList)
      for (let i = 0; i < this.innerForm.length; i++) {
        for (let j = 0; j < this.chengFenList.length; j++) {
          if (this.chengFenList[j].chengFen == this.innerForm[i].chengFen) {
            this.$set(this.chengFenList[j], 'isSelected', true)
          }
        }
      }
    },
    saveChengFen() {
      addNewChengFen(this.innerForm).then(res => {
        if (res.data.code !== 200) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.initChengFen()
        }
      })
    },
    saveName(val1, val2) {
      this.$set(this.param, 'gysId', val1)
      this.$set(this.param, 'gysName', val2)
    }
  }
}
</script>

<style scoped>

.el-textarea__inner {
  min-height:120px !important
}

.newFont  >>> .el-input__inner{
    font-size: 10px !important;
}
.newFont >>> .el-input__inner{
    font-size: 10px !important;
}

.text >>> .el-form-item{
    width: 85%;
}
.text >>> .el-form-item__content{
    width: 70%;
}

</style>
