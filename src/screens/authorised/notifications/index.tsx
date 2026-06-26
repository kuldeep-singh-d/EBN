import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useNotifications from './useNotifications';

export const Notifications = () => {
  const { styles } = useNotifications();

  return (
    <AppContainer title="Notifications">
      <View style={styles.container}>
        <AppText label="notifications" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
