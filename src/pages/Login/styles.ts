import { TextProps, ViewProps, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

import { Theme } from '../../constants';

export const styledComponents = {
  MainContainer: styled.View<ViewProps>`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `,

  Title: styled.Text<TextProps>`
    font-size: 26px;
    text-align: center;
    color: ${Theme.colors.primary};
    margin-bottom: 80px;
  `,

  ButtonText: styled.Text<TextProps>`
    color: white;
    font-family: 'Roboto_400Regular';
    font-size: 16px;
    text-transform: uppercase;
  `,

  SignUpButton: styled.TouchableOpacity<TouchableOpacityProps>`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 250px;
    min-height: 50px;
    max-height: 50px;
    background-color: ${Theme.colors.primary};
    border-radius: 5px;
    margin-top: 32px;
    margin-bottom: 24px;
  `,
};

// Styles.
export const styles = {
  icon: {
    color: Theme.colors.text,
  },
  textInput: {
    style: {
      backgroundColor: 'transparent',
      maxHeight: 56,
      width: 312,
    },
  },
};
