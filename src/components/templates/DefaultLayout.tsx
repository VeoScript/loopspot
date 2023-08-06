import React from 'react';
import tw from '../../styles/tailwind';
import {SafeAreaView} from 'react-native';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <SafeAreaView style={tw`flex-1 flex-col w-full bg-accent-3`}>
      {children}
    </SafeAreaView>
  );
};

export default DefaultLayout;
