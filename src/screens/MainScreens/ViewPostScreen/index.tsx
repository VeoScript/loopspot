import React from 'react';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import tw from '../../../styles/tailwind';
import {View, Text} from 'react-native';

import {useRoute} from '@react-navigation/native';

const ViewPostScreen = () => {
  const route: any = useRoute();

  return (
    <DefaultLayout title="This is Post">
      <View>
        <Text style={tw`default-text-color`}>{route.params?.id}</Text>
      </View>
    </DefaultLayout>
  );
};

export default ViewPostScreen;
