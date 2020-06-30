<template>
  <el-card>
    <el-form :inline="true" :model="data" class="demo-form-inline">

      <el-form-item label="原纱颜色">
        <el-input v-model="data.yanSe" placeholder="添加颜色" />
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
import { saveEditYanSe } from '@/api/ysys'

export default {
  props: {
    param: Object
  },
  data() {
    return {
      data: this.param,
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

      value: this.param.tybz == true ? '是' : '否'

    }
  },
  methods: {
    saveValue(val) {
      this.$set(this.data, 'tybz', val)
    },
    saveToServe() {
      if (this.data.yanSe == '') {
        this.$message.error('请添加产颜色名称')
      } else {
        saveEditYanSe(this.data).then(res => {
          if (res.status !== 200) {
            this.$message.error(res.data.tipInfo)
          } else {
            this.$message.success(res.data.tipInfo)
            this.$emit('closeDialog')
          }
        })
      }

      // window.console.log(this.data)
    }

  }
}
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
