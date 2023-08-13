import React from 'react';
import Modal from 'react-native-modal';
import FollowerHolder from '../atoms/FollowerHolder';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import {menuModalStore} from '../../lib/stores/global';
import {useNavigate} from '../../config/RootNavigation';
import {userStore} from '../../lib/stores/auth';
import {useLogoutMutation} from '../../lib/functions/useAuth';

import {useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const MenuBar = (): JSX.Element => {
  const {userId} = userStore();
  const user = useQuery(api.auth.user, {userId});
  const profile = useQuery(api.upload.profilePhoto, {userId});

  const {isVisible, setIsVisible} = menuModalStore();

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={tw`w-[85%] m-0 bg-accent-3`}
      backdropOpacity={0.3}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}>
      <ScrollView style={tw`flex-grow-0`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 flex-col items-center w-full px-7 gap-y-20`}>
          <View style={tw`flex-col w-full gap-y-3`}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`flex-row items-center w-full gap-x-3`}
              onPress={() => {
                setIsVisible(false);
                useNavigate('ProfileScreen');
              }}>
              {profile?.url ? (
                <Image
                  style={tw`rounded-full w-[3rem] h-[3rem] bg-accent-8`}
                  resizeMode="cover"
                  source={{
                    uri: profile.url,
                  }}
                />
              ) : (
                <Image
                  style={tw`w-[3rem] h-[3rem] rounded-full border-2 bg-accent-8`}
                  resizeMode="cover"
                  source={require('../../assets/images/profile_placeholder.png')}
                />
              )}
              <View style={tw`flex-1 flex-col gap-y-1`}>
                <Text style={tw`default-text-color font-dosis-bold text-base`}>
                  {user?.name}
                </Text>
                {user?.username && (
                  <Text style={tw`default-text-color font-dosis text-sm`}>
                    {user?.username}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <FollowerHolder />
          </View>
          <View style={tw`flex-1 flex-col items-start w-full h-full gap-y-5`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center w-full py-3 gap-x-3`}
              onPress={() => {
                setIsVisible(false);
                useNavigate('HomeScreen');
              }}>
              <FeatherIcon name="home" color="#CC8500" size={20} />
              <Text style={tw`default-text-color font-dosis text-xl`}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center w-full py-3 gap-x-3`}
              onPress={() => {
                setIsVisible(false);
                useNavigate('ProfileScreen');
              }}>
              <FeatherIcon name="user" color="#CC8500" size={20} />
              <Text style={tw`default-text-color font-dosis text-xl`}>
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center w-full py-3 gap-x-3`}>
              <FeatherIcon name="settings" color="#CC8500" size={20} />
              <Text style={tw`default-text-color font-dosis text-xl`}>
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center w-full py-3 gap-x-3`}>
              <FeatherIcon name="info" color="#CC8500" size={20} />
              <Text style={tw`default-text-color font-dosis text-xl`}>
                About
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-start w-full gap-y-5`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center w-full py-3 gap-x-3`}
              onPress={() => {
                setIsVisible(false);
                useLogoutMutation();
              }}>
              <FeatherIcon name="log-out" color="#CC8500" size={20} />
              <Text style={tw`default-text-color font-dosis text-xl`}>
                Log out
              </Text>
            </TouchableOpacity>
            <View style={tw`flex-col w-full`}>
              <Text style={tw`font-dosis text-xs text-neutral-600`}>
                &copy; 2023, LoopSpot.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default MenuBar;
