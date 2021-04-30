import React from 'react';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../layouts/MainLayout';
import CustomTextInput from '../../components/CustomTextInput';
import MedicineSection from '../../components/MedicineSection';
import { ContentCard } from '../../components/ContentCard';
import { HeaderMode } from '../../components/Header';
import { styledComponents, styles } from './styles';

interface ICardData {
  id: number,
  days: string,
  time: string,
  quantity: number,
}

const Login = (): JSX.Element => {
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

  const mockMedicineData = {
    name: 'ACETATO DE MEDROXIPROGESTERONA 1',
    unit: 'Ampolas',
  };

  const mockSchedules = [
    {
      id: 1, days: 'Dom, Seg, Ter', time: '14:30', quantity: 2,
    },
    {
      id: 2, days: 'Dom, Seg, Ter', time: '19:30', quantity: 2,
    },
    {
      id: 3, days: 'Sab', time: '19:30', quantity: 2,
    },
  ];

  const mockAlarms = [
    {
      id: 1, days: 'Dom, Seg, Ter', time: '14:30', quantity: 2,
    },
    {
      id: 2, days: 'Dom, Seg, Ter', time: '19:30', quantity: 2,
    },
  ];

  const mockStock = 5;

  const mockHistoric = [
    {
      id: 1, datetime: 'Seg (26/03) - 19:30', quantity: 2, medicated: true,
    },
    {
      id: 2, datetime: 'Seg (26/03) - 14:30', quantity: 2, medicated: true,
    },
    {
      id: 3, datetime: 'Dom (25/03) - 19:30', quantity: 2, medicated: false,
    },
    {
      id: 4, datetime: 'Dom (25/03) - 14:30', quantity: 2, medicated: true,
    },
  ];

  const submitCallback = (formData: FormikValues): void => {
    console.log(formData);
  };

  const renderCard = (d : ICardData) : JSX.Element => (
    <ContentCard key={d.id} cardStyles={styles.ContentCard}>
      <CardRow>
        <CardHour>{d.time}</CardHour>
        <CardQuantity>{d.quantity} {mockMedicineData.unit}</CardQuantity>
      </CardRow>
      <CardRow>
        <CardDay>{d.days}</CardDay>
      </CardRow>
      <CardRow>
        <RedButton>
          <ButtonTextWhite>Excluir -</ButtonTextWhite>
        </RedButton>
        <OrangeButton>
          <ButtonTextWhite>Editar -</ButtonTextWhite>
        </OrangeButton>
      </CardRow>
    </ContentCard>
  );

  const renderSchedulers = () : Array<JSX.Element> | JSX.Element => {
    if (mockSchedules.length === 0) {
      return (
        <DescText>
          Você ainda não adicionou nenhum horário para este medicamento.
        </DescText>
      );
    }

    return mockSchedules.map(renderCard);
  };

  const renderAlarms = () : Array<JSX.Element> | JSX.Element => {
    if (mockAlarms.length === 0) {
      return (
        <DescText>
          Você ainda não adicionou nenhum alarme. Adicione para não esquecer de tomar seu remédio.
        </DescText>
      );
    }

    return mockAlarms.map(renderCard);
  };

  const renderHistoric = () : Array<JSX.Element> | JSX.Element => (
    mockHistoric.map((h) => (
      <HistRow key={h.id}>
        <HistText style={{ textAlign: 'left' }}>
          {h.datetime}
        </HistText>
        <HistText
          numberOfLines={1}
          style={{
            textAlign: 'right',
            color: h.medicated ? '#219653' : '#EB5757',
          }}
        >
          {h.medicated ? `Medicado - ${h.quantity} ${mockMedicineData.unit}` : 'Não medicado'}
        </HistText>
      </HistRow>
    ))
  );

  return (
    <MainLayout
      headerConfig={{
        mode: HeaderMode.Custom,
        children: undefined, // leave empty to not implement medicine image yet
      }}
    >
      <MainContainer>
        <Formik
          initialValues={{
            name: '',
            unit: '',
            quantity: 0,
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
                value={mockMedicineData.name} // TODO - remove this after backend is done
                label="Nome"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="unit"
                formikHelpers={formikHelpers}
                placeholder="E.x.: Comprimido, mL, g, mg"
                value={mockMedicineData.unit} // TODO - remove this after backend is done
                label="Unidade de medida"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />

              <MedicineSection title="Horários">
                <GreenButton>
                  <ButtonTextWhite>Cadastrar novo horário --</ButtonTextWhite>
                </GreenButton>
                <>{renderSchedulers()}</>
              </MedicineSection>

              <MedicineSection title="Alarmes">
                <GreenButton>
                  <ButtonTextWhite>Cadastrar novo alarme --</ButtonTextWhite>
                </GreenButton>
                <>{renderAlarms()}</>
              </MedicineSection>

              <MedicineSection title="Estoque">
                <CustomTextInput
                  fieldName="quantity"
                  formikHelpers={formikHelpers}
                  value={mockStock.toString()} // TODO - remove this after backend is done
                  label="Quantidade"
                  mode="flat"
                  onBlur={() => formikHelpers.handleSubmit()}
                  {...styles.textInput}
                />
                <DescText>
                  Mantenha atualizado seu estoque, assim podemos lhe dizer quando estiver perto de acabar.
                </DescText>
              </MedicineSection>

              <MedicineSection title="Histórico - Resumo">
                <DescText>
                  Aqui é um breve resumo, onde você poderá ver seu histórico parcial (última semana).
                  Poderá ver quando tomou esse medicamento, e quantos.
                </DescText>
                <GrayButton>
                  <ButtonTextBlack>Ver todo o histórico -</ButtonTextBlack>
                </GrayButton>
                <>{renderHistoric()}</>
              </MedicineSection>
            </>
          )}
        </Formik>
      </MainContainer>
    </MainLayout>
  );
};

export default Login;
