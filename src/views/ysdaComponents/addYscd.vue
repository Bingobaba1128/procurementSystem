<template>
  <el-card>
    <el-form :inline="true" :model="data" class="demo-form-inline">

      <el-form-item label="产地">
        <el-input v-model="data.chanDi" placeholder="选择产地" />
      </el-form-item>

      <el-form-item label="预计到货天数">
        <el-input v-model="data.yjdhts" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="耗纱系数">
        <el-input v-model="data.hsxs" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="停用">
        <el-select v-model="data.tybz" placeholder="">
          <el-option label="是" value="true" />
          <el-option label="否" value="false" />
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
import { addNewChanDi } from '@/api/ysdaComponents'

export default {

  data() {
    return {
      data: {
        chanDi: '',
        yjdhts: '',
        hsxs: '',
        tybz: '',
        bz: ''
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {

    saveToServe() {
      addNewChanDi(this.data).then(res => {
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
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
