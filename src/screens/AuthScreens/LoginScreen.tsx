import React from 'react';
import {View, Text} from 'react-native';
import AuthLayout from '../../components/templates/AuthLayout';

const LoginScreen = (): JSX.Element => {
  return (
    <AuthLayout>
      <View>
        <Text>Login Screen</Text>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;
