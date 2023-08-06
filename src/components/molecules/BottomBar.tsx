import React from 'react';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {Image, View, TouchableOpacity} from 'react-native';

import {useNavigate} from '../../config/RootNavigation';

const BottomBar = () => {
  return (
    <View
      style={tw`relative flex-row items-center justify-around w-full bg-accent-3`}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('HomeScreen')}>
        <FeatherIcon name="home" color="#222" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('SearchScreen')}>
        <FeatherIcon name="search" color="#222" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-3 rounded-xl bg-accent-8`}
        onPress={() => useNavigate('CreatePostScreen')}>
        <FeatherIcon name="plus" color="#222" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('InspiredScreen')}>
        <FeatherIcon name="heart" color="#222" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('ProfileScreen')}>
        <Image
          style={tw`rounded-full w-[30px] h-[30px] bg-accent-2`}
          resizeMode="cover"
          source={{
            uri: `https://avatars.githubusercontent.com/u/107969452?v=4`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
