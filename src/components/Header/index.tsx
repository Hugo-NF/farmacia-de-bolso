import React from 'react';
import { ImageSourcePropType } from 'react-native';
import NavBar from '../NavBar';
import HeaderTitle, { IHeaderTitleProps } from '../HeaderTitle';
import { styledComponents } from './styles';
import HeaderHelpButton from '../HeaderHelpButton';

export enum HeaderMode {
  Image,
  Title,
  Custom
}

export interface IHeaderProps {
  mode?: HeaderMode;
  title?: IHeaderTitleProps;
  imageSource?: ImageSourcePropType | undefined;
  children?: JSX.Element;
}

const Header = ({
  title, mode, imageSource, children,
}: IHeaderProps): JSX.Element => {
  const {
    HeaderBackground,
    Container,
  } = styledComponents;
  return (
    <Container>
      <HeaderBackground />
      <NavBar />
      {mode === HeaderMode.Title && title && (<HeaderTitle {...title} />)}
      {mode === HeaderMode.Image && imageSource && children}
      {mode === HeaderMode.Custom && children && children}
      <HeaderHelpButton />
    </Container>
  );
};

export default Header;

Header.defaultProps = {
  mode: HeaderMode.Title,
  children: (<></>),
  imageSource: undefined,
  title: {
    normal: 'Farmácia\nde Bolso',
  },
};
