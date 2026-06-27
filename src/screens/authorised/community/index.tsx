import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useCommunity from './useCommunity';

export const Community = () => {
  const { styles } = useCommunity();

  return (
    <AppContainer title="Community" hideBackBtn>
      <View style={styles.container}>
        <Svgs.CommunityMembers
          width={styles.heroIcon.width}
          height={styles.heroIcon.height}
          color={styles.heroIcon.color}
        />
        <AppText label="community" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
