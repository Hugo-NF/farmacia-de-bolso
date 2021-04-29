import React from 'react';
import { styledComponents } from './styles';

import HeaderHelpButton from '../HeaderHelpButton';

export interface IMedicineSectionProps {
  title: string,
  helpText?: string,
  children?: JSX.Element | Array<JSX.Element>;
}

const MedicineSection = ({
  title,
  children,
}: IMedicineSectionProps): JSX.Element => {
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

export default MedicineSection;

MedicineSection.defaultProps = {
  children: (<></>),
};
