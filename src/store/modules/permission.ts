import { defineStore } from 'pinia'
import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import remainingRouter from '@/router/modules/remaining'
import bizRouter from '@/router/modules/biz'

import { flatMultiLevelRoutes, generateRoute } from '@/utils/routerHelper'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const { wsCache } = useCache()

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  menuTabRouters: AppRouteRecordRaw[]
}


export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    menuTabRouters: []
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers
    },
    getAddRouters(): AppRouteRecordRaw[] {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getMenuTabRouters(): AppRouteRecordRaw[] {
      return this.menuTabRouters
    }
  },
  actions: {
    async generateRoutes(): Promise<unknown> {
      return new Promise<void>(async (resolve) => {

        const routerMap: AppRouteRecordRaw[] = []
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        //用户授权路由
        const authRouter = filterAccessibleRoutes(bizRouter , convertPathsToComponentNames(userStore.permissions)).concat(routerMap) 
        // 渲染菜单的所有路由
        this.routers = cloneDeep(remainingRouter).concat(authRouter)
        resolve()
      })
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
      this.menuTabRouters = routers
    }
  },
  persist: false
})
//将path转成首字母大写驼峰字符串
function convertPathsToComponentNames(paths) {
  const componentNames = paths.map(path => {
    const parts = path.split('/').filter(part => part !== ''); // 分割路径并过滤空部分
    const componentName = parts.map(part => capitalize(part)).join(''); // 将每个部分转换为组件名称
    return componentName;
  });
  console.log("###" , componentNames);
  return componentNames;
}

// 辅助函数：将字符串首字母大写
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 生成用户有权限访问的路由列表（包括子路由递归处理）
const filterAccessibleRoutes = (routes: AppRouteRecordRaw[], permissions: string[]): AppRouteRecordRaw[] => {
  const accessibleRoutes: AppRouteRecordRaw[] = [];

  routes.forEach(route => {
    console.log("route" , route)
    console.log("route path" , route.name)
    if (permissions.includes(route.name)) {
      const newRoute: AppRouteRecordRaw = { ...route }; // 显式指定 newRoute 的类型为 AppRouteRecordRaw
      if (route.children) {
        const accessibleChildren = filterAccessibleRoutes(route.children, permissions); // 递归处理子路由
        newRoute.children = accessibleChildren;
      }
      accessibleRoutes.push(newRoute);
    }
  });
  console.log(accessibleRoutes)
  return accessibleRoutes;
};


export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
