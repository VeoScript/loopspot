import React from 'react';
import tw from '../../styles/tailwind';
import {SafeAreaView, View, Text, ActivityIndicator} from 'react-native';

const BootSplashScreen = () => {
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-center w-full gap-y-10 bg-accent-3`}>
      <View style={tw`flex-col items-center w-full`}>
        <Text style={tw`font-vina-sans text-3xl default-text-color`}>
          Loopspot
        </Text>
        <Text style={tw`font-dosis text-sm default-text-color`}>
          Blog type social media app
        </Text>
      </View>
      <View style={tw`flex-col items-center w-full gap-y-1`}>
        <ActivityIndicator color="#E26D5C" size={50} />
        <Text style={tw`default-text-color font-dosis`}>Just wait...</Text>
      </View>
    </SafeAreaView>
  );
};

export default BootSplashScreen;
