import React, { useState } from 'react';

import { Formik, FormikValues } from 'formik';
import {
  Button, Dialog, Paragraph, Portal,
} from 'react-native-paper';
import * as Yup from 'yup';
import { StackActions, useNavigation } from '@react-navigation/native';

import MainLayout from '../../layouts/MainLayout';

import CustomTextInput from '../../components/CustomTextInput';

import { Constants } from '../../constants';

import { styledComponents, styles } from './styles';

import userAPI from '../../services/user/api';

import { IDialogState } from '../../typings/dialog';

const Login = (): JSX.Element => {
  // Variable declaration
  const navigation = useNavigation();
  const [dialog, setDialog] = useState<IDialogState>({
    open: false,
    title: '',
    message: '',
  });

  // Styles desestructuring
  const {
    MainContainer,
    Title,
    SignInButton,
    SignUpButton,
    SignUpText,
    ButtonText,
  } = styledComponents;

  const loginCallback = async (formData: FormikValues): Promise<void> => {
    function openLoginErrorPopUp() : void {
      setDialog({
        open: true,
        title: 'Autenticação',
        message: 'E-mail ou senha incorretos.',
      });
    }

    try {
      const response = await userAPI.signIn(formData.email, formData.password);

      if (response.user != null) {
        navigation.dispatch(StackActions.replace('MainMenu'));
      } else {
        openLoginErrorPopUp();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      openLoginErrorPopUp();
    }
  };

  return (
    <MainLayout>
      <MainContainer>
        <Portal>
          <Dialog
            visible={dialog.open}
            onDismiss={() => setDialog({ ...dialog, open: false })}
          >
            <Dialog.Title>{dialog.title}</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.portalParagraph}>{dialog.message}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialog({ ...dialog, open: false })}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
              <SignInButton
                disabled={formikHelpers.isSubmitting}
                onPress={() => formikHelpers.handleSubmit()}
              >
                <ButtonText>Acessar</ButtonText>
              </SignInButton>
              <SignUpButton onPress={() => navigation.navigate('Register')}>
                <SignUpText>Registrar</SignUpText>
              </SignUpButton>
            </>
          )}
        </Formik>

      </MainContainer>
    </MainLayout>
  );
};

export default Login;
