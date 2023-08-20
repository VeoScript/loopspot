import React from 'react';
import TopBar from '../molecules/TopBar';
import BottomBar from '../molecules/BottomBar';
import MenuBar from '../molecules/MenuBar';
import tw from '../../styles/tailwind';
import {SafeAreaView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useCheckKeyboard} from '../../lib/hooks/useCheckKeyboard';

interface DefaultLayoutProps {
  title: string | undefined;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  title,
  children,
}): JSX.Element => {
  const route = useRoute();
  const isDisplayKeyboard = useCheckKeyboard();

  return (
    <SafeAreaView style={tw`relative flex-col w-full h-full bg-accent-3`}>
      {route.name !== 'ChatScreen' && <TopBar title={title} />}
      <MenuBar />
      <View style={tw`flex-1`}>{children}</View>
      {!isDisplayKeyboard && route.name !== 'ChatScreen' && <BottomBar />}
    </SafeAreaView>
  );
};

export default DefaultLayout;
