<template>
    <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择学科"
  >
    <el-option
      v-for="item in subjectList"
      :key="item.value"
      :label="item.title"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import {getSelectOption} from '@/api/common'

export default {
    name:'subject-sel',
    props:['value'],
    data(){
        return {
            subjectList:[]
        }
    },
    mounted() {
        getSelectOption(res=>this.subjectList = res.subject || [] );
    },
}
</script>
<style lang="less">
    
</style>