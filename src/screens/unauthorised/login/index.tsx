import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useLogin from './useLogin';

export const Login = () => {
  const { styles } = useLogin();

  return (
    <AppContainer title="Login" hideBackBtn>
      <View style={styles.container}>
        <AppText label="login" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
