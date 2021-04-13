import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './pages/MainMenu';
import Login from './pages/Login';

const Stack = createStackNavigator();

const Routes = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu principal' }} />
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
  </Stack.Navigator>
);

export default Routes;
