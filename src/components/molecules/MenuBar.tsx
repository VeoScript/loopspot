import React from 'react';
import Modal from 'react-native-modal';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {View, Text, TouchableOpacity} from 'react-native';

import {menuModalStore} from '../../lib/stores/global';
import {useNavigate} from '../../config/RootNavigation';
import {useLogoutMutation} from '../../lib/functions/useAuth';

const MenuBar = (): JSX.Element => {
  const {isVisible, setIsVisible} = menuModalStore();

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={tw`w-3/4 m-0`}
      backdropOpacity={0.3}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}>
      <View style={tw`flex-col items-center w-full h-full bg-accent-3`}>
        <View
          style={tw`flex-row items-center justify-between w-full p-3 border-b border-accent-8`}>
          <Text style={tw`default-text-color font-dosis-bold text-xl`}>
            Menu
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsVisible(false)}>
            <FeatherIcon name="x" color="#222" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 border-b border-accent-8`}
          onPress={() => {
            setIsVisible(false);
            useNavigate('HomeScreen');
          }}>
          <Text style={tw`default-text-color font-dosis text-sm`}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 border-b border-accent-8`}
          onPress={() => {
            setIsVisible(false);
            useNavigate('ProfileScreen');
          }}>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            My Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 border-b border-accent-8`}>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 border-b border-accent-8`}>
          <Text style={tw`default-text-color font-dosis text-sm`}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 border-b border-accent-8`}>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row w-full p-3 bg-red-500`}
          onPress={() => {
            setIsVisible(false);
            useLogoutMutation();
          }}>
          <Text style={tw`font-dosis text-sm text-white`}>Log out</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MenuBar;
