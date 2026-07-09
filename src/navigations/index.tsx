import {
  Theme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//local imports
import { useMemo, useState } from 'react';
import { useSelector } from '@hooks';
import { colors as appColors } from '@assets/colors';
import { Authorised } from './authorised';
import { StatusBar, ToastMessage } from '@components';
import { Unauthorised } from './unauthorised';
import { routes } from './routes';

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: appColors.light,
  dark: false,
};

const darkTheme: Theme = {
  ...DefaultTheme,
  colors: appColors.dark,
  dark: true,
};

const primaryStatusBarRoutes = new Set([
  routes.app.members,
  routes.app.visitors,
]);

const getActiveRouteName = (state: any): string | undefined => {
  if (!state?.routes?.length) {
    return undefined;
  }

  const route = state.routes[state.index ?? 0];
  return route.state ? getActiveRouteName(route.state) : route.name;
};

const Navigation = () => {
  const navigationRef = useNavigationContainerRef();
  const { status } = useSelector((state: any) => state?.loginState);
  const currentTheme = useSelector((state: any) => state?.appTheme?.data);
  const [activeRouteName, setActiveRouteName] = useState<string>();

  const theme = useMemo(() => {
    const isDark = currentTheme === 'dark';
    return isDark ? darkTheme : lightTheme;
  }, [currentTheme]);

  const isPrimaryStatusBar = Boolean(
    status && activeRouteName && primaryStatusBarRoutes.has(activeRouteName),
  );

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isPrimaryStatusBar ? 'light-content' : 'dark-content'}
        backgroundColor={
          isPrimaryStatusBar ? theme.colors.primary : appColors.light.background
        }
      />
      <NavigationContainer
        ref={navigationRef}
        theme={theme}
        onReady={() => {
          setActiveRouteName(getActiveRouteName(navigationRef.getRootState()));
          BootSplash.hide({ fade: true });
        }}
        onStateChange={state => {
          setActiveRouteName(getActiveRouteName(state));
        }}
      >
        <GestureHandlerRootView style={styles.root}>
          {status ? <Authorised /> : <Unauthorised />}
          <ToastMessage />
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
