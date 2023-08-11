import React from 'react';
import BootSplashScreen from '../../components/organisms/BootSplashScreen';
import LoadingDefault from '../../components/organisms/LoadingDisplay/LoadingDefault';
import DefaultLayout from '../../components/templates/DefaultLayout';
import PostCard from '../../components/molecules/Cards/PostCard';
import {FlatList, View, Text} from 'react-native';

import tw from '../../styles/tailwind';
import {userStore} from '../../lib/stores/auth';

import {useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  const user = useQuery(api.auth.user, {userId});
  const feeds = useQuery(api.post.posts);

  if (!user) return <BootSplashScreen />;

  const itemKeyExtractor = (item: any, index: {toString: () => any}) => {
    return index.toString();
  };

  const listIsEmpty = (): JSX.Element => {
    return (
      <>
        {!feeds ? (
          <LoadingDefault />
        ) : (
          <View
            style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
            <Text
              style={tw`uppercase default-text-color font-dosis-bold text-sm text-neutral-500`}>
              No post as of now...
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderData = ({item}: any): JSX.Element => {
    const {_id, url, title, description} = item;
    return (
      <PostCard id={_id} url={url} title={title} description={description} />
    );
  };

  return (
    <DefaultLayout title="My Feed">
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listIsEmpty}
        data={!feeds ? [] : feeds}
        keyExtractor={itemKeyExtractor}
        renderItem={renderData}
      />
    </DefaultLayout>
  );
};

export default HomeScreen;
