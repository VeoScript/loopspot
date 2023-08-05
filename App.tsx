import React from 'react';
import StatusBarMain from './src/components/organisms/StatusBarMain';
import * as screen from './src/shared/screens';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/config/RootNavigation';

import {ConvexProvider, ConvexReactClient} from 'convex/react';
import 'react-native-get-random-values';
import {CONVEX_URL} from '@env';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer ref={navigationRef}>
        <StatusBarMain
          animated={false}
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'none'}}
        >
          <Stack.Screen name="LoginScreen" component={screen.LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={screen.RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={screen.HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
};

export default App;
