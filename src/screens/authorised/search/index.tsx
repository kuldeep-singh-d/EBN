import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import useSearch from './useSearch';

export const Search = () => {
  const { styles } = useSearch();

  return (
    <AppContainer title="Search">
      <View style={styles.container}>
        <AppText label="search" centered style={styles.label} />
      </View>
    </AppContainer>
  );
};
