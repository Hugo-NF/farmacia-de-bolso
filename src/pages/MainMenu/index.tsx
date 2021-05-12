// Package imports.
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// Component imports.
import { ContentCard } from '../../components/ContentCard';

// Layout imports.
import MainLayout from '../../layouts/MainLayout';

// Style imports.
import { styledComponents, styles } from './styles';

// Type imports.
import { MenuItem } from '../../typings/menu';

// Component declaration.
const MainMenu = (): JSX.Element => {
  // Variables.
  const menuItems : Array<MenuItem> = [
    {
      name: 'Medicamentos',
      destination: 'MainMenu',
      icon: 'pill',
      iconColor: styles.menuItemIconColors.pill,
    },
    {
      name: 'Alarmes',
      destination: 'MainMenu',
      icon: 'bell-ring-outline',
      iconColor: styles.menuItemIconColors.bell,
    },
    {
      name: 'Estoque',
      destination: 'MedicationStock',
      icon: 'package-variant-closed',
      iconColor: styles.menuItemIconColors.package,
    },
    {
      name: 'Histórico',
      destination: 'MainMenu',
      icon: 'history',
      iconColor: styles.menuItemIconColors.history,
    },
    {
      name: 'Relatório',
      destination: 'MainMenu',
      icon: 'file-document-outline',
      iconColor: styles.menuItemIconColors.file,
    },
  ];
  const navigation = useNavigation();

  // Styled components.
  const { MainContainer, MenuItemTitle } = styledComponents;

  // Functions.
  function renderMenuItem(menuItem : MenuItem) : JSX.Element {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(menuItem.destination)}
      >
        <ContentCard cardStyles={styles.menuItem}>
          <MenuItemTitle>{menuItem.name}</MenuItemTitle>
          <MaterialCommunityIcons
            name={menuItem.icon}
            size={styles.menuItemIcon.size}
            color={menuItem.iconColor}
          />
        </ContentCard>
      </TouchableOpacity>
    );
  }

  // JSX returned.
  return (
    <MainLayout disableScrollView>
      <MainContainer>
        <FlatList
          data={menuItems}
          renderItem={({ item }) => renderMenuItem(item)}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.flatlistMenu}
        />
      </MainContainer>
    </MainLayout>
  );
};

// Export default.
export default MainMenu;
