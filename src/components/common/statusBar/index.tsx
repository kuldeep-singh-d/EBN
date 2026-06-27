import { AppStatusBarProps } from './types';
import React, { memo, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

const AppStatusBar = ({
  absolute,
  translucent = false,
  barStyle = 'dark-content',
  backgroundColor = '#FFFFFF',
  ...props
}: AppStatusBarProps) => {
  const insets = useSafeAreaInsets();

  const height = useMemo(() => {
    return absolute
      ? 0
      : Platform.OS === 'ios'
      ? insets.top
      : StatusBar.currentHeight;
  }, [absolute, insets.top]);

  const containerStyle = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingTop: translucent ? 0 : height,
          backgroundColor,
        },
      }).container,
    [backgroundColor, height, translucent],
  );

  return (
    <View style={containerStyle}>
      <StatusBar
        {...props}
        translucent
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default memo(AppStatusBar);
