import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useVisitors from './useVisitors';

export const Visitors = () => {
  const { styles } = useVisitors();

  return (
    <AppContainer title="Visitors" hideBackBtn>
      <View style={styles.container}>
        <Svgs.VisitorPass
          width={styles.heroIcon.width}
          height={styles.heroIcon.height}
          color={styles.heroIcon.color}
        />
        <AppText label="visitors" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
