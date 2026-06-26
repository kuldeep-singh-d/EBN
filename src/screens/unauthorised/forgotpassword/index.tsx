import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useForgotPassword from './useForgotPassword';

export const ForgotPassword = () => {
  const { styles } = useForgotPassword();

  return (
    <AppContainer title="Forgot Password">
      <View style={styles.container}>
        <AppText label="forgot_password" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
