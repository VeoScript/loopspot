import AsyncStorage from '@react-native-async-storage/async-storage';
import {sign} from 'react-native-pure-jwt';
import {useNavigate} from '../../config/RootNavigation';
import {SECRET_KEY} from '@env';

interface LoginProps {
  email: string;
  password: string;
  setError: (value: string) => void;
  setDefault: () => void;
  loginMutation: any;
}

interface RegistrationProps {
  name: string;
  email: string;
  password: string;
  setDefault: () => void;
  registerMutation: any;
}

export const useLoginMutation = async (props: LoginProps): Promise<void> => {
  const {email, password, setError, setDefault, loginMutation} = props;

  const user = await loginMutation({
    email,
    password,
  });

  if (user?.status === 400) {
    setError(user?.message);
    setDefault();
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
  const {name, email, password, setDefault, registerMutation} = props;

  const userId = await registerMutation({
    name,
    email,
    password,
  });

  if (userId) {
    const token = await sign(
      {
        userId: userId,
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

  setDefault();

  return;
};
