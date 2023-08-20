import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {userStore} from '../../../lib/stores/auth';
import {useNavigate} from '../../../config/RootNavigation';

import {useMutation, useQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

interface InboxCardProps {
  last_chat: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
  inboxId: string;
}

type InboxCardType = (props: InboxCardProps) => JSX.Element;

const InboxCard: InboxCardType = ({
  last_chat,
  receiverId,
  senderId,
  inboxId,
}): JSX.Element => {
  const {userId} = userStore();

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const getInboxUserId = userId === receiverId ? senderId : receiverId;

  const avatar = useQuery(api.upload.profilePhoto, {userId: getInboxUserId});
  const chatName = useQuery(api.auth.user, {userId: getInboxUserId});
  const deleteInbox = useMutation(api.messages.deleteInbox);

  const handleDeleteInbox = async () => {
    setIsDeleteLoading(true);
    await deleteInbox({
      inboxId: inboxId as any,
    });
    setIsDeleteLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={tw`flex-1 flex-row items-center justify-between w-full p-3 gap-x-1`}
      onPress={() =>
        useNavigate('ChatScreen', {
          inboxId: inboxId,
          receiverId: chatName?._id,
        })
      }>
      <View style={tw`flex-1 flex-row items-center gap-x-3`}>
        <FastImage
          style={tw`w-[3rem] h-[3rem] rounded-full bg-accent-8`}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: avatar?.url as string,
            priority: FastImage.priority.normal,
          }}
        />
        <View style={tw`flex-1 flex-col items-start`}>
          <Text
            style={tw`default-text-color font-dosis-bold text-base text-accent-2`}>
            {chatName?.name ?? ''}
          </Text>
          <Text
            numberOfLines={1}
            style={tw`default-text-color font-dosis text-sm text-accent-2`}>
            {last_chat}
          </Text>
        </View>
      </View>
      {isDeleteLoading ? (
        <ActivityIndicator color="#CC8500" size={18} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Alert.alert(
              '',
              'Are you sure you want to delete this conversation?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: handleDeleteInbox,
                },
              ],
              {
                cancelable: true,
              },
            );
          }}>
          <FeatherIcon name="trash-2" size={18} color="#CC8500" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default InboxCard;
