<template>
<div class="bloglist" >
  
  <mu-table multiSelectable enableSelectAll ref="table" :showCheckbox="true">
    
    <mu-thead>
      <mu-tr>
        <mu-th>ID</mu-th>
        <mu-th>标题</mu-th>
        <mu-th>分类</mu-th>
        <mu-th>标签</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr>
        <mu-td>1</mu-td>
        <mu-td>John SmithJohnJohn SmithJohnJohn SmithJohnJohn SmithJohn </mu-td>
        <mu-td>Employed</mu-td>
        <mu-td>John Smith</mu-td>
        <mu-td><a >修改</a></mu-td>
      </mu-tr>
    </mu-tbody>

  </mu-table>

</div>
</template>


<script>
export default {
  methods: {
    unselect () {
      this.$refs.table.unSelectAll()
    }
  }
}
</script>


<style>

.layout .content-right .bloglist .mu-table{
  table-layout: auto;
}

</style>