import React from 'react';

// React native paper provider
import { Provider as PaperProvider } from 'react-native-paper';

// React navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import { theme } from './constants';

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
