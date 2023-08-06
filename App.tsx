import React from 'react';
import AppStacks from './src/config/AppStacks';

import {ConvexProvider, ConvexReactClient} from 'convex/react';
import 'react-native-get-random-values';
import {CONVEX_URL} from '@env';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <AppStacks />
    </ConvexProvider>
  );
};

export default App;
