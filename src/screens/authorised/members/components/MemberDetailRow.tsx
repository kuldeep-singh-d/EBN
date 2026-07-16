import React from 'react';
import { View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppText } from '@components';
import useStyles from '../styles';

type MemberDetailRowProps = {
  label: string;
  value?: string | number | boolean | null;
  Icon?: LucideIcon;
};

const MemberDetailRow = ({ label, value, Icon }: MemberDetailRowProps) => {
  const styles = useStyles();
  const displayValue =
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || '-';

  return (
    <View style={styles.detailRow}>
      {Icon ? (
        <View style={styles.detailRowIcon}>
          <Icon
            width={styles.detailIcon.width}
            height={styles.detailIcon.height}
            color={styles.detailIcon.color}
          />
        </View>
      ) : null}
      <View style={styles.detailRowBody}>
        <AppText label={label} style={styles.detailLabel} />
        <AppText
          semibold
          numberOfLines={2}
          label={displayValue}
          style={styles.detailValue}
        />
      </View>
    </View>
  );
};

export default MemberDetailRow;
