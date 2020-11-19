<template>
<div class='table-container'>
  <span class='title'>用户日数据统计</span>
    <el-table
      :data="tableData"
      height="300"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total"
        label="新增(人)"
        width="180">
      </el-table-column>
      <el-table-column
        prop="girl"
        label="女性 (人)">
      </el-table-column>
      <el-table-column
        prop="boy"
        label="男性 (人)">
      </el-table-column>
      <el-table-column
        prop="normal"
        label="启用 (人)">
      </el-table-column>
      <el-table-column
        prop="forbidden"
        label="禁用 (人)">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    name:'chart-date-table',
    props:['tableData'],
}
</script>
<style lang="less">
    .table-container{
      width:100%;
      .title{
         font-size:24px;
         color:#666666;
      }
      
    }
</style>