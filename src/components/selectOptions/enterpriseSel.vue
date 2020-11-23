<template>
    <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择企业"
  >
    <el-option
      v-for="item in enterpriseList"
      :key="item.value"
      :label="item.title"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import {getSelectOption} from '@/api/common'

export default {
    name:'enterprise-sel',
    props:['value'],
    data(){
        return {
            enterpriseList:[]
        }
    },
    mounted() {
        getSelectOption(res=>this.enterpriseList = res.enterprise || [] );
    },
}
</script>
<style lang="less">
    
</style>