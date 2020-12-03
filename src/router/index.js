import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/localLogin'),
    hidden: true
  },
  {
    path: '/Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },
  {
    path: '/yssetting',
    component: Layout,
    redirect: '/yssetting/yscd',
    name: 'yssetting',
    meta: { title: '原纱配置', icon: 'nested' },
    children: [
      {
        path: '/原纱产地',
        name: 'yscd',
        component: () => import('@/views/ysdaCd/yscd'),
        meta: { title: '原纱产地', icon: 'nested' }
      },
      {
        path: '/原纱颜色',
        name: 'ysys',
        component: () => import('@/views/ysdaYs/ysys'),
        meta: { title: '原纱颜色', icon: 'nested' }
      },
      {
        path: '/原纱成分',
        name: 'yscf',
        component: () => import('@/views/ysdaCf/yscf'),
        meta: { title: '原纱成分', icon: 'nested' }
      },
      {
        path: '/原纱吊牌',
        name: 'ysdp',
        component: () => import('@/views/ysdaDp/ysdp'),
        meta: { title: '原纱吊牌', icon: 'nested' }
      }
    ]
  },
  {
    path: '/gysda',
    component: Layout,
    children: [
      {
        path: '/供应商档案',
        name: 'gysda',
        component: () => import('@/views/gysda/gysda'),
        meta: { title: '供应商档案', icon: 'tree' }
      }
    ]
  },
  {
    path: '/ysda',
    component: Layout,
    children: [
      {
        path: '/原纱档案',
        name: 'ysda',
        component: () => import('@/views/ysda/ysda'),
        meta: { title: '原纱档案', icon: 'tree' }
      }
    ]
  },

  {
    path: '/ysdjb',
    component: Layout,
    children: [
      {
        path: '/原纱单价表',
        name: 'ysdjb',
        component: () => import('@/views/ysdjb/index'),
        meta: { title: '原纱单价表', icon: 'tree' }
      }
    ]
  },

  {
    path: '/kczzljz',
    component: Layout,
    children: [
      {
        path: '/原纱库存周转量基准',
        name: 'kczzljz',
        component: () => import('@/views/kczzljz/kczzljz'),
        meta: { title: '原纱库存周转量基准', icon: 'tree' }
      }
    ]
  },
  {
    path: '/yszlbz',
    component: Layout,
    children: [
      {
        path: '/原纱重量标准',
        name: 'yszlbz',
        component: () => import('@/views/yszlbz/yszlbz'),
        meta: { title: '原纱重量标准', icon: 'tree' }
      }
    ]
  },
  {
    path: '/jsqr',
    component: Layout,
    children: [
      {
        path: '/经纱确认',
        name: 'jsqr',
        component: () => import('@/views/jsqr'),
        meta: { title: '经纱确认', icon: 'tree' }
      }
    ]
  },
  {
    path: '/wsqr',
    component: Layout,
    children: [
      {
        path: '/纬纱确认',
        name: 'wsqr',
        component: () => import('@/views/wsqr_new'),
        meta: { title: '纬纱确认', icon: 'tree' }
      }
    ]
  },
  {
    path: '/scjhdsb',
    component: Layout,
    children: [
      {
        path: '/生产计划订纱表',
        name: 'scjhdsb',
        component: () => import('@/views/scjhdsb'),
        meta: { title: '生产计划订纱表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/ycdddsb',
    component: Layout,
    children: [
      {
        path: '/预测订单订纱表',
        name: 'ycdddsb',
        component: () => import('@/views/ycdddsb'),
        meta: { title: '预测订单订纱表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/ysdhd',
    component: Layout,
    children: [
      {
        path: '/原纱订货单',
        name: 'ysdhd',
        component: () => import('@/views/ysdhd/ysdhd'),
        meta: { title: '原纱订货单', icon: 'tree' }
      },
      {
        path: '/原纱订货单/原纱订货单计划新增',
        name: 'ysdhdPlan',
        component: () => import('@/views/ysdhd/addPlanNew'),
        meta: { title: '原纱订货单计划新增' },
        hidden: true
      },
      {
        path: '/原纱订货单/原纱订货单新增',
        name: 'ysdhdNew',
        component: () => import('@/views/ysdhd/addNewYs'),
        meta: { title: '原纱订货单新增' },
        hidden: true
      }
    ]
  },
  {
    path: '/yshtfp',
    component: Layout,
    children: [
      {
        path: '/原纱合同及发票管理',
        name: 'yshtfp',
        component: () => import('@/views/yshtfp/index'),
        meta: { title: '原纱合同及发票管理', icon: 'tree' }
      }
    ]
  },

  // {
  //       path: '/原纱订货单计划新增',
  //       name: 'ysdhdPlan',
  //       component: () => import('@/views/ysdhd/addPlanNew'),
  //       meta: { title: '原纱订货单计划新增'},
  //       hidden: true
  // },
  //   {
  //     path: '/原纱订货单新增',
  //     name: 'ysdhdNew',
  //     component: () => import('@/views/ysdhd/addNewYs'),
  //     meta: { title: '原纱订货单新增'},
  //     hidden: true
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'hash'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
