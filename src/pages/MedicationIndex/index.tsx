// Package imports.
import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Service imports.
import MedicationApi from 'services/medication/api';

// Component imports.
import { ContentCard } from 'components/ContentCard';
import UseStatusText from 'components/UseStatusText';
import LoadingIcon from 'components/LoadingIcon';

// Layout imports.
import MainLayout from 'layouts/MainLayout';

// Type imports.
import { Medication } from 'typings/medication';

// Style imports.
import { Theme } from 'constants/index';
import { createErrorAlert } from 'utils/errorPopups';
import { styledComponents, styles } from './styles';

// Component declaration.
const MedicationIndex = (): JSX.Element => {
  const navigation = useNavigation();
  const [medications, setMedications] = useState< Medication[] | null >(null);

  const errorAlert = createErrorAlert(navigation);
  useFocusEffect(
    useCallback(() => {
      MedicationApi.getCurrentUserMedications()
        .then(setMedications)
        .catch(() => errorAlert());
    }, [errorAlert]),
  );

  // Styled components.
  const {
    MainContainer, MedicationName, AddButtonText, MessageText,
  } = styledComponents;

  // Functions.
  function renderMedication(medication: Medication): JSX.Element {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Medication', { medicationId: medication.id })}
      >
        <ContentCard cardStyles={styles.medication}>
          <MedicationName>{medication.data.name}</MedicationName>
          <UseStatusText schedules={medication.alarms} />
        </ContentCard>
      </TouchableOpacity>
    );
  }

  // JSX returned.
  return (
    <MainLayout disableScrollView headerConfig={{ title: { small: 'Meus', normal: 'Medicamentos' } }}>
      <MainContainer>

        <TouchableOpacity onPress={() => navigation.navigate('Medication')}>
          <AddButtonText>Adicionar novo</AddButtonText>
        </TouchableOpacity>

        {/* Loading */}
        {medications === null && (
          <LoadingIcon activityIndicatorColor={Theme.colors.primary} />
        )}

        {/* Loaded and there are no items */}
        {medications !== null && !medications.length && (
          <MessageText>Não há itens ainda</MessageText>
        )}

        {/* Loaded and there are items */}
        {medications !== null && medications.length && (
          <FlatList
            data={medications}
            renderItem={({ item }) => renderMedication(item)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatlistMenu}
          />
        )}

      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationIndex;
