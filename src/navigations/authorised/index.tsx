import { createNativeStackNavigator } from '@react-navigation/native-stack';

//local imports
import { routes } from '../routes';
import { MainTabs } from './bottomTabs';
import * as Screens from '@screens/index';

const Stack = createNativeStackNavigator();

export function Authorised() {
  const { mainTabs, notifications, profile, menu } = routes.app;

  return (
    <Stack.Navigator
      initialRouteName={mainTabs}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={mainTabs} component={MainTabs} />
      <Stack.Screen name={notifications} component={Screens.Notifications} />
      <Stack.Screen name={profile} component={Screens.Profile} />
      <Stack.Screen name={menu} component={Screens.Menu} />
    </Stack.Navigator>
  );
}
