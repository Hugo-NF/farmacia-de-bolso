import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import Header, { IHeaderProps } from 'components/Header';
import theme from 'constants/theme';
import Constants from 'expo-constants';

import { View } from 'react-native';
import { Theme } from 'constants/index';
import { styledComponents } from './styles';

interface IMainLayoutProps {
  headerConfig?: IHeaderProps,
  disableScrollView?: boolean,
  children: JSX.Element,
}

export default function MainLayout({
  headerConfig,
  disableScrollView = false,
  children,
}: IMainLayoutProps): JSX.Element {
  const { LayoutContainer } = styledComponents;

  const renderPageContent = (disableScroll: boolean): JSX.Element => {
    const pageChild = (children);

    return disableScroll ? (
      <>
        <Header {...headerConfig} />
        {pageChild}
      </>
    ) : (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Header {...headerConfig} />
        {pageChild}
      </ScrollView>
    );
  };

  return (
    <LayoutContainer style={{ backgroundColor: theme.colors.background }}>
      <View style={{ width: '100%', height: Constants.statusBarHeight, backgroundColor: Theme.colors.primary }} />
      {renderPageContent(disableScrollView)}
    </LayoutContainer>
  );
}

// Default props.
MainLayout.defaultProps = {
  disableScrollView: false,
  headerConfig: {},
};
