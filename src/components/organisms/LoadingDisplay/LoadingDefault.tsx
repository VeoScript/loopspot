import React from 'react';
import tw from '../../../styles/tailwind';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingDefault = () => {
  return (
    <View style={tw`flex-col items-center w-full py-10 gap-y-1`}>
      <ActivityIndicator color="#CC8500" size={50} />
      <Text style={tw`default-text-color font-dosis`}>Just wait...</Text>
    </View>
  );
};

export default LoadingDefault;
