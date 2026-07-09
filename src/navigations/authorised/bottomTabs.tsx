import React from 'react';
import { routes } from '../routes';
import { AppText } from '@components';
import * as Screens from '@screens/index';
import useStyles from './bottomTabs.styles';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  CreditCard,
  House,
  ReceiptText,
  TicketCheck,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabItem = {
  label: string;
  icon?: LucideIcon;
};

const Tab = createBottomTabNavigator();

const TAB_ITEMS: Record<string, TabItem> = {
  [routes.app.home]: {
    label: 'Home',
    icon: House,
  },
  [routes.app.slips]: {
    label: 'Slips',
    icon: ReceiptText,
  },
  [routes.app.members]: {
    label: 'Members',
    icon: Users,
  },
  [routes.app.payment]: {
    label: 'Payment',
    icon: CreditCard,
  },
  [routes.app.visitors]: {
    label: 'Visitors',
    icon: TicketCheck,
  },
};

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Svg
          // width="100%"
          // height="100%"
          pointerEvents="none"
          style={styles.tabGradient}
        >
          <Defs>
            <LinearGradient id="bottomTabGradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={styles.tabGradientStart.color} />
              <Stop offset="1" stopColor={styles.tabGradientEnd.color} />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#bottomTabGradient)"
          />
        </Svg>
        <View style={styles.tabItems}>
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
                    style={[
                      styles.tabLabel,
                      isFocused && styles.activeTabLabel,
                    ]}
                  />
                  {/* {isFocused ? <View style={styles.activeIndicator} /> : null} */}
                </View>
              </Pressable>
            );
          })}
        </View>
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
