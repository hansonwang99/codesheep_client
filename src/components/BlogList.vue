<template>
<div class="bloglist" >
  
  <mu-table class="blogtable" multiSelectable enableSelectAll ref="table" :showCheckbox="true">
    
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
      <mu-tr v-for="item,index in tableData" :key="index">
        <mu-td>{{index + 10*(current-1)+1}}</mu-td>
        <mu-td v-bind:id="tableData[index].id+'_title'">{{item.title}}</mu-td>
        <mu-td v-bind:id="tableData[index].id+'_category'">{{item.categoryName}}</mu-td>
        <mu-td v-bind:id="tableData[index].id+'_tag'">{{item.tag}}</mu-td>
        <mu-td @click="clickOperationTd(index)">
            <mu-float-button icon="edit" mini  @click="openWork" data-toggle="modal" data-target="#postModal" />
            <mu-float-button icon="delete" mini @click="openDelDialog(index)" />
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
                                <select v-model="selected" id="postCategory" class="form-control">
                                  <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                  </option>
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
                    <button v-on:click="saveModifyArticle" type="button" class="btn btn-primary" id="savePost">保存</button>
                </div>

            </div>
        </div>
  </div>

  <mu-dialog class="delDialog" :open="deleteDialog" title="CodeSheep温馨提示！" @close="closeDelDialog">
    确定要删除该篇文章吗？
    <mu-flat-button slot="actions" @click="closeDelDialog" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="confirmDelete" label="确定"/>
  </mu-dialog>
  
  <input type="hidden" name="" id="indexTag"/>

  <mu-popup position="top" :overlay="true" popupClass="demo-popup-top" :open="topPopupModify">
    修改成功
  </mu-popup>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupDel">
    删除成功
  </mu-popup>

</div>
</template>


<script>

import Qs from 'qs'

export default {

  data() {
    return {

        current:1,          // 当前页数
        pageSize:10,        // 每页显示的数目
        total:10,           // 总的页数目
        totalItemNum:10,     // 总的博客条目
        tableData: [],
        isShow: false,       // 默认分页组件不显示，仅当总的博客条目数大于等于10的时候才显示

        deleteDialog: false,

        id: 0,
        title: '',
        tag: '',
        categoryId: 0,
        categoryName: '',
        content: '',

        selected: '',
        options: [],

        deleteIndex: -1,
        topPopupModify: false,
        topPopupDel: false
    }

  },

  methods: {

    unselect () {
      this.$refs.table.unSelectAll()
    },

    getArticles() {
      var _this = this;
      _this.$http.get('/backadmin/articlelist/my/0'
      ,{
        params:{
          page: 1
        },
      }
      )
      .then(function (response) {
          // console.log(response.data.articles)  // console.log用于调试效果挺好
          _this.tableData=response.data.articles;
          _this.total = parseInt(response.data.pageTotalNum);
          _this.pageSize = parseInt(response.data.pageSize);
          _this.current = parseInt(response.data.page);

          if (_this.totalItemNum>=10) {
            _this.isShow = true;
          }
      })

      _this.$http.get('/backadmin/getCategory').then(function (response) {
        var categoryList = response.data
        // console.log(categoryList)
        for( var i=0; i<categoryList.length; i++ ) {
          _this.options.push({text:categoryList[i].name,value:categoryList[i].id})
        }
        // console.log(_this.options)
      })

    },

    handleClick (newIndex) {
      var _this = this;
      var url='/backadmin/articlelist/my/0'

      _this.$http.get(url
      ,{
        params:{
          page: newIndex
        },
      }
      ).then(function (response) {

          _this.tableData=response.data.articles;
          _this.total = parseInt(response.data.pageTotalNum);
          _this.pageSize = parseInt(response.data.pageSize);
          _this.current = parseInt(response.data.page);

          if (_this.totalItemNum>=10) {
            _this.isShow = true;
          }
      })
    },

    openWork () {
      document.getElementById('postContentIframe').src="../../static/write.html";
    },

    openDelDialog (index) {
      // alert(index)
      this.deleteIndex = index
      this.deleteDialog = true;
    },

    closeDelDialog () {
      this.deleteDialog = false;
    },

    confirmDelete() {
      var _this = this
      var url='/backadmin/delete'
      _this.$http.get(
        url,
        {
          params: {
            id: _this.tableData[_this.deleteIndex].id
          },
        }
      ).then(function (response) {
        if(response.data.rspCode == '000000'){
          _this.deleteDialog = false
          _this.topPopupDel = true
          _this.$http.get('/backadmin/articlelist/my/0'
          ,{
            params:{
              page: _this.current
            },
          }).then(function (response) {
            _this.tableData = response.data.articles;
            _this.total = parseInt(response.data.pageTotalNum);
            _this.pageSize = parseInt(response.data.pageSize);
            _this.current = parseInt(response.data.page);

            if (_this.totalItemNum>=10) {
              _this.isShow = true;
            }
          })
        }else{
          alert("删除失败")
        }
      })
    },

    clickOperationTd(index) {
      var _this = this
      document.getElementById('indexTag').value = _this.tableData[index].id // 将id放入一个hidden的input中
      var url='/backadmin/article'
      
      _this.$http.get(url,
      {
        params:{
          id: _this.tableData[index].id
        },
      }
      ).then(function (response) {
          _this.id = response.data.id
          _this.title = response.data.title
          _this.tag = response.data.tag
          _this.categoryId = response.data.categoryId
          _this.categoryName = response.data.categoryName
          _this.content = response.data.content
          _this.selected = response.data.categoryId
          document.getElementById('postContent').value = response.data.content
      })
    },

    saveModifyArticle() {

      var _this = this;
      var editorContentArea = $(window.frames["postContentIframe"].document).find("#editormd>textarea");
      var content = editorContentArea.val();
      var datas = Qs.stringify({
        id: _this.id,
        title: _this.title,
        tag: _this.tag,
        categoryId: _this.selected,
        categoryName: _this.options.find(item => item.value === _this.selected)['text'],
        content: content,
      });
      // console.log(datas);
      this.$http.post('/backadmin/modifyarticle',datas, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(function (response) {
        if(response.data.rspCode == '000000'){
          // alert("保存成功")
          var idTemp = document.getElementById('indexTag').value + '_title'
          var categoryTemp = document.getElementById('indexTag').value + '_category'
          var tagTemp = document.getElementById('indexTag').value + '_tag'
          
          document.getElementById(idTemp).innerHTML = _this.title
          document.getElementById(categoryTemp).innerHTML = _this.options.find(item => item.value === _this.selected)['text']
          document.getElementById(tagTemp).innerHTML = _this.tag
          _this.topPopupModify = true
        }else{
          alert("保存失败")
        }
        $("#postModal").modal("hide"); // 隐藏弹出式modal框
      }, function(response){
          console.log('error');
      })
    
    }

  },

  mounted() {
      this.getArticles();
  },

  watch: {
    topPopupModify (val) {
      if (val) {
        setTimeout(() => {
          this.topPopupModify = false
        }, 1500)
      }
    },

    topPopupDel (val) {
      if (val) {
        setTimeout(() => {
          this.topPopupDel = false
        }, 1500)
      }
    }
  }

}
</script>


<style>

.layout .content-right .bloglist .mu-table{
  table-layout: auto;
}

.body{
  height: 80%;
}

.blogtable{
  height: 85%;
}

.bloglist{
  height: 100%;
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

.mu-pagination-item {
  font-size: 13px;
}

.demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
</style>