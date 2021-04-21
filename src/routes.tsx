import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './pages/MainMenu';
import Login from './pages/Login';
import Register from './pages/Register';

const Stack = createStackNavigator();

const Routes = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName="MainMenu"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu principal' }} />
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastro' }} />
  </Stack.Navigator>
);

export default Routes;
