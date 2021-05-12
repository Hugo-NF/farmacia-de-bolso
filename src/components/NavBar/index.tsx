import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styledComponents, styleSheet } from './styles';

const NavBar = (): JSX.Element => {
  const {
    GoBackButton,
    Container,
    ProfilePicture,
    ProfileView,
  } = styledComponents;

  const { canGoBack, goBack } = useNavigation();

  return (
    <Container>
      { canGoBack()
        ? (
          <TouchableOpacity onPress={goBack}>
            <GoBackButton>
              <MaterialCommunityIcons
                name="chevron-left"
                color="white"
                size={40}
                style={styleSheet.icon}
              />
              <Text style={styleSheet.text}>Voltar</Text>
            </GoBackButton>
          </TouchableOpacity>
        )
        : <View />}
      <TouchableOpacity>
        <ProfileView>
          <Text style={styleSheet.text}>Hugo Fonseca</Text>
          <ProfilePicture source={{ uri: 'https://picsum.photos/200/200' }} />
        </ProfileView>
      </TouchableOpacity>
    </Container>
  );
};

export default NavBar;
