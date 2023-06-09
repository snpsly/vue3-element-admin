import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfo } from "@/api/user";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/auth/types";
import { UserInfo } from "@/api/user/types";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // state
  const userId = ref();
  const token = useStorage("accessToken", "");
  const nickname = ref("");
  const avatar = ref("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限   使 v-hasPerm 在所有组件中都可用  在src/directive文件下

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          token.value = tokenType + " " + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      // getUserInfo()
      //   .then(({ data }) => {
      //     if (!data) {
      //       return reject("Verification failed, please Login again.");
      //     }
      //     if (!data.roles || data.roles.length <= 0) {
      //       reject("getUserInfo: roles must be a non-null array!");
      //     }
			const data = {
				"userId": 2,
				"nickname": "系统管理员",
				"avatar": "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
				"roles": [
					"ADMIN"
				],
				"perms": [
					"sys:menu:delete",
					"sys:dict_type:add",
					"sys:dept:edit",
					"sys:dict:edit",
					"sys:dict:delete",
					"sys:dict_type:edit",
					"sys:menu:add",
					"sys:user:add",
					"sys:dept:delete",
					"sys:role:edit",
					"sys:user:edit",
					"sys:user:reset_pwd",
					"sys:user:delete",
					"sys:dept:add",
					"sys:dict_type:delete",
					"sys:role:delete",
					"sys:menu:edit",
					"sys:dict:add",
					"sys:role:add"
				]
			}
          userId.value = data.userId;
          nickname.value = data.nickname;
          avatar.value = data.avatar;
          roles.value = data.roles;
          perms.value = data.perms;
          resolve(data);
        // })
        // .catch((error) => {
        //   reject(error);
        // });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter();
          resetToken();
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken() {
    token.value = "";
    nickname.value = "";
    avatar.value = "";
    roles.value = [];
    perms.value = [];
  }
  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
    /**
     * 当前登录用户ID
     */
    userId,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
