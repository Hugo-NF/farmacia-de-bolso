// Component to implement a loading icon.

// Package imports.
import React from 'react';
import { ActivityIndicator } from 'react-native';

// Style imports.
import { defaultProps, styledComponents } from './styles';

// Interface declaration.
interface ILoadingIcon {
  activityIndicatorColor?: string,
  loadingContainerStyles?: Record<string, unknown>,
}

// Component implementation.
const LoadingIcon = ({
  activityIndicatorColor,
  loadingContainerStyles,
}: ILoadingIcon) : JSX.Element => {
  // Styled components.
  const {
    LoadingContainer,
  } = styledComponents;

  // JSX returned.
  return (
    <LoadingContainer style={{ ...loadingContainerStyles }}>
      <ActivityIndicator size="large" color={activityIndicatorColor} />
    </LoadingContainer>
  );
};

// Default props.
LoadingIcon.defaultProps = defaultProps;

// Export default.
export default LoadingIcon;
