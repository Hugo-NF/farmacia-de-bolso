import { TextProps, ViewProps } from 'react-native';
import { TouchableOpacityProps } from 'react-native';

import styled from 'styled-components/native';

import { Theme } from '../../constants';

export const styledComponents = {
  ButtonText: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    font-family: 'Roboto_400Regular';
    font-size: 16px;
    text-transform: uppercase;
  `,

  MainContainer: styled.View<ViewProps>`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  SectionText: styled.Text<TextProps>`
    width: 90%;
    color: ${Theme.colors.accent};
    text-transform: uppercase;
    text-align: center;
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
  portalParagraph: {
    fontSize: 20,
  },
  textInput: {
    style: {
      backgroundColor: 'transparent',
      maxHeight: 56,
      width: 312,
    },
  },
};
