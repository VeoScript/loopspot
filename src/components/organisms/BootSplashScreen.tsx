import React from 'react';
import tw from '../../styles/tailwind';
import {SafeAreaView, View, Text} from 'react-native';

const BootSplashScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center w-full bg-accent-1`}>
      <View style={tw`flex-col items-center w-full`}>
        <Text style={tw`font-dosis text-3xl`}>Splash this shit</Text>
      </View>
    </SafeAreaView>
  );
};

export default BootSplashScreen;
