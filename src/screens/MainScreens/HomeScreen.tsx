import React from 'react';
import DefaultLayout from '../../components/templates/DefaultLayout';
import {View, Text, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {userStore} from '../../lib/stores/auth';
import {useLogoutMutation} from '../../lib/functions/useAuth';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  return (
    <DefaultLayout>
      <View style={tw`flex-1 w-full p-3 gap-y-5`}>
        <Text>Home Screen</Text>
        <Text>{userId}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row items-center justify-center w-full p-3 rounded-xl bg-black`}
          onPress={() => useLogoutMutation()}>
          <Text style={tw`font-dosis text-sm text-white`}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
};

export default HomeScreen;
