import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './pages/MainMenu';
import Login from './pages/Login';
import Register from './pages/Register';
import Medication from './pages/Medication';

const Stack = createStackNavigator();

const Routes = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName="Medication"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu principal' }} />
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastro' }} />
    <Stack.Screen name="Medication" component={Medication} options={{ title: 'Medicamentos' }} />
  </Stack.Navigator>
);

export default Routes;
