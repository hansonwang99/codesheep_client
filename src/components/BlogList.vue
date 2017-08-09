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
      <mu-tr v-for="item,index in tableData"  :key="index" >
        <mu-td>{{index + 1}}</mu-td>
        <mu-td>{{item.name}}</mu-td>
        <mu-td>{{item.category}}</mu-td>
        <mu-td>{{item.tag}}</mu-td>
        <mu-td><a >修改</a></mu-td>
      </mu-tr>
    </mu-tbody>

  </mu-table>

</div>
</template>


<script>
export default {
  data() {
    return {

        page:1,            // 当前页数
        pageSize:10,       // 每页显示的数目
        pageTotalNum:10,   // 总的页数目
        tableData: []
    }

  },
  methods: {

    unselect () {
      this.$refs.table.unSelectAll()
    },

    getArticles() {

      var _this = this;
      _this.$http.get('http://localhost:3000/getallarticle'
      ,{
        params:{
          
        }, 
      }
      )
      .then(function (response) {
          // console.log(response.data[0].articles)  // console.log用于调试效果挺好
          _this.tableData=response.data[0].articles;
          _this.pageTotalNum = parseInt(response.data[0].pageTotalNum);
          _this.pageSize = parseInt(response.data[0].pageSize);
          _this.page = parseInt(response.data[0].page);
      })

    }





  },
  mounted() {

      this.getArticles();

  }

}
</script>


<style>

.layout .content-right .bloglist .mu-table{
  table-layout: auto;
}

</style>