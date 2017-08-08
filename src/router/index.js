import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import BlogList from '@/components/BlogList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children:[
      	{
      		path: '/bloglist',
      		name: 'bloglist',
      		component: BlogList
      	}
      ]
    }
  ]
})
