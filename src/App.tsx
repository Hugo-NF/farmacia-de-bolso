import React from 'react';
import AppLoading from 'expo-app-loading';

// React native paper provider
import { Provider as PaperProvider } from 'react-native-paper';

// React navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

import Routes from './routes';
import { theme } from './constants';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
