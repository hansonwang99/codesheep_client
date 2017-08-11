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
        <mu-td>
            <mu-float-button icon="edit" mini  @click="openWork" data-toggle="modal" data-target="#postModal" />
            <mu-float-button icon="delete" mini @click="openDelDialog" />
        </mu-td>
      </mu-tr>
    </mu-tbody>

  </mu-table>

  <div v-show="isShow" class="blogPagination">
    <mu-pagination :total="total" :current="current" @pageChange="handleClick">
    </mu-pagination>
  </div>
  
  
  <div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-editor">
            <div class="modal-content" id="savaArticlePage">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">写文章</h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="postTitle">标题</label>
                                <input type="text" class="form-control" id="postTitle" v-model="title"/>
                                <input type="hidden" name="" id="postId"/>
                                <input type="hidden" name="" id="postContent"/>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="postCategory">分类</label>
                                <select id="postCategory" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="postTag">标签</label>
                                <input type="text" class="form-control" id="postTag" v-model="tag"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <iframe id="postContentIframe" src="" name="postContentIframe" frameborder="0" width="100%" height="620" scrolling="no"></iframe>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button v-on:click="savaarticle" type="button" class="btn btn-primary" id="savePost">保存</button>
                </div>

            </div>
        </div>
  </div>

  <mu-dialog class="delDialog" :open="deleteDialog" title="CodeSheep温馨提示！" @close="closeDelDialog">
    确定要删除该篇文章吗？
    <mu-flat-button slot="actions" @click="closeDelDialog" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="closeDelDialog" label="确定"/>
  </mu-dialog>
  

</div>
</template>


<script>
export default {

  data() {
    return {

        current:1,          // 当前页数
        pageSize:10,        // 每页显示的数目
        total:10,           // 总的页数目
        totalItemNum:10,     // 总的博客条目
        tableData: [],
        isShow: false,       // 默认分页组件不显示，仅当总的博客条目数大于等于10的时候才显示

        deleteDialog: false
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
          _this.total = parseInt(response.data[0].pageTotalNum);
          _this.pageSize = parseInt(response.data[0].pageSize);
          _this.current = parseInt(response.data[0].page);

          if (_this.totalItemNum>=10) {
            _this.isShow = true;
          }
      })

    },

    handleClick (newIndex) {
    },

    openWork () { 
      document.getElementById('postContentIframe').src="../../static/write.html";
    },

    openDelDialog () {
      this.deleteDialog = true;
    },

    closeDelDialog () {
      this.deleteDialog = false;
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

.blogPagination {
  padding-top: 20px;
}

.mu-dialog {
  width: 25%;
}

.mu-float-button-mini {
    width: 30px;
    height: 30px;
}

.mu-icon {
  font-size: 18px;
}

</style>