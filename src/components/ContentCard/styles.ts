// Package imports.
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Styled components.
export const styledComponents = {

  CardContainer: styled.View<ViewProps>`
    background-color: white;
    border-radius: 6px;
    height: 124px;
    margin: 12px 18px;
    padding: 12px;
    width: 324px;

    /* Shadow properties for Android and IOS. */
    elevation: 6;
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: 2px 2px;
    shadow-radius: 6px;
  `,

};
