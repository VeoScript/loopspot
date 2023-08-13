import React from 'react';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigate} from '../../config/RootNavigation';
import {menuModalStore} from '../../lib/stores/global';

interface TopBarProps {
  title: string | undefined;
}

type TopBarType = (props: TopBarProps) => JSX.Element;

const TopBar: TopBarType = ({title}): JSX.Element => {
  const {isVisible, setIsVisible} = menuModalStore();

  return (
    <View
      style={tw`flex-row items-center justify-between w-full px-3 py-5 bg-accent-3`}>
      <View style={tw`flex-row items-center gap-x-5`}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            isVisible ? setIsVisible(false) : setIsVisible(true)
          }>
          <FeatherIcon name="menu" color="#222" size={25} />
        </TouchableOpacity>
        <Text style={tw`default-text-color font-dosis-bold text-xl`}>
          {title}
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
