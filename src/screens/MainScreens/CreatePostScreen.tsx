import React from 'react';
import DefaultLayout from '../../components/templates/DefaultLayout';
import tw from '../../styles/tailwind';
import {View, Text} from 'react-native';

import {useBackHandler} from '../../lib/hooks/useBackHandler';
import {useNavigate} from '../../config/RootNavigation';

const CreatePostScreen = () => {
  useBackHandler(() => {
    useNavigate('HomeScreen');
  });

  return (
    <DefaultLayout>
      <View style={tw`flex-col items-center justify-center w-full h-full`}>
        <Text style={tw`default-text-color font-dosis text-xl`}>
          Create Post Screen
        </Text>
      </View>
    </DefaultLayout>
  );
};

export default CreatePostScreen;
