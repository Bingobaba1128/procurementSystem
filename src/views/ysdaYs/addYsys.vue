<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="data" class="demo-form-inline">

      <el-form-item label="原纱颜色" prop="yanSe">
        <el-input v-model="data.yanSe" placeholder="添加颜色名称" />
      </el-form-item>

      <el-form-item label="停用">
        <el-select v-model="value" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="data" label-position="left">
      <el-form-item label="备注" width="200px">
        <el-input v-model="data.bz" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveToServe">确定存入</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>
<script>
import { addNewYanSe } from '@/api/ysys'

export default {

  data() {
    return {
      data: {
        yanSe: '',
        tybz: 'false',
        bz: ''
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
      value: '否',
      rules: {
        yanSe: [
          { required: true, message: '请填写颜色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveValue(val) {
      this.$set(this.data, 'tybz', val)
    },
    saveToServe() {
      if (this.data.yanSe == '') {
        this.$message.error('请添加颜色名称')
      } else {
        addNewYanSe(this.data).then(res => {
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
</style>
