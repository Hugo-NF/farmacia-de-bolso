import React from 'react';
import { styledComponents } from './styles';

import HeaderHelpButton from '../HeaderHelpButton';

export interface IMedicationSectionProps {
  title: string,
  helpText?: string,
  children?: JSX.Element | Array<JSX.Element>;
}

const MedicationSection = ({
  title,
  children,
}: IMedicationSectionProps): JSX.Element => {
  const {
    Container,
    Header,
    HeaderContainer,
    Title,
  } = styledComponents;

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Title>{title}</Title>
          <HeaderHelpButton />
        </HeaderContainer>
      </Header>
      {children}
    </Container>
  );
};

export default MedicationSection;

MedicationSection.defaultProps = {
  children: (<></>),
};
