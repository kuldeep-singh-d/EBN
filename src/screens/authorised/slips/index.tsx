import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useSlips from './useSlips';

export const Slips = () => {
  const { styles } = useSlips();

  return (
    <AppContainer title="Slips" hideBackBtn>
      <View style={styles.container}>
        <AppText label="slips" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
