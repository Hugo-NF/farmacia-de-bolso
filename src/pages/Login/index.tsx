import React from 'react';

import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../layouts/MainLayout';

import CustomTextInput from '../../components/CustomTextInput';

import { Constants } from '../../constants';

import { styledComponents, styles } from './styles';

const Login = (): JSX.Element => {
  // Styles desestructuring
  const {
    MainContainer,
    Title,
    SignUpButton,
    ButtonText,
  } = styledComponents;

  const loginCallback = (formData: FormikValues): void => {
    console.log(formData);
  };

  return (
    <MainLayout>
      <MainContainer>
        <Title>Digite seu e-mail e senha para acessar o aplicativo</Title>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('E-mail é obrigatório').email('Deve ser um e-mail válido'),
            password: Yup.string().required('Senha é obrigatória')
              .min(Constants.PASSWORD_MIN_LENGTH, `Deve ter pelo menos ${Constants.PASSWORD_MIN_LENGTH} caracteres`),

          })}
          onSubmit={loginCallback}
        >
          {(formikHelpers) => (
            <>
              <CustomTextInput
                fieldName="email"
                formikHelpers={formikHelpers}
                placeholder="E-mail"
                label="E-mail"
                mode="flat"
                keyboardType="email-address"
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="password"
                formikHelpers={formikHelpers}
                placeholder="Senha"
                label="Senha"
                mode="flat"
                secureTextEntry
                {...styles.textInput}
              />
              <SignUpButton
                disabled={formikHelpers.isSubmitting}
                onPress={() => formikHelpers.handleSubmit()}
              >
                <ButtonText>Acessar</ButtonText>
              </SignUpButton>
            </>
          )}
        </Formik>

      </MainContainer>
    </MainLayout>
  );
};

export default Login;
