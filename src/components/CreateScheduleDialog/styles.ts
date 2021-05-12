import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export const DayOption = styled.View<ViewProps>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const styles = {
  menuItem: {
    paddingLeft: 18,
  },
  menuItemTitle: {
    marginLeft: -10,
  },
  textInput: {
    style: {
      backgroundColor: 'transparent',
      maxHeight: 56,
      width: '100%',
    },
  },
};
