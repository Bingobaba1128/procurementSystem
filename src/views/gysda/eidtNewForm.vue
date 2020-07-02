<template>
  <el-card class="newFont">
    <el-form :inline="true" :rules="rules" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商名称" prop="name" label-width="160px">
            <el-input v-model="param.name" placeholder="填写供应商名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="代码" prop="code" label-width="160px">
            <el-input v-model="param.code" placeholder="添加代码" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="简称" prop="shortName" label-width="160px">
            <el-input v-model="param.shortName" placeholder="添加成分" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="负责人" prop="contactName" label-width="160px">
            <el-input v-model="param.contactName" placeholder="填写负责人" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="联系电话" prop="contactPhone" label-width="160px">
            <el-input v-model="param.contactPhone" placeholder="添加电话" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址" prop="address" label-width="160px">
            <el-input v-model="param.address" placeholder="填写地址" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankName" label-width="160px">
            <el-input v-model="param.bankName" placeholder="填写开户行" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccount" label-width="160px">
            <el-input v-model="param.bankAccount" placeholder="填写银行账号" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="汇入地点" prop="huiRuDiDian" label-width="160px">
            <el-input v-model="param.huiRuDiDian" placeholder="添加汇入地点" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="18" class="resize">
          <el-form-item label="备注" prop="note" label-width="160px">
            <el-input v-model="param.note" placeholder="添加备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="记录人" prop="addUsername" label-width="160px">
            <el-input v-model="param.addUsername" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="记录时间" prop="addTime" label-width="160px">
            <el-input v-model="param.addTime" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="停用" prop="enable" label-width="160px">
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
    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-row>

        <el-col :span="8" offset="4">
          <el-button type="primary" @click="saveToServe">确定存入</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { saveNewForm } from '@/api/gysda'

export default {
  props: {
    param: Object
  },
  data() {
    return {
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

      // queryParam: {
      //   name: '',
      //   shortName: '',
      //   code: '',
      //   yanSe: '',
      //   contactName: '',
      //   contactPhone: '',
      //   bankName: '',
      //   bankAccount: '',
      //   huiRuDiDian: '',
      //   address: '',
      //   note: '',
      //   addUserId: '',
      //   addUsername: '',
      //   enable: false,
      //   fax: '',
      //   taxNo: '',
      //   addTime: '2020-07-02'
      // },
      value: this.param.enable == true ? '是' : '否',
      rules: {

        code: [
          { required: true, message: '请填写代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ]

      }
    }
  },

  methods: {

    bindValue(val) {
      this.$set(this.param, 'enable', val)
    },

    saveToServe() {
      // window.console.log(this.param)
      this.$set(this.param, 'supplierType', null)
      if (this.param.code == '' || this.param.name == '') {
        this.$message.error('请输入必填项')
      } else {
        saveNewForm(this.param).then(res => {
          if (res.status !== 200) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }
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
.resize >>> .el-form-item{
    width: 100%;
}
.resize >>> .el-form-item__content{
    width: 75%;
    height: 100px;
}
.resize >>> .el-input{
    height: 100%;
}
.resize >>> .el-input__inner{
    height: 100%;
}
</style>
