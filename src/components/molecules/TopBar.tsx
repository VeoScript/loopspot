import React from 'react';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {View, Text, TouchableOpacity} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useNavigate} from '../../config/RootNavigation';

const TopBar = () => {
  const {name} = useRoute();

  const renderCurrentRoute = (current: string) => {
    switch (current) {
      case 'HomeScreen':
        return 'My Feed';
      case 'NotificationScreen':
        return 'Notifications';
      case 'SearchScreen':
        return 'Search';
      case 'InspiredScreen':
        return 'Inspired Posts';
      case 'ProfileScreen':
        return 'My Profile';
      case 'CreatePostScreen':
        return 'Create Post';
      default:
        return 'Screen Name';
    }
  };

  return (
    <View
      style={tw`flex-row items-center justify-between w-full px-3 py-5 bg-accent-3`}>
      <View style={tw`flex-row items-center gap-x-3`}>
        <TouchableOpacity activeOpacity={0.5}>
          <FeatherIcon name="menu" color="#222" size={25} />
        </TouchableOpacity>
        <Text style={tw`default-text-color font-dosis-bold text-xl`}>
          {renderCurrentRoute(name)}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => useNavigate('NotificationScreen')}>
        <FeatherIcon name="bell" color="#222" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
