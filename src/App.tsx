import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Text, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';
import styled from 'styled-components/native';

const MainContainer = styled.View < ViewProps > `
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

// Customizar tema posteriormente
const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: 'white',
    error: '#B00020',
    text: 'black',
    onSurface: '#000000',
  },
  animation: {
    scale: 1.0,
  },
};

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <MainContainer>
        <Text>Open up App.js to start working on your app!</Text>
        <Chip icon="heart" onPress={() => console.log('Pressed')}>Example Chip</Chip>
        <StatusBar style="auto" />
      </MainContainer>
    </PaperProvider>
  );
}
