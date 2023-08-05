import React from 'react';
import DefaultLayout from '../../components/templates/DefaultLayout';
import {View, Text} from 'react-native';

import {userStore} from '../../lib/stores/auth';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  return (
    <DefaultLayout>
      <View>
        <Text>Home Screen</Text>
        <Text>{userId}</Text>
      </View>
    </DefaultLayout>
  );
};

export default HomeScreen;
