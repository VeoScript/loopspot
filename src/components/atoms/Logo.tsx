import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from '../../styles/tailwind';

const Logo = () => {
  return (
    <View style={tw`flex-col items-center w-full gap-y-3`}>
      <Image
        style={tw`w-[5rem] h-[5rem] rounded-full bg-accent-8`}
        resizeMode="cover"
        source={require('../../assets/images/loopspot_rounded.png')}
      />
      <View style={tw`flex-col items-center w-full`}>
        <Text style={tw`font-vina-sans text-3xl default-text-color`}>
          Loopspot
        </Text>
        <Text style={tw`font-dosis text-sm default-text-color`}>
          Blog type social media app
        </Text>
      </View>
    </View>
  );
};

export default Logo;
