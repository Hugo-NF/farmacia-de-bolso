// Package imports.
import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Theme imports.
import { Theme } from '../../constants';

// Styled components.
export const styledComponents = {
  MainContainer: styled.View<ViewProps>`
    flex: 1;
    align-items: center;
    background-color: ${Theme.colors.background};
    justify-content: flex-start;
  `,

  MenuItemTitle: styled.Text<TextProps>`
    color: ${Theme.colors.text};
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 36px;
  `,
};

export const styles = {
  flatlistMenu: {
    paddingBottom: 27,
  },

  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menuItemIcon: {
    defaultColor: Theme.colors.text,
    size: 100,
  },

  menuItemIconColors: {
    bell: '#FFD700',
    file: '#4169E1',
    history: '#32CD32',
    package: '#8B4513',
    pill: '#DC143C',
  },
};
