<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="setting" class="demo-form-inline">

      <el-form-item label="设置日期" prop="setDate">
        <el-date-picker
          v-model="setting.setDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item label="实际价格" prop="sjjg">
        <el-input v-model="setting.sjjg" type="number" />
      </el-form-item>
      <el-form-item label="实际价格备注">
        <el-input v-model="setting.sjjgbz" />
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="setting.recordMan" disabled />
      </el-form-item>
    </el-form>

    <el-form label-position="left">
      <el-form-item>
        <el-button type="primary" @click="saveToServe">确定存入</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>
<script>
import { editSelectedSetting } from '@/api/ysdjb'

export default {
  props: {
    param: Array
  },

  data() {
    return {
      setting: {
        setDate: '',
        sjjg: '',
        sjjgbz: '',
        recordMan: '邓科'
      },
      rules: {
        setDate: [
          { required: true, message: '请设置日期', trigger: 'blur' }
        ],
        sjjg: [
          { required: true, message: '请填写实际价格', trigger: 'blur' },
          { max: 10, message: '长度在 0 到 10 个数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveValue() {
      window.console.log(this.param)
      window.console.log(this.setting)
      for (var i = 0; i < this.param.length; i++) {
        this.$set(this.param[i], 'setDate', this.setting.setDate)
        this.$set(this.param[i], 'sjjg', this.setting.sjjg)
        this.$set(this.param[i], 'sjjgbz', this.setting.sjjgbz)
        this.$set(this.param[i], 'recordMan', this.setting.recordMan)
      }
    },
    saveToServe() {
      this.saveValue()
      if (this.setting.sjjg == '') {
        this.$message.error('请填写实际价格')
      } else {
      // window.console.log(this.param)
        editSelectedSetting(this.param).then(res => {
          window.console.log(res.data.code)
          if (res.data.code !== 200) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success(res.data.msg)
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
</style>
