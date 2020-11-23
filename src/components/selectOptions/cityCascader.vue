<template>
  <el-cascader
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
  ></el-cascader>
</template>

<script>
// 级联选择器的数据
import { regionData } from 'element-china-area-data'
export default {
  name: 'cityCascader',
  props: ['value'],
  data () {
    return {
      // 级联选择器的数据
      options: regionData
    }
  }
}
</script>

<style></style>
