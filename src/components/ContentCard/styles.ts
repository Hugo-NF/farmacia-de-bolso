// Package imports.
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Styled components.
export const styledComponents = {

  CardContainer: styled.View<ViewProps>`
    backgroundColor: #fff;
    borderRadius: 6px;
    height: 124px;
    margin: 12px 18px;
    padding: 12px;
    width: 324px;

    /* Shadow properties for Android and IOS. */
    elevation: 6;
    shadowColor: rgba(0, 0, 0, 0.25);
    shadowOffset: 2px 2px;
    shadowRadius: 6px;
  `,

};
