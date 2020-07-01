<template>
  <el-card>
    <el-form :inline="true" :rules="rules" :model="queryParam" class="demo-form-inline">

      <el-form-item label="产地">
        <el-select v-model="queryParam.chanDi" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="分类">
        <el-select v-model="queryParam.lx" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="queryParam.name" placeholder="添加成分" />
      </el-form-item>

      <el-form-item label="支数（折算支数）">
        <el-input v-model="queryParam.shaZhi" placeholder="添加成分" />
      </el-form-item>

      <el-form-item label="型号">
        <el-input v-model="queryParam.xingHao" placeholder="添加成分" />
      </el-form-item>

      <el-form-item label="存货编码">
        <el-input v-model="queryParam.chbm" placeholder="添加成分" />
      </el-form-item>

      <el-form-item label="核算价格（万元/吨）">
        <el-input v-model="queryParam.hsjg" placeholder="添加成分" />
      </el-form-item>

      <el-form-item label="颜色">
        <el-select v-model="queryParam.yanSe" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="吊牌">
        <el-select v-model="queryParam.dpbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="工艺标志">
        <el-select v-model="queryParam.jspsbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="经纬纱需用量分类">
        <el-select v-model="queryParam.qlfhdfbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="停用">
        <el-select v-model="queryParam.tybz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="工艺停用">
        <el-select v-model="queryParam.gytybz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单纱强力（标准）">
        <el-select v-model="queryParam.dsqlbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="最低单纱强力（标准）">
        <el-select v-model="queryParam.zddsqlbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="最低CV（标准）">
        <el-select v-model="queryParam.qlcvbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="支偏上限（标准）">
        <el-select v-model="queryParam.zpsbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="支偏下限（标准）">
        <el-select v-model="queryParam.zpxbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="捻度（标准）">
        <el-select v-model="queryParam.ndbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="捻系数（标准）">
        <el-select v-model="queryParam.nxsbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="断裂伸长率（标准）">
        <el-select v-model="queryParam.dlsclbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="条干（CV）（标准）">
        <el-select v-model="queryParam.tgbz" placeholder="请选择" @change="saveValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="queryParam.note" placeholder="添加备注" />
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
      queryParam: {
        chanDi: '',
        lx: '',
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
        gytybz: '',
        dsqlbz: '',
        zddsqlbz: '',
        qlcvbz: '',
        zpsbz: '',
        zpxbz: '',
        ndbz: '',
        nxsbz: '',
        dlsclbz: '',
        tgbz: '',
        note: ''

      },
      value: '否',
      rules: {
        // chengFen: [
        //   { required: true, message: '请填写成分名称', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // saveValue(val) {
    //   this.$set(this.data, 'tybz', val)
    // },
    initData() {

    },
    saveToServe() {
      window.console.log(this.queryParam)
    //   if (this.data.chengFen == '') {
    //     this.$message.error('请添加成分名称')
    //   } else {
    //     addNewChengFen(this.data).then(res => {
    //       if (res.status !== 200) {
    //         this.$message.error(res.data.tipInfo)
    //       } else {
    //         this.$message.success(res.data.tipInfo)
    //         this.$emit('closeDialog')
    //       }
    //     })
    //   }
    }
  }
}
</script>

<style scoped>
.el-textarea__inner {
  min-height:120px !important
}
</style>
