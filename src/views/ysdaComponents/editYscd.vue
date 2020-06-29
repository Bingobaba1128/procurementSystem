<template>
  <el-card>
    <el-form :inline="true" :model="data" class="demo-form-inline">

      <el-form-item label="产地">
        <el-input v-model="data.chanDi" placeholder="添加产地" />
      </el-form-item>

      <el-form-item label="预计到货天数">
        <el-input v-model="data.yjdhts" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="耗纱系数">
        <el-input v-model="data.hsxs" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="停用">
        <el-select v-model="value" placeholder="请选择">
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
      </el-form-item>
    </el-form>

  </el-card>
</template>
<script>
import { saveEditChanDi } from '@/api/ysdaComponents'

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
    saveToServe() {
      window.console.log(this.data)
      this.$set(this.data, 'tybz', this.value)
      saveEditChanDi(this.data).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.data.tipInfo)
        } else {
          this.$message.success(res.data.tipInfo)
          this.$emit('closeDialog')
        }
      })
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
