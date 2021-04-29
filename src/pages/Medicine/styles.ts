import {
  TextProps, ViewProps, ButtonProps, TouchableOpacityProps,
} from 'react-native';
import styled from 'styled-components/native';

import { Theme } from '../../constants';

const commonsButtonStyles = styled.TouchableOpacity<TouchableOpacityProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  max-height: 50px;
  border-radius: 5px;
  padding: 10px 10px;
`;

export const styledComponents = {
  MainContainer: styled.View<ViewProps>`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 40px 20px 60px 20px;
  `,

  DescText: styled.Text<TextProps>`
    font-size: 16px;
    margin-bottom: 15px;
  `,

  ButtonTextWhite: styled.Text<TextProps>`
    font-size: 17px;
    font-weight: bold;
    color: #ffffff;
  `,

  ButtonTextBlack: styled.Text<TextProps>`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
  `,

  GrayButton: styled(commonsButtonStyles)`
    background: #BDBDBD;
    margin-bottom: 10px;
  `,

  GreenButton: styled(commonsButtonStyles)`
    background-color: #27AE60;
    margin-bottom: 10px;
  `,

  RedButton: styled(commonsButtonStyles)`
    background-color: #EB5757;
  `,

  OrangeButton: styled(commonsButtonStyles)`
    background-color: #F2994A;
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
  ContentCard: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
};
