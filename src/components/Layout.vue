<template>
  <div class="layout">
    <div class="content">
      <div class="content-left">
        <div class="logo">
          CodeSheep后台管理
        </div>
        <mu-list @change="handleListChange" :value="activeList">
          
          <mu-list-item title="博文管理" value="list1" to="/bloglist"  >
            <mu-icon slot="left" value="send" />
          </mu-list-item>


          <mu-list-item title="留言管理" value="list2">
            <mu-icon slot="left" value="drafts"/>
          </mu-list-item>
          

          <mu-list-item title="预留菜单" toggleNested value="list3">
            <mu-icon slot="left" value="inbox"/>
            
            <mu-list-item slot="nested" title="预留子菜单1" value="list4">
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>

            <mu-list-item slot="nested"  title="预留子菜单2" toggleNested value="list5" >
              <mu-icon slot="left" value="send"/>
              <mu-list-item title="预留三级子菜单" slot="nested" value="list6">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>

            <mu-list-item slot="nested" title="预留子菜单3" toggleNested value="list7">
              <mu-icon slot="left" value="inbox"/>
              <mu-list-item title="预留三级子菜单" slot="nested" value="list8">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>

          </mu-list-item>

        </mu-list>
      </div>


      <div class="content-right">
        <div class="body">
          <router-view></router-view>
        </div>

        <div class="footer">
          Copyright © CodeSheep 2017-2018
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      activeTab: 'tab1',
      activeList: 'list1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    handleListChange (val) {
      this.activeList = val
    }
  },
  mounted(){
      this.$router.push({ path: '/welcome' });
  }

}

</script>


<style scoped>

.layout{
  text-align: left;
}

.logo{
  font-size: 24px;
  color: white;
  text-align: center;
  color: #7e57c2;
  padding: 10px 20px;
}

.tab{
  margin: 0 auto;
  width: 400px;
}

.content{
  overflow: hidden;

  position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}

.content-left{
  width: 20%;
  float: left;
  background-color: rgb(225, 225, 225);
  margin-bottom: -4000px;
  padding-bottom: 4000px;


}

.content-right{
  text-align: center;
  width: 80%;
  display: inline-block;
  float: right;
  background-color: rgb(236, 236, 236);



         position: absolute;

         top: 0;
         bottom: 0;


}


.body{
  min-height: 80%;
  background-color: white;
  margin: 10px 20px;
}

.footer{
  padding: 10px 0;
  text-align: center;
}
</style>