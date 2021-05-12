/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { Alert } from 'react-native';

export const createErrorAlert = (navigation: any) => () => useCallback((): void => Alert.alert(
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
