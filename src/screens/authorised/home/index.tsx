import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useHome from './useHome';

export const Home = () => {
  const { styles } = useHome();

  return (
    <AppContainer title="Home" hideBackBtn>
      <View style={styles.container}>
        <Svgs.HomeStats
          width={styles.heroIcon.width}
          height={styles.heroIcon.height}
          color={styles.heroIcon.color}
        />
        <AppText label="home" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
