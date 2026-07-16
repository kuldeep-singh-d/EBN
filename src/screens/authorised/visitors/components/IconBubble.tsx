import React from 'react';
import { View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import useStyles from '../styles';

type IconBubbleProps = {
  Icon: LucideIcon;
};

const IconBubble = ({ Icon }: IconBubbleProps) => {
  const styles = useStyles();

  return (
    <View style={styles.iconBubble}>
      <Icon
        width={styles.fieldIcon.width}
        height={styles.fieldIcon.height}
        color={styles.fieldIcon.color}
      />
    </View>
  );
};

export default IconBubble;
