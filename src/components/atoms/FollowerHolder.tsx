import React from 'react';
import tw from '../../styles/tailwind';
import {View, Text, TouchableOpacity} from 'react-native';

const FollowerHolder = () => {
  return (
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
  );
};

export default FollowerHolder;
