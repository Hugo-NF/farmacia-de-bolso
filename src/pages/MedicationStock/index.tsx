// Package imports.
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Component imports.
import { ContentCard } from '../../components/ContentCard';

// Utility imports.
import {
  measurementUnitPluralForm,
  measurementUnitSingularForm,
} from '../../utils/measurementUnits';

// Layout imports.
import MainLayout from '../../layouts/MainLayout';

// Style imports.
import { styledComponents, styles } from './styles';

// Type imports.
import { Medication } from '../../typings/medication';

// Component declaration.
const MedicationStock = (): JSX.Element => {
  // Styled components.
  const {
    MainContainer,
    StockItemAmountText,
    StockItemInformationRow,
    StockItemTitle,
  } = styledComponents;

  // Functions.
  function medicationStockMock() : Array<Medication> {
    return [
      {
        alarms: [],
        data: {
          name: 'Cloridrato de metaformina - 500mg - Ação prolongada',
          unit: 'comprimido',
        },
        history: [],
        schedule: [],
        stock: 10,
      },
      {
        alarms: [],
        data: {
          name: 'Atenolol 25mg',
          unit: 'comprimidos',
        },
        history: [],
        schedule: [],
        stock: 0,
      },
      {
        alarms: [],
        data: {
          name: 'Acetato de medroxiprogesterona',
          unit: 'ampola',
        },
        history: [],
        schedule: [],
        stock: 2,
      },
      {
        alarms: [],
        data: {
          name: 'Geriol 500mg',
          unit: 'comprimidos',
        },
        history: [],
        schedule: [],
        stock: 26,
      },
      {
        alarms: [],
        data: {
          name: 'Losartánica Potássica 50mg',
          unit: 'comprimidos',
        },
        history: [],
        schedule: [],
        stock: 1,
      },
    ];
  }

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

  // JSX returned.
  return (
    <MainLayout disableScrollView>
      <MainContainer>
        <FlatList
          data={medicationStockMock()}
          renderItem={({ item }) => renderMedicationStock(item)}
          keyExtractor={(item) => item.data.name}
          contentContainerStyle={styles.flatlistMenu}
        />
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MedicationStock;
