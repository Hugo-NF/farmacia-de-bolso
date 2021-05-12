import React, { useState } from 'react';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import TextInputMask from 'react-native-text-input-mask';

import { RouteProp, useRoute } from '@react-navigation/native';

import { v4 as uuid } from 'uuid';

import CustomTextInput from 'components/CustomTextInput';
import MedicationSection from 'components/MedicationSection';
import { ContentCard } from 'components/ContentCard';
import { HeaderMode } from 'components/Header';

import MainLayout from 'layouts/MainLayout';

import { RoutesParams } from 'typings/routes';
import {
  Medication, MedicationHistory, MedicationSchedule, Schedule,
} from 'typings/medication';

import { medicationScheduleTime, medicationScheduleDaysToText, medicationScheduleDosage } from 'utils/medicationSchedule';

import { styledComponents, styles } from './styles';

const MedicationPage = (): JSX.Element => {
  // Styles desestructuring
  const {
    MainContainer,
    DescText,
    CardHour,
    CardDay,
    CardQuantity,
    CardRow,
    HistRow,
    HistText,
    ButtonTextWhite,
    ButtonTextBlack,
    GrayButton,
    GreenButton,
    RedButton,
    OrangeButton,
  } = styledComponents;

  // Page params
  const medicationId = useRoute<RouteProp<RoutesParams, 'Medication'>>().params?.medicationId;

  const [medication, setMedication] = useState<Medication>();

  const submitCallback = (formData: FormikValues): void => {
    const medicationData = {
      quantity: parseInt(formData.quantity, 10),
      ...formData,
    };
    console.log(medicationData);
    console.log(uuid());
  };

  const renderCard = (item: MedicationSchedule) : JSX.Element => (
    <ContentCard key={item.id} cardStyles={styles.ContentCard}>
      <CardRow>
        <CardHour>{medicationScheduleTime(item)}</CardHour>
        <CardQuantity>{medicationScheduleDosage(item)}</CardQuantity>
      </CardRow>
      <CardRow>
        <CardDay>{medicationScheduleDaysToText(item)}</CardDay>
      </CardRow>
      <CardRow>
        <RedButton>
          <ButtonTextWhite>Excluir</ButtonTextWhite>
        </RedButton>
        <OrangeButton>
          <ButtonTextWhite>Editar</ButtonTextWhite>
        </OrangeButton>
      </CardRow>
    </ContentCard>
  );

  const renderSchedule = (schedules: Array<Schedule>) : Array<JSX.Element> | JSX.Element => {
    if (schedules.length === 0 || medication === undefined) {
      return (
        <DescText>
          Você ainda não adicionou nenhum horário para este medicamento.
        </DescText>
      );
    }

    return schedules.map((schedule, index) => renderCard({
      id: uuid(),
      schedule,
      medicationData: medication.data,
    }));
  };

  const renderAlarms = (alarms: Array<Schedule>) : Array<JSX.Element> | JSX.Element => {
    if (alarms.length === 0 || medication === undefined) {
      return (
        <DescText>
          Você ainda não adicionou nenhum alarme. Adicione para não esquecer de tomar seu remédio.
        </DescText>
      );
    }

    return alarms.map((alarm, index) => renderCard({
      id: uuid(),
      schedule: alarm,
      medicationData: medication.data,
    }));
  };

  // Verificar com o André se existe algum "utils" pro histórico
  const renderHistoric = (medicationHistory: MedicationHistory) : Array<JSX.Element> | JSX.Element => (
    medicationHistory.history.map((entry) => (
      <HistRow key={uuid()}>
        <HistText style={{ textAlign: 'left' }}>
          {entry.datetime}
        </HistText>
        <HistText
          numberOfLines={1}
          style={{
            textAlign: 'right',
            color: entry.medicated ? '#219653' : '#EB5757',
          }}
        >
          {entry.medicated ? `Medicado - ${entry.quantity} ${medication?.data.unit}` : 'Não medicado'}
        </HistText>
      </HistRow>
    ))
  );

  return (
    <MainLayout
      headerConfig={{
        mode: HeaderMode.Custom,
      }}
    >
      <MainContainer>
        <Formik
          initialValues={{
            name: '',
            unit: '',
            quantity: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            unit: Yup.string().required('Unidade é obrigatória'),
            quantity: Yup.string().required(),
          })}
          onSubmit={submitCallback}
        >
          {(formikHelpers) => (
            <>
              <CustomTextInput
                fieldName="name"
                formikHelpers={formikHelpers}
                placeholder="Coloque aqui o nome do medicamento"
                value={formikHelpers.values.name}
                label="Nome"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="unit"
                formikHelpers={formikHelpers}
                placeholder="E.x.: Comprimido, mL, g, mg"
                value={formikHelpers.values.unit}
                label="Unidade de medida"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />

              <MedicationSection title="Horários">
                <GreenButton>
                  <ButtonTextWhite>Cadastrar novo horário</ButtonTextWhite>
                </GreenButton>
              </MedicationSection>

              <MedicationSection title="Alarmes">
                <GreenButton>
                  <ButtonTextWhite>Cadastrar novo alarme</ButtonTextWhite>
                </GreenButton>
              </MedicationSection>

              <MedicationSection title="Estoque">
                <CustomTextInput
                  fieldName="quantity"
                  formikHelpers={formikHelpers}
                  value={formikHelpers.values.quantity}
                  label="Quantidade"
                  mode="flat"
                  onBlur={() => formikHelpers.handleSubmit()}
                  render={(props: unknown) => (
                    <TextInputMask
                      {...props}
                      mask="[000000000000]"
                    />
                  )}
                  {...styles.textInput}
                />
                <DescText>
                  Mantenha atualizado seu estoque, assim podemos lhe dizer quando estiver perto de acabar.
                </DescText>
              </MedicationSection>

              <MedicationSection title="Histórico - Resumo">
                <DescText>
                  Aqui é um breve resumo, onde você poderá ver seu histórico parcial (última semana).
                  Poderá ver quando tomou esse medicamento, e quantos.
                </DescText>
                <GrayButton>
                  <ButtonTextBlack>Ver todo o histórico</ButtonTextBlack>
                </GrayButton>
              </MedicationSection>
            </>
          )}
        </Formik>
      </MainContainer>
    </MainLayout>
  );
};

export default MedicationPage;
