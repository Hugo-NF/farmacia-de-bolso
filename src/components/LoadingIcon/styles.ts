// Package imports.
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Style imports.
import { Theme } from '../../constants';

// Default props.
export const defaultProps = {
  activityIndicatorColor: Theme.colors.primary,

  loadingContainerStyles: {

  },
};

// Styled components.
export const styledComponents = {

  LoadingContainer: styled.View<ViewProps>`
    position: relative;
    margin-bottom: 40px;
    margin-top: 40px;
  `,

};
