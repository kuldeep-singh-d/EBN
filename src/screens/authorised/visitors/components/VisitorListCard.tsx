import React from 'react';
import { Pressable, View } from 'react-native';
import { Building2, ChevronRight, UserRound } from 'lucide-react-native';

import { AppText } from '@components';
import type { VisitorInvitation } from '../types';
import useStyles from '../styles';

type VisitorListCardProps = {
  visitor: VisitorInvitation;
  onPress: (id: number) => void;
};

const VisitorListCard = ({ visitor, onPress }: VisitorListCardProps) => {
  const styles = useStyles();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(visitor.id)}
      style={({ pressed }) => [
        styles.visitorCard,
        pressed && styles.visitorCardPressed,
      ]}
    >
      {/* <View style={styles.visitorAvatar}>
        <UserRound
          width={styles.visitorAvatarIcon.width}
          height={styles.visitorAvatarIcon.height}
          color={styles.visitorAvatarIcon.color}
        />
      </View> */}

      <View style={styles.visitorCardBody}>
        <AppText
          semibold
          numberOfLines={1}
          label={visitor.full_name || '-'}
          style={styles.visitorName}
        />
        <AppText
          numberOfLines={1}
          label={visitor.company_name || '-'}
          style={styles.visitorCompany}
        />
        <View style={styles.visitorMetaRow}>
          <Building2
            width={styles.metaIcon.width}
            height={styles.metaIcon.height}
            color={styles.metaIcon.color}
          />
          <AppText
            numberOfLines={1}
            label={visitor.chapter?.name || '-'}
            style={styles.visitorMetaText}
          />
        </View>
      </View>

      <ChevronRight
        width={styles.chevron.width}
        height={styles.chevron.height}
        color={styles.chevron.color}
      />
    </Pressable>
  );
};

export default VisitorListCard;
