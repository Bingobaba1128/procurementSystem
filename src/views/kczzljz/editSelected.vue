<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="setting" class="demo-form-inline">

      <el-form-item label="购纱周转量（T）" prop="gouShaL">
        <el-input v-model="setting.gouShaL" type="number" />
      </el-form-item>

      <el-form-item label="库存周转量（T）" prop="kuCunL">
        <el-input v-model="setting.kuCunL" type="number" />
      </el-form-item>
      <el-form-item label="最低周转量（T）">
        <el-input v-model="setting.zuiDiL" />
      </el-form-item>
      <el-form-item label="仓库">
        <el-input v-model="setting.cangKu" disabled />
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
import { editSelectedSetting } from '@/api/kczzljz'

export default {
  props: {
    param: Array
  },

  data() {
    return {
      setting: {
        gouShaL: '',
        kuCunL: '',
        zuiDiL: '',
        cangKu: '越南原纱仓'
      }
      // rules: {
      //   setDate: [
      //     { required: true, message: '请设置日期', trigger: 'blur' }
      //   ],
      //   sjjg: [
      //     { required: true, message: '请填写实际价格', trigger: 'blur' },
      //     { max: 10, message: '长度在 0 到 10 个数字', trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {
    saveValue() {
      for (var i = 0; i < this.param.length; i++) {
        this.$set(this.param[i], 'gouShaL', this.setting.gouShaL)
        this.$set(this.param[i], 'kuCunL', this.setting.kuCunL)
        this.$set(this.param[i], 'zuiDiL', this.setting.zuiDiL)
        this.$set(this.param[i], 'cangKu', this.setting.cangKu)
      }
    },
    saveToServe() {
      this.saveValue()
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
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
