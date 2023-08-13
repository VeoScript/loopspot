import React from 'react';
import Logo from '../atoms/Logo';
import tw from '../../styles/tailwind';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}): JSX.Element => {
  return (
    <SafeAreaView style={tw`relative flex-1 flex-col items-center justify-center w-full bg-accent-3`}>
      <ScrollView
        style={tw`flex-grow-0 w-full`}
        keyboardShouldPersistTaps="handled">
        <View
          style={tw`flex-col items-center justify-center w-full h-full px-5 py-5 gap-y-5`}>
          <Logo />
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
