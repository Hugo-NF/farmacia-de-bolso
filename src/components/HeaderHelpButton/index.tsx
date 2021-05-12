import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleSheet } from './styles';

const HeaderHelpButton = (): JSX.Element => (
  <TouchableOpacity containerStyle={styleSheet.positioning} style={styleSheet.button}>
    <Text style={styleSheet.text}>?</Text>
  </TouchableOpacity>
);

export default HeaderHelpButton;
