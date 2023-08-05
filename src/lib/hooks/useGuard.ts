import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode} from 'react-native-pure-jwt';
import {SECRET_KEY} from '@env';

import {userStore} from '../stores/auth';

export const useGuard = (): boolean => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const {setUserId} = userStore();

  useEffect(() => {
    let interval = setInterval(async () => {
      const token = await AsyncStorage.getItem('USER_TOKEN');

      if (token) {
        const {payload}: any = await decode(token, SECRET_KEY, {
          skipValidation: true
        })
        setIsAuth(true);
        setUserId(payload.userId);
      } else {
        setIsAuth(false);
        setUserId('');
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isAuth;
};
