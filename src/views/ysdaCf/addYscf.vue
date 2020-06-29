<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="data" class="demo-form-inline">

      <el-form-item label="原纱成分" prop="chengFen">
        <el-input v-model="data.chengFen" placeholder="添加成分" />
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
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="saveToServe">确定存入</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>
<script>
import { addNewChengFen } from '@/api/yscf'

export default {

  data() {
    return {
      data: {
        chengFen: '',
        tybz: 'false'
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
        chengFen: [
          { required: true, message: '请填写成分名称', trigger: 'blur' }
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
      if (this.data.chengFen == '') {
        this.$message.error('请添加成分名称')
      } else {
        addNewChengFen(this.data).then(res => {
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
