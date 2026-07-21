import React from 'react';
import { Pressable, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppText } from '@components';
import type useStyles from '../styles';

type SlipFormPlaceholderProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
};

const SlipFormPlaceholder = ({
  Icon,
  title,
  description,
  styles,
  onBackPress,
}: SlipFormPlaceholderProps) => (
  <View style={styles.formPlaceholder}>
    <View style={styles.formPlaceholderIconShell}>
      <Icon
        width={styles.formPlaceholderIcon.width}
        height={styles.formPlaceholderIcon.height}
        color={styles.formPlaceholderIcon.color}
      />
    </View>
    <AppText semibold centered label={title} style={styles.formTitle} />
    <AppText centered label={description} style={styles.formDescription} />
    <Pressable
      accessibilityRole="button"
      onPress={onBackPress}
      style={({ pressed }) => [
        styles.formBackButton,
        pressed && styles.formBackButtonPressed,
      ]}
    >
      <AppText
        semibold
        centered
        label="Back to Slips"
        style={styles.formBackText}
      />
    </Pressable>
  </View>
);

export default SlipFormPlaceholder;
