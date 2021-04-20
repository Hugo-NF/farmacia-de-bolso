import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Chip } from 'react-native-paper';

import { MainContainer } from './styles';

const MainMenu = (): JSX.Element => (
  <MainContainer>
    <Text>Menu</Text>
    <Chip icon="heart-broken" onPress={() => console.log('Pressed')}>Mó kao a outra tela</Chip>
    <StatusBar style="auto" />
  </MainContainer>
);

export default MainMenu;
