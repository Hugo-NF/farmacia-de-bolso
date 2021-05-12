// Package imports.
import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Component imports.
import { ContentCard } from '../../components/ContentCard';
import LoadingIcon from '../../components/LoadingIcon';

// Utility imports.
import { createErrorAlert } from '../../utils/errorPopups';
import {
  measurementUnitPluralForm,
  measurementUnitSingularForm,
} from '../../utils/measurementUnits';

// Service imports.
import medicationAPI from '../../services/medication/api';

// Layout imports.
import MainLayout from '../../layouts/MainLayout';

// Style imports.
import { styledComponents, styles } from './styles';

// Type imports.
import { Medication } from '../../typings/medication';

// Component declaration.
const MedicationStock = (): JSX.Element => {
  // Variables.
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [userMedications, setUserMedications] = useState<Array<Medication>>([]);

  // Styled components.
  const {
    LargeText,
    MainContainer,
    StockItemAmountText,
    StockItemInformationRow,
    StockItemTitle,
  } = styledComponents;

  // Callbacks.
  const errorAlert = createErrorAlert(navigation);

  // Functions.
  function renderMedicationStock(medication : Medication) : JSX.Element {
    function renderStockItemInformation() : JSX.Element {
      const medicationUnitPluralForm = measurementUnitPluralForm(
        medication.data.unit,
      );
      const medicationUnitSingularForm = measurementUnitSingularForm(
        medication.data.unit,
      );

      if (medication.stock === 0) {
        return (
          <StockItemInformationRow>
            <StockItemAmountText style={styles.errorText}>
              {medication.stock} {medicationUnitPluralForm}
            </StockItemAmountText>
            <MaterialIcons
              name="error"
              size={styles.errorIcon.size}
              color={styles.errorIcon.color}
            />
          </StockItemInformationRow>
        );
      }

      if (medication.stock <= 3) {
        return (
          <StockItemInformationRow>
            <StockItemAmountText style={styles.warningText}>
              {medication.stock} {
                medication.stock === 1
                  ? medicationUnitSingularForm
                  : medicationUnitPluralForm
              }
            </StockItemAmountText>
            <MaterialIcons
              name="warning"
              size={styles.warningIcon.size}
              color={styles.warningIcon.color}
            />
          </StockItemInformationRow>
        );
      }

      return (
        <StockItemInformationRow>
          <StockItemAmountText>
            {medication.stock} {medicationUnitPluralForm}
          </StockItemAmountText>
        </StockItemInformationRow>
      );
    }

    return (
      <TouchableOpacity>
        <ContentCard cardStyles={styles.stockItem}>
          <StockItemTitle>{medication.data.name}</StockItemTitle>
          {renderStockItemInformation()}
        </ContentCard>
      </TouchableOpacity>
    );
  }

  // Page effects.
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      medicationAPI.getCurrentUserMedications()
        .then((fetchedUserMedications) => {
          setUserMedications(fetchedUserMedications);
        })
        .catch(() => errorAlert())
        .finally(() => setLoading(false));
    }, [errorAlert]),
  );

  // JSX returned.
  if (loading === true) return (<LoadingIcon />);

  return (
    <MainLayout disableScrollView>
      <MainContainer>
        {userMedications.length === 0
          ? (<LargeText>Nenhum medicamento cadastrado!</LargeText>)
          : (
            <FlatList
              data={userMedications}
              renderItem={({ item }) => renderMedicationStock(item)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatlistMenu}
            />
          )}
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationStock;
