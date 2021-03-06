// Package imports.
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import theme from 'constants/theme';

// Styled components.
export const styledComponents = {

  HeaderBackground: styled.View<ViewProps>`
    background-color: ${theme.colors.primary};
    border-radius: 9999px;
    position: absolute;
    left: -140px;
    top: -425px;
    width: 688px;
    aspect-ratio: 1;
  `,
  Container: styled.View<ViewProps>`
    width: 100%;
    min-height: 273px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
  `,

};
