import React from 'react';
import { View } from 'react-native';
import { styledComponents } from './styles';

export interface IHeaderTitleProps {
  small: string | undefined;
  normal: string;
}

const HeaderTitle = ({ small, normal }: IHeaderTitleProps): JSX.Element => {
  const { SmallTitle, NormalTitle } = styledComponents;
  return (
    <View>
      {small && (<SmallTitle>{small}</SmallTitle>)}
      <NormalTitle>{normal}</NormalTitle>
    </View>
  );
};

export default HeaderTitle;
