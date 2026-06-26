import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Screens from '@screens/index';
import { routes } from '../routes';

const Stack = createNativeStackNavigator();

export function Unauthorised() {
  const { login, forgotPassword } = routes.auth;

  return (
    <Stack.Navigator
      initialRouteName={login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={login} component={Screens.Login} />
      <Stack.Screen
        name={forgotPassword}
        component={Screens.ForgotPassword}
      />
    </Stack.Navigator>
  );
}
