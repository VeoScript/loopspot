import AsyncStorage from '@react-native-async-storage/async-storage';
import {sign} from 'react-native-pure-jwt';
import {useNavigate} from '../../config/RootNavigation';
import {SECRET_KEY} from '@env';

interface LoginProps {
  email: string;
  password: string;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setDefault: () => void;
  loginMutation: any;
}

interface RegistrationProps {
  name: string;
  email: string;
  password: string;
  repassword: string;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setDefault: () => void;
  registerMutation: any;
}

export const useLoginMutation = async (props: LoginProps): Promise<void> => {
  const {email, password, setError, setIsLoading, setDefault, loginMutation} = props;

  if (email.trim() === '') {
    setError('Email is required');
    setIsLoading(false);
    return;
  }
  
  if (password.trim() === '') {
    setError('Password is required');
    setIsLoading(false);
    return;
  }

  const user = await loginMutation({
    email,
    password,
  });

  if (user?.status === 400) {
    setError(user?.message);
    setIsLoading(false);
  } else {
    const token = await sign(
      {
        userId: user._id,
      },
      SECRET_KEY,
      {
        alg: 'HS256',
      },
    );

    await AsyncStorage.setItem('USER_TOKEN', token);
    setDefault();
    useNavigate('HomeScreen');
  }

  return;
};

export const useRegisterMutation = async (
  props: RegistrationProps,
): Promise<void> => {
  const {name, email, password, repassword, setError, setIsLoading, setDefault, registerMutation} = props;

  if (name.trim() === '') {
    setError('Name is required');
    setIsLoading(false);
    return;
  }

  if (email.trim() === '') {
    setError('Email is required');
    setIsLoading(false);
    return;
  }
  
  if (password.trim() === '') {
    setError('Password is required');
    setIsLoading(false);
    return;
  }
  
  if (repassword.trim() === '') {
    setError('Re-enter password is required');
    setIsLoading(false);
    return;
  }
  
  if (repassword !== password) {
    setError('Password not matched, Try again.');
    setIsLoading(false);
    return;
  }

  const user = await registerMutation({
    name,
    email,
    password,
  });

  if (user.status === 400) {
    setError(user.message);
    setIsLoading(false);
    return;
  }

  const token = await sign(
    {
      userId: user.userId,
    },
    SECRET_KEY,
    {
      alg: 'HS256',
    },
  );

  await AsyncStorage.setItem('USER_TOKEN', token);
  setDefault();
  useNavigate('HomeScreen');

  return;
};

export const useLogoutMutation = async (): Promise<void> => {
  await AsyncStorage.setItem('USER_TOKEN', '');
  useNavigate('LoginScreen');
  return;
};
