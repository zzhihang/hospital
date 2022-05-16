// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: '首页', keepAlive: true, icon: bxAnaalyse },
      },
      {
        path: '/workplace',
        name: 'workplace',
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: '首页2', keepAlive: true, icon: bxAnaalyse },
      },

      {
        path: '/doctor_manage',
        name: 'doctor_manage',
        component: RouteView,
        redirect: '/doctor_manage/doctor',
        meta: { title: '医生管理', icon: 'warning'},
        children: [
          {
            path: '/doctor_manage/doctor',
            name: 'doctor',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/doctor'),
            meta: { title: '医生信息'},
          },
          {
            path: '/doctor_manage/doctor/detail',
            name: 'DoctorDetail',
            hidden: true,
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/doctor/DoctorDetail'),
            meta: { title: '医生信息详情'},
          },
          {
            path: '/doctor_manage/service',
            name: 'service',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/service'),
            meta: { title: '医生服务项目'}
          },
          {
            path: '/doctor_manage/hospital',
            name: 'hospital',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/hospital'),
            meta: { title: '医院信息'}
          },
          {
            path: '/doctor_manage/department',
            name: 'department',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/department'),
            meta: { title: '科室信息'}
          },
          {
            path: '/doctor_manage/disease',
            name: 'disease',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/doctor_manage/disease'),
            meta: { title: '疾病信息'}
          },
        ]
      },
      //user
      {
        path: '/user',
        name: 'user',
        component: RouteView,
        redirect: '/user/customer',
        meta: { title: '用户就诊人管理', icon: 'warning'},
        children: [
          {
            path: '/user/customer',
            name: 'customer',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/user/customer'),
            meta: { title: '就诊端用户'},
          },
          {
            path: '/user/patient',
            name: 'patient',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/user/patient'),
            meta: { title: '就诊端信息'},
          },
        ]
      },

      // order
      {
        path: '/order',
        name: 'order',
        component: RouteView,
        redirect: '/order/list',
        meta: { title: '订单管理', icon: 'warning'},
        children: [
          {
            path: '/order/list',
            name: 'OrderList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/order/record'),
            meta: { title: '订单记录'}
          },{
            path: '/order/detail',
            name: 'OrderDetail',
            hidden: true,
            component: () => import(/* webpackChunkName: "fail" */ '@/views/order/record/OrderDetail'),
            meta: { title: '订单详情'}
          },{
            path: '/order/platform',
            name: 'OrderPlatform',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/order/platform'),
            meta: { title: '服务平台每日收益统计'}
          },{
            path: '/order/doctor',
            name: 'OrderDoctor',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/order/doctor'),
            meta: { title: '医生累计收益统计'}
          },{
            path: '/order/income',
            name: 'income',
            hidden: true,
            component: () => import(/* webpackChunkName: "fail" */ '@/views/order/income/income'),
            meta: { title: '收益详情'}
          },
        ]
      },
      // order
      {
        path: '/recommend',
        name: 'recommend',
        component: RouteView,
        redirect: '/recommend/list',
        meta: { title: '推荐医生', icon: 'warning'},
        children: [
          {
            path: '/recommend/list',
            name: 'recommendList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/recommend'),
            meta: { title: '推荐医生'}
          }
        ]
      },
      {
        path: '/admin',
        name: 'admin',
        component: RouteView,
        redirect: '/admin/list',
        meta: { title: '管理员管理', icon: 'warning'},
        children: [
          {
            path: '/admin/list',
            name: 'admin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/admin/admin'),
            meta: { title: '管理员管理'}
          }
        ]
      },
      {
        path: '/dictionary',
        name: 'dictionary',
        component: RouteView,
        redirect: '/dictionary',
        meta: { title: '字典配置', icon: 'warning'},
        children: [
          {
            path: '/dictionary/list',
            name: 'dictionaryList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/dictionary'),
            meta: { title: '字典配置'}
          }
        ]
      },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/settings',
        name: '系统管理',
        meta: { title: '系统管理', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/settings',
            name: '修改密码',
            component: () => import('@/views/account/settings/BasicSetting'),
            meta: { title: '修改密码'},
          },{
            path: '/account/sys',
            name: '系统设置',
            component: () => import('@/views/account/settings/sysSetting'),
            meta: { title: '系统设置'},
          }
        ]
      },

      // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: () => import('@/layouts/PageView'),
      //   meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList22',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: UserLayout,
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
