import React from 'react';
import BootSplashScreen from '../../components/organisms/BootSplashScreen';
import DefaultLayout from '../../components/templates/DefaultLayout';
import {Image, FlatList, View, Text, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {userStore} from '../../lib/stores/auth';

import {useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

import {posts} from '../../shared/mock/feeds';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  const user = useQuery(api.auth.user, {userId});

  if (!user) return <BootSplashScreen />

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
    <DefaultLayout title="My Feed">
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listIsEmpty}
        data={posts}
        keyExtractor={itemKeyExtractor}
        renderItem={renderData}
      />
    </DefaultLayout>
  );
};

export default HomeScreen;
