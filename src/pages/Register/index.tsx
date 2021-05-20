import React, { useState } from 'react';

import { Formik, FormikValues } from 'formik';
import {
  Button, Dialog, Paragraph, Portal,
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import * as Yup from 'yup';
import { StackActions, useNavigation } from '@react-navigation/native';

import MainLayout from '../../layouts/MainLayout';

import CustomTextInput from '../../components/CustomTextInput';

import { IDialogState } from '../../typings/dialog';

import { Constants } from '../../constants';

import { styledComponents, styles } from './styles';

import userAPI from '../../services/user/api';

const Register = (): JSX.Element => {
  const navigation = useNavigation();
  const [dialog, setDialog] = useState<IDialogState>({
    open: false,
    title: '',
    message: '',
  });

  // Styles desestructuring
  const {
    ButtonText,
    MainContainer,
    SectionText,
    SignUpButton,
  } = styledComponents;

  const signUp = async (formData: FormikValues): Promise<void> => {
    try {
      const userCredential = await userAPI.createAuth(
        formData.email, formData.password,
      );
      const userUID = userCredential.user.uid;

      const {
        address,
        birthDate,
        city,
        email,
        fullName,
        phoneNumber,
        state,
        username,
      } = formData;

      await userAPI.setDocumentData(userUID, {
        address,
        birthDate,
        city,
        email,
        fullName,
        phoneNumber,
        state,
        username,
      });

      navigation.dispatch(StackActions.replace('MainMenu'));
    } catch (e) {
      setDialog({
        open: true,
        title: 'Cadastro',
        message: 'Ocorreu um erro ao realizar seu cadastro! Tente novamente com outro endereço de e-mail.',
      });
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
        <Formik
          initialValues={{
            fullName: '',
            birthDate: '',
            email: '',
            state: '',
            city: '',
            phoneNumber: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().required('Nome completo é obrigatório'),
            birthDate: Yup.string().required('Data de nascimento é obrigatória'),
            email: Yup.string().required('E-mail é obrigatório').email('Deve ser um e-mail válido'),
            state: Yup.string().max(2, 'Deve conter apenas 2 caracteres'),
            city: Yup.string(),
            phoneNumber: Yup.string(),
            password: Yup.string().required('Senha é obrigatória')
              .min(Constants.PASSWORD_MIN_LENGTH, `Deve ter pelo menos ${Constants.PASSWORD_MIN_LENGTH} caracteres`),
            passwordConfirmation: Yup.string()
              .required('Confirmação de senha é obrigatória')
              .equals([Yup.ref('password')], 'Deve ser igual à senha'),
          })}
          onSubmit={signUp}
        >
          {(formikHelpers) => (
            <>
              <SectionText>Informações Pessoais</SectionText>
              <CustomTextInput
                fieldName="fullName"
                formikHelpers={formikHelpers}
                placeholder="Nome Completo"
                label="Nome Completo"
                mode="flat"
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="birthDate"
                formikHelpers={formikHelpers}
                placeholder="Data de Nascimento"
                label="Data de Nascimento"
                mode="flat"
                render={(props: Record<string, unknown>) => (
                  <TextInputMask
                    {...props}
                    mask="[00]/[00]/[0000]"
                  />
                )}
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="state"
                formikHelpers={formikHelpers}
                placeholder="Estado"
                label="Estado"
                mode="flat"
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="city"
                formikHelpers={formikHelpers}
                placeholder="Cidade"
                label="Cidade"
                mode="flat"
                {...styles.textInput}
              />
              <CustomTextInput
                fieldName="phoneNumber"
                formikHelpers={formikHelpers}
                placeholder="Telefone"
                label="Telefone"
                mode="flat"
                render={(props: Record<string, unknown>) => (
                  <TextInputMask
                    {...props}
                    mask="+55 ([00]) [00000]-[0000]"
                  />
                )}
                {...styles.textInput}
              />
              <SectionText>Informações de acesso</SectionText>
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
              <CustomTextInput
                fieldName="passwordConfirmation"
                formikHelpers={formikHelpers}
                placeholder="Confirmação de senha"
                label="Confirmação de senha"
                mode="flat"
                secureTextEntry
                {...styles.textInput}
              />
              <SignUpButton
                disabled={formikHelpers.isSubmitting}
                onPress={() => formikHelpers.handleSubmit()}
              >
                <ButtonText>Fazer cadastro</ButtonText>
              </SignUpButton>
            </>
          )}
        </Formik>
      </MainContainer>
    </MainLayout>
  );
};

export default Register;
