// Package imports.
import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Theme imports.
import { Theme } from '../../constants';

// Styled components.
export const styledComponents = {
  LargeText: styled.Text<TextProps>`
    font-size: 32px;
    text-align: center;
  `,

  MainContainer: styled.View<ViewProps>`
    flex: 1;
    align-items: center;
    background-color: ${Theme.colors.background};
    justify-content: flex-start;
    padding-top: 10px;
  `,
};

export const styles = {

};
