import React from 'react';
import BootSplashScreen from '../../components/organisms/BootSplashScreen';
import DefaultLayout from '../../components/templates/DefaultLayout';
import {View, Text, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {userStore} from '../../lib/stores/auth';
import {useLogoutMutation} from '../../lib/functions/useAuth';

import {useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const HomeScreen = (): JSX.Element => {
  const {userId} = userStore();

  const user = useQuery(api.auth.user, {userId});

  if (!user) return <BootSplashScreen />

  return (
    <DefaultLayout>
      <View style={tw`flex-1 w-full p-3 gap-y-5`}>
        <Text>Home Screen</Text>
        <Text>{userId}</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
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
