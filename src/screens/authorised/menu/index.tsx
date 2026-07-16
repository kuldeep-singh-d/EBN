import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { AppContainer, AppText } from '@components';
import useMenu from './useMenu';
import type { MenuItem } from './types';

export const Menu = () => {
  const { styles, handlers, constants } = useMenu();

  const renderMenuItem = (item: MenuItem, index: number) => {
    const Icon = item.icon;
    const isLast = index === constants.menuItems.length - 1;

    return (
      <Pressable
        key={item.id}
        accessibilityRole="button"
        onPress={() => handlers.handleMenuItemPress(item)}
        style={({ pressed }) => [
          styles.menuRow,
          !isLast && styles.menuRowBorder,
          pressed && styles.menuRowPressed,
        ]}
      >
        <View
          style={[styles.iconShell, item.destructive && styles.dangerIconShell]}
        >
          <Icon
            width={styles.menuIcon.width}
            height={styles.menuIcon.height}
            color={
              item.destructive
                ? styles.dangerIcon.color
                : styles.menuIcon.color
            }
          />
        </View>
        <AppText
          medium
          label={item.label}
          style={[styles.menuLabel, item.destructive && styles.dangerLabel]}
        />
        <ChevronRight
          width={styles.chevron.width}
          height={styles.chevron.height}
          color={
            item.destructive ? styles.dangerIcon.color : styles.chevron.color
          }
        />
      </Pressable>
    );
  };

  return (
    <AppContainer
      centerTitle
      title="MENU"
      showHeaderActions={false}
      contentStyle={styles.content}
      headerTitleStyle={styles.headerTitle}
      headerIconColor={String(styles.headerIcon.color)}
    >
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <AppText semibold label="Account" style={styles.sectionTitle} />
          <AppText
            label="Manage your EBN account and app information"
            style={styles.sectionSubtitle}
          />
        </View>

        <View style={styles.menuCard}>
          {constants.menuItems.map(renderMenuItem)}
        </View>

        <AppText centered label={constants.version} style={styles.version} />
      </View>
    </AppContainer>
  );
};
