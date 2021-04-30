import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import Header, { IHeaderProps } from '../../components/Header';

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
      {/* <Header {...headerConfig} /> */}
      {renderPageContent(disableScrollView)}
    </LayoutContainer>
  );
}

// Default props.
MainLayout.defaultProps = {
  disableScrollView: false,
  headerConfig: {},
};
