import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const styledComponents = {
  LayoutContainer: styled.View<ViewProps>`
    flex: 1;
    flex-direction: column;
    /*padding-top: ${Constants.statusBarHeight}px;*/
  `,
};
