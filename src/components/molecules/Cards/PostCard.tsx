import React from 'react';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {TouchableOpacity, Image, View, Text} from 'react-native';

import {useNavigate} from '../../../config/RootNavigation';

export interface PostCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
}

type PostCardType = (props: PostCardProps) => JSX.Element;

const PostCard: PostCardType = ({id, url, title, description}): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`flex-col w-full p-3 gap-y-3`}
      onPress={() => useNavigate('ViewPostScreen', {id})}>
      <Image
        style={tw`w-full h-[15rem] rounded-3xl bg-accent-8`}
        resizeMode="cover"
        source={{
          uri: `${url}`,
        }}
      />
      <View style={tw`flex-col w-full px-3 gap-y-2`}>
        <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
          <Text style={tw`default-text-color font-dosis-bold text-base`}>
            {title}
          </Text>
          <View style={tw`flex-row items-center gap-x-2`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center gap-x-1`}>
              <FeatherIcon name="heart" color="#E39400" size={18} />
              <Text style={tw`font-dosis text-accent-9 text-sm`}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center gap-x-1`}>
              <FeatherIcon name="message-circle" color="#E39400" size={18} />
              <Text style={tw`font-dosis text-accent-9 text-sm`}>0</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
