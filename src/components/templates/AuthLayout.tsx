import React from 'react';
import tw from '../../styles/tailwind';
import {SafeAreaView} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <SafeAreaView style={tw`flex-1 flex-col w-full bg-accent-1`}>
      {children}
    </SafeAreaView>
  );
};

export default AuthLayout;
