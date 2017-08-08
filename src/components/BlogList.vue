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

        page:1,  
        pagesize:10,       // 每页显示的数目
        pageTotalNum:10,   // 总的页数目
        tableData: [
          {
            name: 'John Smith John Smith John Smith',
            category: 'Java',
            tag: 'Java'
          },
          {
            name: 'John Smith John Smith John Smith',
            category: 'Java',
            tag: 'Java'
          }
        ]

    }

  },
  methods: {

    unselect () {
      this.$refs.table.unSelectAll()
    },

    getArticles() {

      alert("fffff");

      var _this = this;
      _this.$http.get('/api/article/getall'
      ,{
        params:{
          page:_this.page,
        }, 
      }
      )
      .then(function (response) {
          alert("xxxx");
      })

      alert("yyyy");
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