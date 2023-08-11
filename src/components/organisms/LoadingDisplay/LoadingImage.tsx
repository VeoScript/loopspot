import React from 'react';
import tw from '../../../styles/tailwind';
import {Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const LoadingImage = () => {
  return (
    <>
      <Image
        style={tw`w-full h-full bg-accent-3`}
        resizeMode="cover"
        source={require('../../../assets/images/loading_image.png')}
      />
      <BlurView
        style={tw`absolute inset-0 z-10`}
        blurType="light"
        blurAmount={50}
        reducedTransparencyFallbackColor="white"
      />
    </>
  );
};

export default LoadingImage;
