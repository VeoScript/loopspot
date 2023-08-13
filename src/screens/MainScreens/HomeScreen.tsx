import React from 'react';
import BootSplashScreen from '../../components/organisms/BootSplashScreen';
import LoadingDefault from '../../components/organisms/LoadingDisplay/LoadingDefault';
import DefaultLayout from '../../components/templates/DefaultLayout';
import PostCard from '../../components/molecules/Cards/PostCard';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';

import tw from '../../styles/tailwind';
import {userStore} from '../../lib/stores/auth';

import {useQuery, usePaginatedQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  const user = useQuery(api.auth.user, {userId});
  const {
    results: feeds,
    isLoading,
    loadMore,
  } = usePaginatedQuery(api.post.posts, {}, {initialNumItems: 5});

  if (!user) return <BootSplashScreen />;

  const itemKeyExtractor = (
    item: any,
    index: {toString: () => any},
  ): string => {
    return index.toString();
  };

  const renderSpinner = (): JSX.Element => {
    return <ActivityIndicator style={tw`pb-3`} color="#CC8500" size={40} />;
  };

  const listIsEmpty = (): JSX.Element => {
    return (
      <>
        {isLoading ? (
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
    const {_id, title, description, storageId} = item;
    return (
      <PostCard
        id={_id}
        title={title}
        description={description}
        storageId={storageId}
      />
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
        onEndReached={() => loadMore(5)}
        ListFooterComponent={
          isLoading && feeds.length != 0 ? renderSpinner : null
        }
      />
    </DefaultLayout>
  );
};

export default HomeScreen;
