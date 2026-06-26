import React from 'react';
import { Pressable, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { AppText } from '@components';
import { routes } from '../routes';
import * as Screens from '@screens/index';

import useStyles from './bottomTabs.styles';

type TabItem = {
  label: string;
  shortLabel: string;
};

const Tab = createBottomTabNavigator();

const TAB_ITEMS: Record<string, TabItem> = {
  [routes.app.home]: {
    label: 'Home',
    shortLabel: 'H',
  },
  [routes.app.slips]: {
    label: 'Slips',
    shortLabel: 'S',
  },
  [routes.app.community]: {
    label: 'Community',
    shortLabel: 'C',
  },
  [routes.app.visitors]: {
    label: 'Visitors',
    shortLabel: 'V',
  },
  [routes.app.profile]: {
    label: 'Profile',
    shortLabel: 'P',
  },
};

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabItem = TAB_ITEMS[route.name];

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const handleLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              onLongPress={handleLongPress}
              accessibilityRole="button"
              accessibilityLabel={tabItem.label}
              accessibilityState={isFocused ? { selected: true } : {}}
              style={({ pressed }) => [
                styles.tabButton,
                isFocused && styles.activeTabButton,
                pressed && styles.pressedTabButton,
              ]}
            >
              <View style={styles.tabContent}>
                <View
                  style={[
                    styles.tabIcon,
                    isFocused && styles.activeTabIcon,
                  ]}
                >
                  <AppText
                    semibold
                    label={tabItem.shortLabel}
                    centered
                    style={[
                      styles.tabIconLabel,
                      isFocused && styles.activeTabIconLabel,
                    ]}
                  />
                </View>
                <AppText
                  semibold={isFocused}
                  label={tabItem.label}
                  centered
                  style={[
                    styles.tabLabel,
                    isFocused && styles.activeTabLabel,
                  ]}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const renderBottomTabBar = (props: BottomTabBarProps) => (
  <BottomTabBar {...props} />
);

export const MainTabs = () => (
  <Tab.Navigator
    initialRouteName={routes.app.home}
    tabBar={renderBottomTabBar}
    screenOptions={{
      headerShown: false,
      lazy: true,
      tabBarHideOnKeyboard: true,
    }}
  >
    <Tab.Screen name={routes.app.home} component={Screens.Home} />
    <Tab.Screen name={routes.app.slips} component={Screens.Slips} />
    <Tab.Screen name={routes.app.community} component={Screens.Community} />
    <Tab.Screen name={routes.app.visitors} component={Screens.Visitors} />
    <Tab.Screen name={routes.app.profile} component={Screens.Profile} />
  </Tab.Navigator>
);

export default MainTabs;
