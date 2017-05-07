import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import Login from '@/views/Login'
import main from '@/components/main'
import music from '@/components/music'
import blog from '@/components/blog'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
     {
      path: '/Home',
      component: Home,
      children:
        [
          {name:'main', path:'/',component:main},
          {name:'music', path:'/music',component:music},
          {name:'blog', path:'/blog',component:blog},
          {name:'about', path:'/Home/about',component:about}
        ]
    },
     {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
