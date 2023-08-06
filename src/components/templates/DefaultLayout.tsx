import React from 'react';
import TopBar from '../molecules/TopBar';
import BottomBar from '../molecules/BottomBar';
import MenuBar from '../molecules/MenuBar';
import tw from '../../styles/tailwind';
import {SafeAreaView, View} from 'react-native';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <SafeAreaView style={tw`relative flex-col w-full h-full bg-accent-3`}>
      <TopBar />
      <MenuBar />
      <View style={tw`flex-1`}>{children}</View>
      <BottomBar />
    </SafeAreaView>
  );
};

export default DefaultLayout;
