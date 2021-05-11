// Package imports.
import React from 'react';

// Layout imports.
import MainLayout from '../../layouts/MainLayout';

// Style imports.
import { styledComponents } from './styles';

// Component declaration.
const MedicationAlarms = (): JSX.Element => {
  // Styled components.
  const {
    LargeText,
    MainContainer,
  } = styledComponents;

  return (
    <MainLayout disableScrollView>
      <MainContainer>
        <LargeText>Placeholder de meus alarmes!</LargeText>
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationAlarms;
