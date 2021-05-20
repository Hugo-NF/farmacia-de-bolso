import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

// React native paper provider.
import { Provider as PaperProvider } from 'react-native-paper';

// React navigation.
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// Fonts.
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

// User modules.
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import { Theme } from './constants';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
