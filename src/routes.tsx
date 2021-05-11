import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import MedicationAlarms from './pages/MedicationAlarms';
import Register from './pages/Register';

const Stack = createStackNavigator();

const Routes = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu principal' }} />
    <Stack.Screen name="MedicationAlarms" component={MedicationAlarms} options={{ title: 'Meus alarmes' }} />
    <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastro' }} />
  </Stack.Navigator>
);

export default Routes;
