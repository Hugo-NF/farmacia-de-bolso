import React from 'react';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import TextInputMask from 'react-native-text-input-mask';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RoutesParams } from 'typings/routes';

import MainLayout from '../../layouts/MainLayout';

import CustomTextInput from '../../components/CustomTextInput';
import MedicationSection from '../../components/MedicationSection';
import { ContentCard } from '../../components/ContentCard';
import { HeaderMode } from '../../components/Header';

import { styledComponents, styles } from './styles';

interface ICardData {
  id: number,
  days: string,
  time: string,
  quantity: number,
}

const Medication = (): JSX.Element => {
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

  const submitCallback = (formData: FormikValues): void => {
    console.log(formData);
  };

  // const renderCard = (d : ICardData) : JSX.Element => (
  //   <ContentCard key={d.id} cardStyles={styles.ContentCard}>
  //     <CardRow>
  //       <CardHour>{d.time}</CardHour>
  //       <CardQuantity>{d.quantity} {mocked.medicationData.unit}</CardQuantity>
  //     </CardRow>
  //     <CardRow>
  //       <CardDay>{d.days}</CardDay>
  //     </CardRow>
  //     <CardRow>
  //       <RedButton>
  //         <ButtonTextWhite>Excluir</ButtonTextWhite>
  //       </RedButton>
  //       <OrangeButton>
  //         <ButtonTextWhite>Editar</ButtonTextWhite>
  //       </OrangeButton>
  //     </CardRow>
  //   </ContentCard>
  // );

  // const renderSchedulers = () : Array<JSX.Element> | JSX.Element => {
  //   if (mocked.schedules.length === 0) {
  //     return (
  //       <DescText>
  //         Você ainda não adicionou nenhum horário para este medicamento.
  //       </DescText>
  //     );
  //   }

  //   return mocked.schedules.map(renderCard);
  // };

  // const renderAlarms = () : Array<JSX.Element> | JSX.Element => {
  //   if (mocked.alarms.length === 0) {
  //     return (
  //       <DescText>
  //         Você ainda não adicionou nenhum alarme. Adicione para não esquecer de tomar seu remédio.
  //       </DescText>
  //     );
  //   }

  //   return mocked.alarms.map(renderCard);
  // };

  // const renderHistoric = () : Array<JSX.Element> | JSX.Element => (
  //   mocked.historic.map((h) => (
  //     <HistRow key={h.id}>
  //       <HistText style={{ textAlign: 'left' }}>
  //         {h.datetime}
  //       </HistText>
  //       <HistText
  //         numberOfLines={1}
  //         style={{
  //           textAlign: 'right',
  //           color: h.medicated ? '#219653' : '#EB5757',
  //         }}
  //       >
  //         {h.medicated ? `Medicado - ${h.quantity} ${mocked.medicationData.unit}` : 'Não medicado'}
  //       </HistText>
  //     </HistRow>
  //   ))
  // );

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
            quantity: Yup.number().min(0, 'Deve ser maior ou igual a 0'),
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

export default Medication;
