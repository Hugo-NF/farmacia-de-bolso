// Package imports.
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Service imports.
import MedicationApi from 'services/medication/api';

// Component imports.
import { ContentCard } from 'components/ContentCard';
import UseStatusText from 'components/UseStatusText';

// Layout imports.
import MainLayout from 'layouts/MainLayout';

// Type imports.
import { Medication } from 'typings/medication';

// Style imports.
import { styledComponents, styles } from './styles';

// Component declaration.
const MedicationIndex = (): JSX.Element => {
  const navigation = useNavigation();
  const [medications, setMedications] = useState< Medication[] | null >(null);
  useEffect(() => {
    MedicationApi.getCurrentUserMedications().then(setMedications);
  }, []);

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
        {medications !== null
          && medications.length
          ? (
            <FlatList
              data={medications}
              renderItem={({ item }) => renderMedication(item)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatlistMenu}
            />
          )
          : (
            <MessageText>Não há itens ainda</MessageText>
          )}
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationIndex;
