import React from 'react';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import BootSplashScreen from '../../../components/organisms/BootSplashScreen';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {Image, FlatList, View, Text, TouchableOpacity} from 'react-native';

import {useBackHandler} from '../../../lib/hooks/useBackHandler';
import {useNavigate} from '../../../config/RootNavigation';
import {userStore} from '../../../lib/stores/auth';

import {useQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

import {posts} from '../../../shared/mock/feeds';

const ProfileScreen = () => {
  const {userId} = userStore();

  const user = useQuery(api.auth.user, {userId});

  useBackHandler(() => {
    useNavigate('HomeScreen');
  });

  if (!user) return <BootSplashScreen />;

  const itemKeyExtractor = (item: any, index: {toString: () => any}) => {
    return index.toString();
  };

  const listIsEmpty = () => {
    return (
      <View
        style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
        <Text
          style={tw`uppercase default-text-color font-dosis-bold text-sm text-neutral-500`}>
          No post as of now...
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={tw`relative flex-row justify-start w-full h-[10rem]`}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`absolute z-10 right-3 top-3 p-2 rounded-full bg-black bg-opacity-50`}
            onPress={() => console.log('Change Cover Photo')}>
            <FeatherIcon name="camera" color="#FFFFFF" size={18} />
          </TouchableOpacity>
          <Image
            style={tw`w-full h-full bg-accent-8`}
            resizeMode="cover"
            source={{
              uri: `https://images.unsplash.com/photo-1523510468197-455cc987be86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`,
            }}
          />
          <View style={tw`absolute left-3 -bottom-8`}>
            <Image
              style={tw`w-[9rem] h-[9rem] rounded-full border-2 border-accent-3 bg-accent-8`}
              resizeMode="cover"
              source={{
                uri: `https://avatars.githubusercontent.com/u/107969452?v=4`,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`absolute z-10 right-3 bottom-1 p-2 rounded-full bg-black bg-opacity-50`}
              onPress={() => console.log('Change Profile Photo')}>
              <FeatherIcon name="camera" color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-col w-full mt-10`}>
          <View style={tw`flex-col w-full px-3`}>
            <Text style={tw`default-text-color font-dosis-bold text-xl`}>
              {user.name}
            </Text>
            <Text style={tw`default-text-color font-dosis text-sm`}>
              Your bio display here...
            </Text>
          </View>
          <View
            style={tw`flex-row items-center justify-between w-full px-3 py-3 border-b border-accent-8`}>
            <View style={tw`flex-row gap-x-2`}>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={tw`font-dosis text-sm text-accent-9`}>
                  <Text style={tw`font-dosis-bold`}>1k</Text> followers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={tw`font-dosis text-sm text-accent-9`}>
                  <Text style={tw`font-dosis-bold`}>105</Text> following
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`w-auto rounded-xl px-3 py-2 bg-accent-8`}>
              <Text style={tw`default-text-color text-xs`}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const renderData = (item: any) => {
    const {image, title, description, likes, comments} = item?.item;

    return (
      <TouchableOpacity activeOpacity={0.8} style={tw`flex-col w-full p-3 gap-y-3`}>
        <Image
          style={tw`w-full h-[15rem] rounded-3xl bg-accent-8`}
          resizeMode="cover"
          source={{
            uri: `${image}`,
          }}
        />
        <View style={tw`flex-col w-full px-3 gap-y-2`}>
          <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
            <Text style={tw`default-text-color font-dosis-bold text-base`}>{title}</Text>
            <View style={tw`flex-row items-center gap-x-2`}>
              <TouchableOpacity activeOpacity={0.5} style={tw`flex-row items-center gap-x-1`}>
                <FeatherIcon name="heart" color="#E39400" size={18} />
                <Text style={tw`font-dosis text-accent-9 text-sm`}>{likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={tw`flex-row items-center gap-x-1`}>
                <FeatherIcon name="message-circle" color="#E39400" size={18} />
                <Text style={tw`font-dosis text-accent-9 text-sm`}>{comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
            <Text style={tw`default-text-color font-dosis text-sm`}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DefaultLayout>
      <FlatList
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={listIsEmpty}
        ListHeaderComponent={renderHeader}
        data={posts}
        keyExtractor={itemKeyExtractor}
        renderItem={renderData}
      />
    </DefaultLayout>
  );
};

export default ProfileScreen;
