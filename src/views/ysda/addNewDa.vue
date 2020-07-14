<template>
  <el-card class="newFont">
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称" prop="name" label-width="160px">
            <el-input v-model="queryParam.name" placeholder="填写名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="支数（折算支数）" prop="shaZhi" label-width="160px">
            <el-input v-model="queryParam.shaZhi" placeholder="添加支数" type="number" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="核算价格（万元/吨）" prop="hsjg" label-width="160px">
            <el-input v-model="queryParam.hsjg" placeholder="添加价格" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产地" prop="chanDi" label-width="160px">
            <el-select v-model="queryParam.chanDi" placeholder="请选择">
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
            <el-select v-model="queryParam.yanSe" placeholder="请选择">
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
            <el-select v-model="queryParam.fl" placeholder="请选择">
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

    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="编码" prop="otherName" label-width="160px">
            <el-input v-model="queryParam.otherName" placeholder="添加编码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="存货编码" label-width="160px">
            <el-input v-model="queryParam.chbm" placeholder="添加编码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="吊牌" label-width="160px">
            <el-select v-model="queryParam.dpbz" placeholder="请选择">
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
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="工艺标志" label-width="160px">
            <el-select v-model="queryParam.jspsbz" placeholder="请选择">
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

    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="经纬纱需用量分类" label-width="160px">
            <el-select v-model="queryParam.qlfhdfbz" placeholder="请选择">
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
            <el-input v-model="queryParam.dsqlbz" placeholder="添加单纱强力" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="最低单纱强力（标准）" label-width="160px">
            <el-input v-model="queryParam.zddsqlbz" placeholder="添加最低单纱强力" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="最低CV（标准）" label-width="160px">
            <el-input v-model="queryParam.qlcvbz" placeholder="添加最低CV" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="支偏上限（标准）" label-width="160px">
            <el-input v-model="queryParam.zpsbz" placeholder="添加支偏上限" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="支偏下限（标准）" label-width="160px">
            <el-input v-model="queryParam.zpxbz" placeholder="添加支偏下限" type="number" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">

          <el-form-item label="捻度（标准）" label-width="160px">
            <el-input v-model="queryParam.ndbz" placeholder="添加捻度" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="捻系数（标准）" label-width="160px">
            <el-input v-model="queryParam.nxsbz" placeholder="添加捻系数" type="number" />

          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="断裂伸长率（标准）" label-width="160px">
            <el-input v-model="queryParam.dlsclbz" placeholder="添加断裂伸长率" type="number" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="条干（CV）（标准）" label-width="160px">
            <el-input v-model="queryParam.tgbz" placeholder="添加条干" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="型号" label-width="160px">
            <el-input v-model="queryParam.xingHao" placeholder="添加型号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商" label-width="160px">
            <el-select v-model="queryParam.gysName" placeholder="请选择">
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
      <el-row style="display: flex; justify-content:center">
        <el-checkbox v-model="queryParam.tzsbz" border>特种纱</el-checkbox>
        <el-checkbox v-model="queryParam.gpmbz" border>高配棉</el-checkbox>
        <el-checkbox v-model="queryParam.oabz" border>OA</el-checkbox>
        <el-checkbox v-model="queryParam.oebz" border>OE</el-checkbox>
        <el-checkbox v-model="queryParam.sirobz" border>SIRO</el-checkbox>
        <el-checkbox v-model="queryParam.jsbz" border>精梳</el-checkbox>
        <el-checkbox v-model="queryParam.sgfbz" border>紧密纺</el-checkbox>
        <el-checkbox v-model="queryParam.zjbz" border>竹节纱</el-checkbox>
        <el-checkbox v-model="queryParam.gtlbz" border>弹力纱</el-checkbox>
        <el-checkbox v-model="queryParam.ygbz" border>有色纱</el-checkbox>
        <el-checkbox v-model="queryParam.hxsbz" border>化纤纱</el-checkbox>
        <el-checkbox v-model="queryParam.qtsbz" border>全天丝</el-checkbox>
        <el-checkbox v-model="queryParam.qtbz" border>其他</el-checkbox>
      </el-row>

    </el-form>

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px">
      <el-row>
        <el-col :span="16" class="text">
          <el-form-item label="备注" label-width="160px">
            <el-input v-model="queryParam.note" placeholder="添加备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" @click="saveToServe">确定存入</el-button>
  </el-card>
</template>
<script>
import { getSettingList, saveNewForm } from '@/api/ysda'
import { loadData } from '@/api/gysda'

export default {

  data() {
    return {
      width: '160px',
      data: {
        chengFen: '',
        tybz: ''
      },
      options: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
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

      queryParam: {
        chanDi: '',
        fl: '',
        name: '',
        shaZhi: '',
        xingHao: '',
        chbm: '',
        hsjg: '',
        yanSe: '',
        dpbz: '',
        jspsbz: '',
        qlfhdfbz: '',
        tybz: false,
        gytybz: false,
        dsqlbz: '',
        zddsqlbz: '',
        qlcvbz: '',
        zpsbz: '',
        zpxbz: '',
        ndbz: '',
        nxsbz: '',
        dlsclbz: '',
        tgbz: '',
        note: '',
        tzsbz: false,
        gpmbz: false,
        oabz: false,
        oebz: false,
        sirobz: false,
        jsbz: false,
        sgfbz: false,
        zjbz: false,
        gtlbz: false,
        ygbz: false,
        hxsbz: false,
        qtsbz: false,
        qtbz: false,
        otherName: ''
      },
      value: '否',
      key: '否',

      yanSeList: '',
      diaoPaiList: '',
      chanDiList: '',
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
      loadData().then(res => {
        this.gongYingList = res.data.data
        window.console.log(this.gongYingList)
      })
    },
    bindValue(val) {
      this.$set(this.queryParam, 'tybz', val)
    },
    bindValue1(val) {
      this.$set(this.queryParam, 'gytybz', val)
    },
    saveToServe() {
      if (this.queryParam.chanDi == '' || this.queryParam.fl == '' || this.queryParam.name == '' || this.queryParam.shaZhi == '' || this.queryParam.yanSe == '') {
        this.$message.error('请输入必填项')
      } else {
        window.console.log(this.queryParam)
        saveNewForm(this.queryParam).then(res => {
          if (res.code !== 200) {
            this.$message.error(res.data.data)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
    },
    saveName(val1, val2) {
      this.$set(this.queryParam, 'gysId', val1)
      this.$set(this.queryParam, 'gysName', val2)
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
