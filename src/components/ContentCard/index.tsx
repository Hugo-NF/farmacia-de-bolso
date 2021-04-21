// Package imports.
import React from 'react';

// Style imports.
import { styledComponents } from './styles';

// Interface declaration.
interface IContentCard {
  cardStyles?: Record<string, unknown>,
  children?: Array<JSX.Element>,
}

// Component.
export const ContentCard = (
  { cardStyles, children } : IContentCard,
) : JSX.Element => {
  // Styled components.
  const {
    CardContainer,
  } = styledComponents;

  // JSX returned.
  return (
    <CardContainer style={cardStyles}>
      {children}
    </CardContainer>
  );
};

// Default props.
ContentCard.defaultProps = {
  cardStyles: {},
  children: (<></>),
};
