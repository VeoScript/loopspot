import React from 'react';
import StatusBarMain from '../components/organisms/StatusBarMain';
import * as screen from '../shared/screens';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {useGuard} from '../lib/hooks/useGuard';

const Stack = createNativeStackNavigator();

const AppStacks = () => {
  const isAuth = useGuard();

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBarMain
        animated={false}
        backgroundColor="#FFE1A8"
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
        {!isAuth ? (
          <>
            <Stack.Screen name="LoginScreen" component={screen.LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={screen.RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={screen.HomeScreen} />
            <Stack.Screen name="NotificationScreen" component={screen.NotificationScreen} />
            <Stack.Screen name="SearchScreen" component={screen.SearchScreen} />
            <Stack.Screen name="InboxScreen" component={screen.InboxScreen} />
            <Stack.Screen name="ProfileScreen" component={screen.ProfileScreen} />
            <Stack.Screen name="CreatePostScreen" component={screen.CreatePostScreen} />
            <Stack.Screen name="ViewPostScreen" component={screen.ViewPostScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStacks;
