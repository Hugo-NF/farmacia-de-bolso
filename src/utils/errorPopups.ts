// Package imports.
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

// Functions.
export const createErrorAlert = (navigation: NavigationProp<ParamListBase>) : (() => void) => {
  const errorAlertCallback = useCallback((): void => Alert.alert(
    'Erro!',
    'Ocorreu um erro no carregamento das informações.\n'
    + 'Retornando para a página anterior.',
    [
      {
        text: 'Ok',
        onPress: () => navigation.goBack(),
      },
    ],
    {
      cancelable: false,
    },
  ), [navigation]);

  return errorAlertCallback;
};
