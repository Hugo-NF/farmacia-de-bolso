import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import TextInputMask from 'react-native-text-input-mask';
import { format } from 'date-fns';

import {
  RouteProp, useRoute, useFocusEffect, useNavigation,
} from '@react-navigation/native';

import { v4 as uuid } from 'uuid';

import CustomTextInput from 'components/CustomTextInput';
import CreateScheduleDialog from 'components/CreateScheduleDialog';
import MedicationSection from 'components/MedicationSection';
import { ContentCard } from 'components/ContentCard';
import { HeaderMode } from 'components/Header';
import LoadingIcon from 'components/LoadingIcon';

import MainLayout from 'layouts/MainLayout';

import { RoutesParams } from 'typings/routes';

import medicationAPI from 'services/medication/api';

import {
  Medication,
  MedicationHistory,
  MedicationSchedule,
  Schedule,
} from 'typings/medication';

import { medicationScheduleTime, medicationScheduleDaysToText, medicationScheduleDosage } from 'utils/medicationSchedule';
import { createErrorAlert } from '../../utils/errorPopups';

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
  const [medicationId, setMedicationId] = useState<string>(useRoute<RouteProp<RoutesParams, 'Medication'>>().params?.medicationId);
  const [medication, setMedication] = useState<Medication>({
    alarms: [],
    schedule: [],
    id: '',
    data: {
      name: '',
      unit: '',
    },
    stock: 0,
  });
  const [medicationHistory, setMedicationHistory] = useState<MedicationHistory>();

  const [scheduleVisible, setScheduleVisible] = useState<boolean>(false);
  const [alarmVisible, setAlarmVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const errorAlert = createErrorAlert(navigation);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      if (medicationId !== undefined && medicationId !== null) {
        medicationAPI.getMedication(medicationId)
          .then((medicationResult) => {
            setMedication(medicationResult);
            return medicationAPI.getMedicationHistory(medicationResult.id);
          })
          .then((medicationHistoryResult) => setMedicationHistory(medicationHistoryResult))
          .catch((error) => errorAlert())
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, []),
  );

  const submitCallback = (formData: FormikValues): void => {
    if (medicationId === undefined || medicationId === null) {
      medicationAPI.createMedication({
        alarms: medication.alarms,
        schedule: medication.schedule,
        data: {
          name: formData.name,
          unit: formData.unit,
        },
        stock: parseInt(formData.quantity, 10),
      }).then((medicationUID) => {
        setMedicationId(medicationUID);
        Alert.alert('Concluído', `${formData.name} adicionado com sucesso`);
      });
    } else {
      medicationAPI.updateMedication(medicationId, {
        alarms: medication.alarms,
        schedule: medication.schedule,
        data: {
          name: formData.name,
          unit: formData.unit,
        },
        stock: parseInt(formData.quantity, 10),
      }).then(() => Alert.alert('Concluído', `Dados do medicamento ${formData.name} atualizados`));
    }
  };

  const renderCard = (item: MedicationSchedule, isAlarm: boolean) : JSX.Element => (
    <ContentCard key={item.id} cardStyles={styles.ContentCard}>
      <CardRow>
        <CardHour>{medicationScheduleTime(item)}</CardHour>
        <CardQuantity>{medicationScheduleDosage(item)}</CardQuantity>
      </CardRow>
      <CardRow>
        <CardDay>{medicationScheduleDaysToText(item)}</CardDay>
      </CardRow>
      <CardRow>
        <RedButton
          onPress={() => {
            if (isAlarm) {
              const removableIndex = medication.alarms.findIndex((alarm) => alarm === item.schedule);
              if (removableIndex !== -1) {
                medication.alarms.splice(removableIndex, 1);
                const newMedication = {
                  ...medication,
                  alarms: [...medication.alarms],
                };
                setMedication(newMedication);
                medicationAPI.updateMedication(medication.id, newMedication)
                  .then(() => Alert.alert('Concluído', 'Alarme deletado com sucesso'));
              }
            } else {
              const removableIndex = medication.schedule.findIndex((schedule) => schedule === item.schedule);
              if (removableIndex !== -1) {
                medication.schedule.splice(removableIndex, 1);
                const newMedication = {
                  ...medication,
                  schedule: [...medication.schedule],
                };
                setMedication(newMedication);
                medicationAPI.updateMedication(medication.id, newMedication)
                  .then(() => Alert.alert('Concluído', 'Horário deletado com sucesso'));
              }
            }
          }}
        >
          <ButtonTextWhite>Excluir</ButtonTextWhite>
        </RedButton>
        {/* <OrangeButton>
          <ButtonTextWhite>Editar</ButtonTextWhite>
        </OrangeButton> */}
      </CardRow>
    </ContentCard>
  );

  const renderSchedule = (schedules: Array<Schedule>): Array<JSX.Element> | JSX.Element => {
    if (schedules.length === 0 || medication === undefined) {
      return (
        <DescText>
          Você ainda não adicionou nenhum horário para este medicamento.
        </DescText>
      );
    }

    return schedules.map((schedule) => renderCard({
      id: uuid(),
      medicationId: medication.id,
      schedule,
      medicationData: medication.data,
    }, false));
  };

  const renderAlarms = (alarms: Array<Schedule>) : Array<JSX.Element> | JSX.Element => {
    if (alarms.length === 0 || medication === undefined) {
      return (
        <DescText>
          Você ainda não adicionou nenhum alarme. Adicione para não esquecer de tomar seu remédio.
        </DescText>
      );
    }

    return alarms.map((alarm) => renderCard({
      id: uuid(),
      medicationId: medication.id,
      schedule: alarm,
      medicationData: medication.data,
    }, true));
  };

  // Verificar com o André se existe algum "utils" pro histórico
  const renderHistory = (medHistory: MedicationHistory) : Array<JSX.Element> | JSX.Element => (
    medHistory.history.map((entry) => (
      <HistRow key={uuid()}>
        <HistText style={{ textAlign: 'left' }}>
          {format(entry.datetime, 'HH:mm - dd/MM/yyyy')}
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

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <MainLayout
      headerConfig={{
        mode: HeaderMode.Title,
        title: { small: medicationId === undefined ? 'Novo' : 'Editar', normal: 'Medicamento' },
      }}
    >
      <MainContainer>
        <CreateScheduleDialog
          visible={scheduleVisible}
          setVisible={setScheduleVisible}
          onSave={(schedule) => {
            medicationAPI.createMedicationSchedule(medicationId, schedule)
              .then(() => {
                Alert.alert('Concluído', 'Horário criado com sucesso');
                setMedication({
                  ...medication,
                  schedule: [...medication.schedule, schedule],
                });
              })
              .catch(() => Alert.alert('Ooops', 'Não conseguimos criar um horário para o medicamento'));
          }}
        />
        <CreateScheduleDialog
          visible={alarmVisible}
          setVisible={setAlarmVisible}
          onSave={(alarm) => {
            medicationAPI.createMedicationAlarm(medicationId, alarm)
              .then(() => {
                Alert.alert('Concluído', 'Alarme criado com sucesso');
                setMedication({
                  ...medication,
                  alarms: [...medication.alarms, alarm],
                });
              })
              .catch(() => Alert.alert('Ooops', 'Não conseguimos criar um alarme para o medicamento'));
          }}
        />
        <Formik
          initialValues={{
            name: medication?.data.name,
            unit: medication?.data.unit,
            quantity: medication?.stock.toString(),
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            unit: Yup.string().required('Unidade é obrigatória'),
            quantity: Yup.string().required('Informe uma quantidade'),
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

              <MedicationSection title="Estoque">
                <CustomTextInput
                  fieldName="quantity"
                  formikHelpers={formikHelpers}
                  value={formikHelpers.values.quantity}
                  label="Quantidade"
                  mode="flat"
                  keyboardType="phone-pad"
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

              <MedicationSection title="Horários">
                <>
                  {medicationId !== undefined && medicationId !== null && (
                    <GreenButton onPress={() => setScheduleVisible(true)}>
                      <ButtonTextWhite>Cadastrar novo horário</ButtonTextWhite>
                    </GreenButton>
                  )}
                </>
                <>{renderSchedule(medication.schedule)}</>
              </MedicationSection>

              <MedicationSection title="Alarmes">
                <>
                  {medicationId !== undefined && medicationId !== null && (
                  <GreenButton onPress={() => setAlarmVisible(true)}>
                    <ButtonTextWhite>Cadastrar novo alarme</ButtonTextWhite>
                  </GreenButton>
                  )}
                </>
                <>{renderAlarms(medication.alarms)}</>
              </MedicationSection>

              <MedicationSection title="Histórico - Resumo">
                <DescText>
                  Aqui é um breve resumo, onde você poderá ver seu histórico parcial (última semana).
                  Poderá ver quando tomou esse medicamento, e quantos.
                </DescText>
                <GrayButton>
                  <ButtonTextBlack>Ver todo o histórico</ButtonTextBlack>
                </GrayButton>
                <>{medicationHistory !== undefined && (renderHistory(medicationHistory))}</>
              </MedicationSection>
            </>
          )}
        </Formik>
      </MainContainer>
    </MainLayout>
  );
};

export default MedicationPage;
