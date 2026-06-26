import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useVisitors from './useVisitors';

export const Visitors = () => {
  const { styles } = useVisitors();

  return (
    <AppContainer title="Visitors" hideBackBtn>
      <View style={styles.container}>
        <AppText label="visitors" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
