import { TextProps, ViewProps, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

import { Theme } from '../../constants';

export const styledComponents = {
  MainContainer: styled.View<ViewProps>`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 0 20px 60px 20px;
  `,

  DescText: styled.Text<TextProps>`
    font-size: 16px;
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
      width: '100%',
    },
  },
};
