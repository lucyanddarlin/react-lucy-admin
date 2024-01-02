import React, { useCallback, useEffect } from 'react';

import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks/use-router';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();

  const checkAuth = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
}
