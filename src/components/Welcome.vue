<template>
  <div>
    
    <mu-sub-header>CodeSheep Admin Page</mu-sub-header>
    <mu-content-block>
      {{ msg }}
    </mu-content-block>

  </div>
</template>

<script>

export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcome to CodeSheep 后台管理，请点击左侧菜单开始您的旅途吧！'
    }
  }
}

</script>
