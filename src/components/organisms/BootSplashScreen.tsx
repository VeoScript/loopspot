import React from 'react';
import Logo from '../atoms/Logo';
import LoadingDefault from './LoadingDisplay/LoadingDefault';
import tw from '../../styles/tailwind';
import {SafeAreaView} from 'react-native';

const BootSplashScreen = () => {
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-center w-full gap-y-10 bg-accent-3`}>
      <Logo />
      <LoadingDefault />
    </SafeAreaView>
  );
};

export default BootSplashScreen;
