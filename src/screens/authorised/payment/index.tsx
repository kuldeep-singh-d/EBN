import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import usePayment from './usePayment';

export const Payment = () => {
  const { styles, states } = usePayment();

  return (
    <AppContainer title={states.screenData.title} hideBackBtn>
      <View style={styles.container}>
        <AppText centered label="Payment" style={styles.label} />
      </View>
    </AppContainer>
  );
};
