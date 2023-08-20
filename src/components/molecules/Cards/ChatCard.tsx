import React from 'react';
import tw from '../../../styles/tailwind';
import {View, Text} from 'react-native';

import {userStore} from '../../../lib/stores/auth';

interface ChatCardProps {
  chat: string;
  senderId: string;
}

type ChatCardType = (props: ChatCardProps) => JSX.Element;

const ChatCard: ChatCardType = ({chat, senderId}): JSX.Element => {
  const {userId} = userStore();

  return (
    <View
      style={tw.style(
        'flex-row items-start w-auto px-2 py-1',
        userId === senderId ? 'justify-end' : 'justify-start',
      )}>
      <View
        style={tw.style(
          'items-end gap-x-3',
          userId === senderId ? 'flex-row-reverse' : 'flex-row',
        )}>
        <View style={tw.style('px-3 py-2 rounded-xl w-auto', userId === senderId ? 'bg-accent-8' : 'bg-accent-9')}>
          <Text
            style={tw.style('default-text-color font-dosis text-base', userId === senderId ? 'text-accent-2' : 'text-accent-1')}>
            {chat}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatCard;
