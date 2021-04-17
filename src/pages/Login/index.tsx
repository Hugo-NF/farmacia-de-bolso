import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Chip } from 'react-native-paper';

import { MainContainer } from './styles';

const Login = (): JSX.Element => (
  <MainContainer>
    <Text>Login!</Text>
    <Chip icon="heart">Amo todos vocês</Chip>
    <StatusBar style="auto" />
  </MainContainer>
);

export default Login;
