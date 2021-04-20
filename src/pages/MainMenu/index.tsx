// Package imports.
import React from 'react';
import { FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Component imports.
import { ContentCard } from '../../components/ContentCard';

// Style imports.
import { styledComponents, styles } from './styles';

// Type declarations.
type MenuItem = {
  name: string,
  icon: string,
  color: string
};

// Component declaration.
const MainMenu = (): JSX.Element => {
  // Variables.
  const menuItems : Array<MenuItem> = [
    {
      name: 'Medicamentos',
      icon: 'pill',
      color: styles.menuItemIconColors.pill,
    },
    {
      name: 'Alarmes',
      icon: 'bell-ring-outline',
      color: styles.menuItemIconColors.bell,
    },
    {
      name: 'Estoque',
      icon: 'package-variant-closed',
      color: styles.menuItemIconColors.package,
    },
    {
      name: 'Histórico',
      icon: 'history',
      color: styles.menuItemIconColors.history,
    },
    {
      name: 'Relatório',
      icon: 'file-document-outline',
      color: styles.menuItemIconColors.file,
    },
  ];

  // Styled components.
  const { HeaderPlaceholder, MainContainer, MenuItemTitle } = styledComponents;

  // Functions.
  function renderMenuItem(menuItem : MenuItem) : JSX.Element {
    return (
      <ContentCard cardStyles={styles.menuItem}>
        <MenuItemTitle>{menuItem.name}</MenuItemTitle>
        <MaterialCommunityIcons
          name={menuItem.icon}
          size={styles.menuItemIcon.size}
          color={menuItem.color}
        />
      </ContentCard>
    );
  }

  // JSX returned.
  return (
    <MainContainer>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => renderMenuItem(item)}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.flatlistMenu}
        ListHeaderComponent={
          <HeaderPlaceholder>Header placeholder</HeaderPlaceholder>
        }
      />
    </MainContainer>
  );
};

// Export default.
export default MainMenu;
