import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import { UserInfo, UserToken } from '@/types/entity';
import { StorageEnum } from '@/types/enum';
import { getItem, removeItem, setItem } from '@/utils/storage';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间存放所有的 actions
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo(userInfo) {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken(userToken) {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation(userService.login);

  const login = async (data: SignInReq) => {
    try {
      const { user, accessToken, refreshToken } = await signInMutation.mutateAsync(data);
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigate(HOMEPAGE, { replace: true });

      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${data.username}`,
        duration: 3,
      });
    } catch (error) {
      message.warning({
        content: error.message,
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(login, []);
};
