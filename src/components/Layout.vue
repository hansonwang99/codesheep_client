<template>
  <div class="layout">
    <div class="content">
      <div class="content-left">
        <div class="logo">
          CodeSheep后台管理
        </div>
        <mu-list @change="handleListChange" :value="activeList">
          
          <mu-list-item title="1" value="list1" >
            <mu-icon slot="left" value="send" />
          </mu-list-item>


          <mu-list-item title="2" value="list2">
            <mu-icon slot="left" value="drafts"/>
          </mu-list-item>
          

          <mu-list-item title="3" toggleNested value="list3">
            <mu-icon slot="left" value="inbox"/>
            
            <mu-list-item slot="nested" title="3-1" value="list4">
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>

            <mu-list-item slot="nested"  title="3-2" toggleNested value="list5" >
              <mu-icon slot="left" value="send"/>
              <mu-list-item title="Drafts" slot="nested" value="list6">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>

            <mu-list-item slot="nested" title="3-3" toggleNested value="list7">
              <mu-icon slot="left" value="inbox"/>
              <mu-list-item title="Drafts" slot="nested" value="list8">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>

          </mu-list-item>


        </mu-list>
      </div>
      <div class="content-right">
        
        <div class="body">
          <mu-sub-header>阳光</mu-sub-header>
          <mu-content-block>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
          </mu-content-block>
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