import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useCommunity from './useCommunity';

export const Community = () => {
  const { styles } = useCommunity();

  return (
    <AppContainer title="Community" hideBackBtn>
      <View style={styles.container}>
        <AppText label="community" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
