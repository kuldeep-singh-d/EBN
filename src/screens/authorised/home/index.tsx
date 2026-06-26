import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useHome from './useHome';

export const Home = () => {
  const { styles } = useHome();

  return (
    <AppContainer title="Home" hideBackBtn>
      <View style={styles.container}>
        <AppText label="home" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
