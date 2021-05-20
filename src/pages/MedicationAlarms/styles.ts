// Package imports.
import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Theme imports.
import { Theme } from '../../constants';

// Styled components.
export const styledComponents = {
  AlarmInformationRow: styled.View<ViewProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 8px;
  `,

  AlarmMedicationDosage: styled.Text<TextProps>`
    color: ${Theme.colors.darkText};
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-transform: capitalize;
  `,

  AlarmScheduleDays: styled.Text<TextProps>`
    color: ${Theme.colors.darkText};
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
  `,

  AlarmScheduleTime: styled.Text<TextProps>`
    color: ${Theme.colors.darkText};
    flex-grow: 1;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
    text-transform: uppercase;
  `,

  AlarmTitle: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    flex-grow: 1;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
  `,

  LargeText: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    font-size: 32px;
    text-align: center;
  `,

  MainContainer: styled.View<ViewProps>`
    flex: 1;
    align-items: center;
    background-color: ${Theme.colors.background};
    justify-content: flex-start;
    padding-top: 10px;
  `,
};

export const styles = {
  flatlistMenu: {
    paddingBottom: 18,
  },

  userAlarm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 140,
    marginBottom: 9,
    marginTop: 9,
  },
};
