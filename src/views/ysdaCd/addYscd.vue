<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="data" class="demo-form-inline">

      <el-form-item label="原纱产地" prop="chanDi">
        <el-input v-model="data.chanDi" placeholder="添加产地" />
      </el-form-item>

      <el-form-item label="预计到货天数">
        <el-input v-model="data.yjdhts" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="耗纱系数">
        <el-input v-model="data.hsxs" placeholder="" type="number" />
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
import { addNewChanDi } from '@/api/ysdaComponents'

export default {

  data() {
    return {
      data: {
        chanDi: '',
        yjdhts: '',
        hsxs: '',
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
        chanDi: [
          { required: true, message: '请填写产地名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    saveValue(val) {
      this.$set(this.data, 'tybz', val)
    },
    saveToServe() {
      if (this.data.chanDi == '') {
        this.$message.error('请添加产地名称')
      } else {
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
}
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
