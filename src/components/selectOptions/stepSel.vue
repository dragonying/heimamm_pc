<template>
    <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择阶段"
  >
    <el-option
      v-for="item in stepList"
      :key="item.value"
      :label="item.title"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import {getSelectOption} from '@/api/common'

export default {
    name:'step-sel',
    props:['value'],
    data(){
        return {
            stepList:[]
        }
    },
    mounted() {
        getSelectOption(res=>this.stepList = res.step || [] );
    },
}
</script>
<style lang="less">
    
</style>