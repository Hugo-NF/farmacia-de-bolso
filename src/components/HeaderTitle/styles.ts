import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export const styledComponents = {
  SmallTitle: styled.Text<TextProps>`
    font-size: 26px;
    color: white;
  `,
  NormalTitle: styled.Text<TextProps>`
    font-size: 48px;
    color: white;
    font-weight: bold;
    line-height: 48px;
  `,
};
