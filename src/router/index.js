import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { checktoKen } from '@/api/apis'


Vue.use(VueRouter)



const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component:() => import( '../pages/Main'),
      children:[
        {
          path: '/main/index',
          name: '/main/index',
          component: () => import('../pages/main/Index.vue'),
          meta:{breadlist:['首页']}
        },
        {
          path: '/main/order',
          name: '/main/order',
          component: () => import('../pages/main/Order.vue'),
          meta:{breadlist:['订单管理']}
        },
        {
          path: '/main/shopmanager',
          name: '/main/shopmanager',
          component: () => import('../pages/main/ShopManager.vue'),
          meta:{breadlist:['店铺管理']}
        },


        {
          path: '/main/items/additem',
          name: '/main/items/additem',
          component: () => import('../pages/main/items/Additem.vue'),
          meta:{breadlist:['商品管理','添加商品']}
        },
        {
          path: '/main/items/itemslist',
          name: '/main/items/itemslist',
          component: () => import('../pages/main/items/ItemsList.vue'),
          meta:{breadlist:['商品管理','商品列表']}
        },
        {
          path: '/main/items/itemstype',
          name: '/main/items/itemstype',
          component: () => import('../pages/main/items/ItemsType.vue'),
          meta:{breadlist:['商品管理','商品分类']}
        },


        {
          path: '/main/users/useradd',
          name: '/main/users/useradd',
          component: () => import('../pages/main/users/UserAdd.vue'),
          meta:{breadlist:['账号管理','添加账号']}
        },
        {
          path: '/main/users/useredit',
          name: '/main/users/useredit',
          component: () => import('../pages/main/users/UserEdit.vue'),
          meta:{breadlist:['账号管理','修改密码']}
        },
        {
          path: '/main/users/userlist',
          name: '/main/users/userlist',
          component: () => import('../pages/main/users/UserList.vue'),
          meta:{breadlist:['账号管理','账号列表']}
        },
        {
          path: '/main/users/userpersonal',
          name: '/main/users/userpersonal',
          component: () => import('../pages/main/users/UserPersonal.vue'),
          meta:{breadlist:['个人中心']}
        },


        {
          path: '/main/count/salecount',
          name: '/main/count/salecount',
          component: () => import('../pages/main/count/SaleCount.vue'),
          meta:{breadlist:['销售统计','订单统计']}
        },
        {
          path: '/main/count/statistics',
          name: '/main/count/statistics',
          component: () => import('../pages/main/count/Statistics.vue'),
          meta:{breadlist:['销售统计','商品统计']}
        },

        
      ]
    }
  ]
})


router.beforeEach((to,from,next) => {
  if(to.path != '/'){
    checktoKen(localStorage.token).then(res =>{
      if(res.data.code == 0)
        next()
      else
        next('/')
    })
  }else{
    next()
  }
})

router.afterEach( )


export default router
