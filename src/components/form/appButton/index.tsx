import React, { memo } from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  ColorValue,
  ActivityIndicator,
} from 'react-native';

import useStyles from './styles';
import { AppText } from '@components';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

interface ButtonProps {
  title: string;
  size?: number;
  onPress?(): void;
  loader?: boolean;
  border?: boolean;
  topMargin?: number;
  color?: ColorValue;
  isBottom?: boolean;
  isBackground?: boolean;
  gradient?: boolean;
  disabled?: boolean;
  style?: ViewStyle | any;
  labelStyle?: TextStyle | any;
}

const AppButton = ({
  style,
  onPress,
  isBottom,
  gradient = true,
  title = '',
  color,
  loader = false,
  labelStyle,
  topMargin,
  disabled = false,
}: ButtonProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { moderateHeight } = useDeviceDimensions();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loader}
      style={[
        styles.containerBG,
        !gradient && { backgroundColor: color ?? colors.primary },
        disabled && styles.disabled,
        style,
        {
          marginTop: topMargin
            ? moderateHeight(topMargin)
            : moderateHeight(1.5),
        },
      ]}
    >
      {gradient ? (
        <Svg
          width="100%"
          height="100%"
          pointerEvents="none"
          style={styles.gradient}
        >
          <Defs>
            <LinearGradient id="buttonGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={String(colors.primary)} />
              <Stop offset="1" stopColor={String(colors.primaryDark)} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#buttonGradient)" />
        </Svg>
      ) : null}

      <View style={[styles.wrapper, isBottom && styles.bottom]}>
        {loader ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <AppText semibold label={title} style={[styles.label, labelStyle]} />
        )}
      </View>
    </Pressable>
  );
};

export default memo(AppButton);
