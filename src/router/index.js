import Vue from 'vue'
import Router from 'vue-router'
import homeMask from '@/pages/homeMask'
import Home from '@/pages/home'
import details from '@/pages/details'
import comment from '@/pages/comment'
import theme from '@/pages/theme'
import collect from '@/pages/collect'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      	path: '/',
      	name: 'homeMask',
      	component: homeMask
    },
    {
      	path: '/home',
      	name: 'home',
      	component: Home
    },
    {
		    path: '/details',
      	name: 'details',
      	component: details
    },
    {
        path: '/comment',
        name: 'comment',
        component: comment
    },
    {
        path: '/theme/:id',
        name: 'theme',
        component: theme
    },
    {
        path: '/collect',
        name: 'collect',
        component: collect
    }
  ]
})
