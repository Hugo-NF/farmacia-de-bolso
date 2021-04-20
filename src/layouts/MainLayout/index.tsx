import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { styledComponents } from './styles';

interface IMainLayoutProps {
  disableScrollView?: boolean,
  children: JSX.Element,
}

export default function MainLayout({
  disableScrollView = false,
  children,
}: IMainLayoutProps): JSX.Element {
  const { LayoutContainer } = styledComponents;

  const renderPageContent = (disableScroll: boolean): JSX.Element => {
    const pageChild = (children);

    return disableScroll ? pageChild : (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {pageChild}
      </ScrollView>
    );
  };

  return (
    <LayoutContainer>
      {renderPageContent(disableScrollView)}
    </LayoutContainer>
  );
}
