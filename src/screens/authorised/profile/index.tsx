import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useProfile from './useProfile';

export const Profile = () => {
  const { styles } = useProfile();

  return (
    <AppContainer title="Profile" hideBackBtn>
      <View style={styles.container}>
        <AppText label="profile" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
