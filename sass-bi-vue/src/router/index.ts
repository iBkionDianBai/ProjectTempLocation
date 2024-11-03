import type { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/metaDataControl",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/meta-data-control/index.vue"),
        name: "metaDataControl",
        meta: { title: "元数据管理", icon: "monitor" },
      },
    ],
  },
  {
    path: "/DataSourceManager",
    component: Layout,
    meta: { title: "数据源管理", icon: "monitor" },
    children: [
      {
        path: "/DataSourceManager",
        component: () =>
          import("@/views/DataSourceManager/DataSourceManager.vue"),
        name: "dataSourceManager",
        meta: { title: "数据源管理" },
      },
    ],
  },
   {
    path: "/DBdata",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/DBdata/index.vue"),
        name: "DBdata",
        meta: { title: "数仓数据概览", icon: "monitor" },
      },
    ],
  },
  {
    path: "/dataExtraction",
    component: Layout,
    name: "DataExtraction",
    meta: { title: "数据抽取", icon: "monitor" },
    children: [
      {
        path: "/createMission",
        component: () => import("@/views/dataExtraction/createMission.vue"),
        name: "dataExtractionCreateMission",
        meta: { title: "创建数据抽取任务", icon: "monitor" },
      },
      {
        path: "/missionList",
        component: () => import("@/views/dataExtraction/missionList.vue"),
        name: "missionList",
        meta: { title: "数据抽取任务列表", icon: "monitor" },
      },
       {
        path: "index",
        component: () => import("@/views/dataExtraction/data-develop/index.vue"),
        name: "datadevelop",
        meta: { title: "数据开发任务列表", icon: "monitor" },
      },
    ],
  },
  {
    path: "/dataRule",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/dataRule/index.vue"),
        name: "dataRule",
        meta: { title: "数据标准处理", icon: "monitor" },
      },
    ],
  },

  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
        // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "homepage",
          affix: true,
          keepAlive: true,
        },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },

  {
    path: "/canvas",
    component: Layout,
    redirect: "/canvas/logicFlow",
    name: "/canvas",
    meta: {
      title: "工作流演示",
      icon: "system",
      hidden: false,
      alwaysShow: false,
      params: null,
    },
    children: [
      {
        path: "logicFlow",
        component: () => import("@/views/canvas/logicFlow/index.vue"),
        name: "LogicFlow",
        meta: {
          title: "logicFlow演示",
          icon: "el-icon-User",
          hidden: false,
          keepAlive: true,
          alwaysShow: false,
          params: null,
        },
      },
    ],
  },

  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [ {
  //       component: () => import("@/views/external-link/index.vue"),
  //       path: "https://www.cnblogs.com/haoxianrui/",
  //       meta: { title: "外部链接", icon: "link" },
  //     },
  //   ],
  // },
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
