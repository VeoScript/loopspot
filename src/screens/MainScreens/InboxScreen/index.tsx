import React from 'react';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import InboxCard from '../../../components/molecules/Cards/InboxCard';
import tw from '../../../styles/tailwind';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {userStore} from '../../../lib/stores/auth';
import {useBackHandler} from '../../../lib/hooks/useBackHandler';
import {useNavigate} from '../../../config/RootNavigation';

import {usePaginatedQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

const InboxScreen = (): JSX.Element => {
  const {userId} = userStore();

  const {
    results: inboxes,
    isLoading: isLoadingInboxes,
    loadMore,
  } = usePaginatedQuery(
    api.messages.inboxes,
    {
      userId,
    },
    {
      initialNumItems: 10,
    },
  );

  useBackHandler(() => {
    useNavigate('HomeScreen');
  });

  const itemKeyExtractor = (
    item: any,
    index: {toString: () => any},
  ): string => {
    return index.toString();
  };

  const renderSpinner: JSX.Element = (
    <ActivityIndicator style={tw`pb-3`} color="#CC8500" size={40} />
  );

  const listIsEmpty: JSX.Element = (
    <>
      {isLoadingInboxes ? (
        <LoadingDefault />
      ) : (
        <View
          style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
          <Text
            style={tw`uppercase default-text-color font-dosis-bold text-sm text-neutral-500`}>
            You inbox is empty...
          </Text>
        </View>
      )}
    </>
  );

  const renderData = ({item}: any): JSX.Element => {
    const {_id, last_chat, receiverId, senderId, _creationTime} = item;
    return (
      <InboxCard
        last_chat={last_chat}
        receiverId={receiverId}
        senderId={senderId}
        createdAt={_creationTime}
        inboxId={_id}
      />
    );
  };

  return (
    <DefaultLayout title="Messages">
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listIsEmpty}
        data={!inboxes ? [] : inboxes}
        keyExtractor={itemKeyExtractor}
        renderItem={renderData}
        onEndReached={() => loadMore(5)}
        ListFooterComponent={
          isLoadingInboxes && inboxes.length != 0 ? renderSpinner : null
        }
      />
    </DefaultLayout>
  );
};

export default InboxScreen;
