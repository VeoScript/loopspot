import React from 'react';
import tw from '../../styles/tailwind';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}): JSX.Element => {
  return (
    <SafeAreaView style={tw`relative flex-1 bg-accent-3`}>
      <ScrollView
        contentContainerStyle={tw`w-full h-full`}
        keyboardShouldPersistTaps="handled">
        <View
          style={tw`flex-col items-center justify-center w-full h-full px-5 gap-y-5`}>
          <View style={tw`flex-col items-center w-full`}>
            <Text style={tw`font-vina-sans text-3xl default-text-color`}>
              Loopspot
            </Text>
            <Text style={tw`font-dosis text-sm default-text-color`}>
              Blog type social media app
            </Text>
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
