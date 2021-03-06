// Package imports.
import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Component imports.
import { HeaderMode } from 'components/Header';
import { ContentCard } from '../../components/ContentCard';
import LoadingIcon from '../../components/LoadingIcon';

// Service imports.
import medicationAPI from '../../services/medication/api';

// Utility imports.
import { createErrorAlert } from '../../utils/errorPopups';
import {
  medicationScheduleDaysToText,
  medicationScheduleDosage,
  medicationScheduleTime,
} from '../../utils/medicationSchedule';

// Layout imports.
import MainLayout from '../../layouts/MainLayout';

// Style imports.
import { styledComponents, styles } from './styles';

// Type imports.
import { MedicationSchedule } from '../../typings/medication';

// Component declaration.
const MedicationAlarms = (): JSX.Element => {
  // Variables.
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [userAlarms, setUserAlarms] = useState<Array<MedicationSchedule>>([]);

  // Styled components.
  const {
    AlarmInformationRow,
    AlarmMedicationDosage,
    AlarmScheduleDays,
    AlarmScheduleTime,
    AlarmTitle,
    LargeText,
    MainContainer,
  } = styledComponents;

  // Callbacks.
  const errorAlert = createErrorAlert(navigation);

  // Functions.
  function renderMedicationAlarm(alarm : MedicationSchedule) : JSX.Element {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(
          'Medication', { medicationId: alarm.medicationId },
        )}
      >
        <ContentCard cardStyles={styles.userAlarm}>
          <AlarmTitle>{alarm.medicationData.name}</AlarmTitle>
          <AlarmScheduleDays>
            {medicationScheduleDaysToText(alarm)}
          </AlarmScheduleDays>
          <AlarmInformationRow>
            <AlarmScheduleTime>
              {medicationScheduleTime(alarm)}
            </AlarmScheduleTime>
            <AlarmMedicationDosage>
              {medicationScheduleDosage(alarm)}
            </AlarmMedicationDosage>
          </AlarmInformationRow>
        </ContentCard>
      </TouchableOpacity>
    );
  }

  // Page effects.
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      medicationAPI.getCurrentUserAlarms()
        .then((fetchedUserAlarms) => {
          setUserAlarms(fetchedUserAlarms);
        })
        .catch(() => errorAlert())
        .finally(() => setLoading(false));
    }, [errorAlert]),
  );

  // JSX returned.
  if (loading === true) return (<LoadingIcon />);

  return (
    <MainLayout
      disableScrollView
      headerConfig={{
        mode: HeaderMode.Title,
        title: { small: 'Meus', normal: 'Alarmes' },
      }}
    >
      <MainContainer>
        {userAlarms.length === 0
          ? (<LargeText>Nenhum alarme cadastrado!</LargeText>)
          : (
            <FlatList
              data={userAlarms}
              renderItem={({ item }) => renderMedicationAlarm(item)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatlistMenu}
            />
          )}
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationAlarms;
