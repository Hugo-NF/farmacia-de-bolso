// Package imports.
import { ImageProps, StyleSheet, ViewProps } from 'react-native';
import styled from 'styled-components/native';

// Styled components.
export const styledComponents = {

  GoBackButton: styled.View<ViewProps>`
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  Container: styled.View<ViewProps>`
    margin-bottom: 25px;
    width: 100%;
    max-width: 100%;
    max-height: 90px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  ProfilePicture: styled.Image<ImageProps>`
    margin-left: 20px;
    resize-mode: contain;
    height: 100%;
    aspectRatio: 1;
    border-radius: 9999px;
  `,

  ProfileView: styled.View<ViewProps>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

};

export const styleSheet = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 25,
  },
  icon: {
    letterSpacing: -20,
    marginRight: 5,
  },
});
