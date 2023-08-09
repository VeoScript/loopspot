import React from 'react';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {Image, View, TouchableOpacity} from 'react-native';

import {useNavigate} from '../../config/RootNavigation';
import {userStore} from '../../lib/stores/auth';

import {useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const BottomBar = (): JSX.Element => {
  const {userId} = userStore();
  const profile = useQuery(api.upload.profilePhoto, {userId});

  return (
    <View
      style={tw`relative flex-row items-center justify-around w-full border-t border-accent-8 bg-accent-3`}>
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
        {profile?.url ? (
          <Image
            style={tw`rounded-full w-[25px] h-[25px] bg-accent-8`}
            resizeMode="cover"
            source={{
              uri: `${profile?.url}`,
            }}
          />
        ) : (
          <View>
            <FeatherIcon name="user" color="#222" size={25} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
