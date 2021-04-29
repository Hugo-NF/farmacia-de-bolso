// Package imports.
import { ViewProps, TextProps } from 'react-native';
import styled from 'styled-components/native';

// Styled components.
export const styledComponents = {
  Container: styled.View<ViewProps>`
    width: 100%;
    margin-top: 80px;
    align-items: baseline;
  `,

  Header: styled.View<ViewProps>`
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom-width: 2px;
  `,

  HeaderContainer: styled.View<ViewProps>`
    width: 100%;
  `,

  Title: styled.Text<TextProps>`
    font-size: 22px;
    color: #000000;
  `,
};
