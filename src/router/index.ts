import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
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
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "dashboard", icon: "homepage", affix: true },
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
];

export  const asyncRoutes: RouteRecordRaw[] = [
	{
		path: "/system",
		component: Layout,
		redirect: "/system/user",
		meta: {
			title: "系统管理",
			icon: "system",
			hidden: false,
			roles: [  //1、roles判断权限，当userInfo返回的roles为ADMIN则添加该路由
				"ADMIN"
			],
			keepAlive: true
		},
		children: [
			{
				path: "user",
				component: () => import("@/views/system/user/index.vue"),
				name: "User",
				meta: {
					title: "用户管理",
					icon: "user",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				}
			},
			{
				path: "role",
				component: () => import("@/views/system/role/index.vue"),
				name: "Role",
				meta: {
					title: "角色管理",
					icon: "role",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				}
			},
			{
				path: "menu",
				component: () => import("@/views/system/menu/index.vue"),
				name: "Menu",
				meta: {
					title: "菜单管理",
					icon: "menu",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				}
			},
			{
				path: "dept",
				component: () => import("@/views/system/dept/index.vue"),
				name: "Dept",
				meta: {
					title: "部门管理",
					icon: "tree",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				}
			},
			{
				path: "dict",
				component: () => import("@/views/system/dict/index.vue"),
				name: "Dict",
				meta: {
					title: "字典管理",
					icon: "dict",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				}
			}
		]
	},
	{
		path: "/multi-level",
		component: Layout,
		redirect: "/multi-level/multi-level1",
		meta: {
			title: "多级菜单",
			icon: "multi_level",
			hidden: false,
			roles: [
				"ADMIN"
			],
			keepAlive: true
		},
		children: [
			{
				path: "multi-level1",
				component: () => import("@/views/demo/multi-level/level1.vue"),
				redirect: "/multi-level/multi-level2",
				meta: {
					title: "菜单一级",
					icon: "",
					hidden: false,
					roles: [
						"ADMIN"
					],
					keepAlive: true
				},
				children: [
					{
						path: "multi-level2",
						component: () => import("@/views/demo/multi-level/children/level2.vue"),
						redirect: "/multi-level/multi-level2/multi-level3-1",
						meta: {
							title: "菜单二级",
							icon: "",
							hidden: false,
							roles: [
								"ADMIN"
							],
							keepAlive: true
						},
						children: [
							{
								path: "multi-level3-1",
								component: () => import("@/views/demo/multi-level/children/children/level3-1.vue"),
								name: "MultiLevel31",
								meta: {
									title: "菜单三级-1",
									icon: "",
									hidden: false,
									roles: [
										"ADMIN"
									],
									keepAlive: true
								}
							},
							{
								path: "multi-level3-2",
								component: () => import("@/views/demo/multi-level/children/children/level3-2.vue"),
								name: "MultiLevel32",
								meta: {
									title: "菜单三级-2",
									icon: "",
									hidden: false,
									roles: [
										"ADMIN"
									],
									keepAlive: true
								}
							}
						]
					}
				]
			}
		]
	},
]
/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
