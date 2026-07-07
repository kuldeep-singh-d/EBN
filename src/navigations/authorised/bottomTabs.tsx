import React from 'react';
import { routes } from '../routes';
import { Svgs } from '@assets/svgs';
import { AppText } from '@components';
import * as Screens from '@screens/index';
import useStyles from './bottomTabs.styles';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabItem = {
  label: string;
  icon?: React.ComponentType<SvgProps>;
};

const Tab = createBottomTabNavigator();

const TAB_ITEMS: Record<string, TabItem> = {
  [routes.app.home]: {
    label: 'Home',
    icon: Svgs.TabHome,
  },
  [routes.app.slips]: {
    label: 'Slips',
    icon: Svgs.TabSlips,
  },
  [routes.app.members]: {
    label: 'Members',
    icon: Svgs.TabMembers,
  },
  [routes.app.payment]: {
    label: 'Payment',
    icon: Svgs.TabPayment,
  },
  [routes.app.visitors]: {
    label: 'Visitors',
    icon: Svgs.TabVisitors,
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
          if (!tabItem) return null;

          const Icon = tabItem.icon;

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
                  style={[styles.tabIcon, isFocused && styles.activeTabIcon]}
                >
                  {Icon ? (
                    <Icon
                      width={styles.iconSize.width}
                      height={styles.iconSize.height}
                      color={
                        isFocused
                          ? styles.activeIconColor.color
                          : styles.iconColor.color
                      }
                    />
                  ) : null}
                </View>
                <AppText
                  semibold={isFocused}
                  label={tabItem.label}
                  centered
                  style={[styles.tabLabel, isFocused && styles.activeTabLabel]}
                />
                {isFocused ? <View style={styles.activeIndicator} /> : null}
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
    <Tab.Screen name={routes.app.members} component={Screens.Members} />
    <Tab.Screen name={routes.app.payment} component={Screens.Payment} />
    <Tab.Screen name={routes.app.visitors} component={Screens.Visitors} />
  </Tab.Navigator>
);

export default MainTabs;
