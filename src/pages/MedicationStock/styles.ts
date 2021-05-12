// Package imports.
import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Theme imports.
import { Theme } from '../../constants';

// Styled components.
export const styledComponents = {
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

  StockItemAmountText: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    flex-grow: 1;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-align: right;
    text-transform: capitalize;
  `,

  StockItemInformationRow: styled.View<ViewProps>`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
  `,

  StockItemTitle: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    flex-grow: 1;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
  `,
};

export const styles = {
  errorIcon: {
    color: Theme.colors.error,
    size: 20,
  },

  errorText: {
    color: Theme.colors.error,
  },

  flatlistMenu: {
    paddingBottom: 18,
  },

  stockItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 112,
    marginBottom: 9,
    marginTop: 9,
  },

  warningIcon: {
    color: Theme.colors.warning,
    size: 20,
  },

  warningText: {
    color: Theme.colors.warning,
  },
};
