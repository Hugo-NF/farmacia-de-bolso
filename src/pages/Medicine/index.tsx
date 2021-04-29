import React from 'react';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../layouts/MainLayout';
import CustomTextInput from '../../components/CustomTextInput';
import MedicineSection from '../../components/MedicineSection';
import { HeaderMode } from '../../components/Header';
import { styledComponents, styles } from './styles';

const Login = (): JSX.Element => {
  // Styles desestructuring
  const {
    MainContainer,
    DescText,
  } = styledComponents;

  const submitCallback = (formData: FormikValues): void => {
    console.log(formData);
  };

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
                label="Nome"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="unit"
                formikHelpers={formikHelpers}
                placeholder="E.x.: Comprimido, mL, g, mg"
                label="Unidade de medida"
                mode="flat"
                onBlur={() => formikHelpers.handleSubmit()}
                {...styles.textInput}
              />

              <MedicineSection title="Horários">
                <DescText>
                  Você ainda não adicionou nenhum horário para este medicamento
                </DescText>
              </MedicineSection>

              <MedicineSection title="Alarmes">
                <DescText>
                  Você ainda não adicionou nenhum alarme. Adicione para não esquecer de tomar seu remédio
                </DescText>
              </MedicineSection>

              <MedicineSection title="Estoque">
                <CustomTextInput
                  fieldName="quantity"
                  formikHelpers={formikHelpers}
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
              </MedicineSection>
            </>
          )}
        </Formik>
      </MainContainer>
    </MainLayout>
  );
};

export default Login;
