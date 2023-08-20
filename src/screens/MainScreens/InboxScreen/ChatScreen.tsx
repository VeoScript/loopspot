import React, {useState} from 'react';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import ChatCard from '../../../components/molecules/Cards/ChatCard';
import FastImage from 'react-native-fast-image';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {userStore} from '../../../lib/stores/auth';
import {useBackHandler} from '../../../lib/hooks/useBackHandler';
import {useGoBack} from '../../../config/RootNavigation';
import {useRoute} from '@react-navigation/native';

import {useQuery, usePaginatedQuery, useMutation} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

const ChatScreen = (): JSX.Element => {
  const route: any = useRoute();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<string>('');

  const {userId} = userStore();
  const receiverId = route.params?.receiverId;
  const inboxId = route.params?.inboxId;

  const senderImage = useQuery(api.upload.profilePhoto, {userId: receiverId});
  const chatName = useQuery(api.auth.user, {userId: receiverId});
  const sendChatMutation = useMutation(api.messages.sendMessage);
  const deleteInboxMutation = useMutation(api.messages.deleteInbox);

  const {
    results: messages,
    isLoading: isLoadingMessages,
    loadMore,
  } = usePaginatedQuery(
    api.messages.messages,
    {
      inboxId: inboxId as string,
    },
    {
      initialNumItems: 15,
    },
  );

  useBackHandler(async () => {
    if (!isLoadingMessages && messages.length === 0) {
      await deleteInboxMutation({
        inboxId,
      });
      useGoBack();
    } else {
      useGoBack();
    }
  });

  const handleSendChat = async () => {
    setIsLoading(true);
    await sendChatMutation({
      chat,
      receiverId: receiverId as string,
      senderId: userId,
      inboxId,
    });
    setIsLoading(false);
    setChat('');
  };

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
    <View style={{transform: [{scaleY: -1}, {scaleX: -1}]}}>
      {isLoadingMessages ? (
        <LoadingDefault />
      ) : (
        <View
          style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
          <Text
            style={tw`default-text-color font-dosis-bold text-base text-neutral-500`}>
            Start your conversation...
          </Text>
        </View>
      )}
    </View>
  );

  const renderData = ({item}: any): JSX.Element => {
    const {chat, receiverId, senderId} = item;
    return <ChatCard chat={chat} senderId={senderId} />;
  };

  return (
    <DefaultLayout title="">
      <View
        style={tw`flex-row items-center justify-between w-full px-3 py-5 gap-x-10 bg-accent-3`}>
        <View style={tw`flex-1 flex-row items-center gap-x-5`}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => useGoBack()}>
            <FeatherIcon name="chevron-left" color="#222" size={25} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center gap-x-2`}>
            <FastImage
              style={tw`w-[2rem] h-[2rem] rounded-full bg-accent-8`}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: senderImage?.url as string,
                priority: FastImage.priority.normal,
              }}
            />
            <Text
              numberOfLines={1}
              style={tw`flex-1 default-text-color font-dosis-bold text-base`}>
              {chatName?.name ?? 'Loading...'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('Chat menu')}>
          <FeatherIcon name="more-vertical" color="#222" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        inverted
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listIsEmpty}
        data={!messages ? [] : messages}
        renderItem={renderData}
        keyExtractor={itemKeyExtractor}
        onEndReached={() => loadMore(5)}
        ListFooterComponent={
          isLoadingMessages && messages.length != 0 ? renderSpinner : null
        }
      />
      <View style={tw`flex-row items-center justify-center w-full px-5 py-1 bg-accent-8`}>
        <View
          style={tw`flex-row items-center justify-between w-full px-3 gap-x-3 rounded-full bg-accent-1`}>
          <TextInput
            multiline
            editable={!isLoading}
            style={tw`flex-1 default-text-color font-dosis text-base`}
            placeholder="Message..."
            placeholderTextColor="#CC8500"
            value={chat}
            onChangeText={(value: string) => setChat(value)}
          />
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            onPress={handleSendChat}>
            {isLoading ? (
              <ActivityIndicator color="#CC8500" size={25} />
            ) : (
              <FeatherIcon name="send" size={25} color="#CC8500" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default ChatScreen;
