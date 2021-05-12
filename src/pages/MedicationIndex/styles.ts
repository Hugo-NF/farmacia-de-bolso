// Package imports.
import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Theme imports.
import { Theme } from 'constants/index';

// Styled components.
export const styledComponents = {
  MainContainer: styled.View<ViewProps>`
    flex: 1;
    align-items: center;
    background-color: ${Theme.colors.background};
    justify-content: flex-start;
  `,

  MedicationName: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    text-transform: uppercase;
  `,

  AddButtonText: styled.Text<TextProps>`
    font-family: Roboto;
    font-style: normal;
    background-color: ${Theme.colors.success};
    color: white;
    padding: 12px 36px;
    border-radius: 6px;
    font-size: 22px;
    font-weight: bold;
  `,

  MessageText: styled.Text<TextProps>`
    font-family: Roboto;
    font-style: normal;
    color: ${Theme.colors.success};
    font-size: 26px;
    margin-top: 26px;
  `,
};

export const styles = {
  flatlistMenu: {
    paddingBottom: 27,
    paddingTop: 26,
  },

  medication: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};
