import Vue from 'vue'
import Router from 'vue-router'

/*一级路由*/
import control from '@/views/control'
import login from '@/views/login'
import home from '@/views/home'

/*二级路由*/
import apps from '@/components/apps'
import devices from '@/components/devices'
import testcases from '@/components/testcases'
import tasks from '@/components/tasks'
import accounts from '@/components/accounts'
import help from '@/components/help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
     {
      path: '/',
      name: 'login',
      component: login
    },
     {
      path: '/control',
      component: control,
      children:
        [
          {name:'apps', path:'/',component:apps},
          {name:'devices', path:'/control/devices',component:devices},
          {name:'testcases', path:'/control/testcases',component:testcases},
          {name:'tasks', path:'/control/tasks',component:tasks},
          {name:'accounts', path:'/control/accounts',component:accounts},
          {name:'help', path:'/control/help',component:help}
        ]
    }
  ]
})
