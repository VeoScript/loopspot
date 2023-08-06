import React from 'react';
import TopBar from '../molecules/TopBar';
import BottomBar from '../molecules/BottomBar';
import tw from '../../styles/tailwind';
import {SafeAreaView, View} from 'react-native';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <SafeAreaView style={tw`relative flex-1 flex-col w-full bg-accent-3`}>
      <TopBar />
      <View style={tw`flex-1 flex-col w-full`}>{children}</View>
      <BottomBar />
    </SafeAreaView>
  );
};

export default DefaultLayout;
