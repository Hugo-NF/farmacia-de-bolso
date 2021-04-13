import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, ViewProps } from 'react-native';
import styled from 'styled-components/native';

const MainContainer = styled.View < ViewProps > `
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default function App(): JSX.Element {
  return (
    <MainContainer>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </MainContainer>
  );
}
