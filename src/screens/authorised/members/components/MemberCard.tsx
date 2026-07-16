import React from 'react';
import { Image, Pressable, View } from 'react-native';
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
} from 'lucide-react-native';

import { images } from '@assets/images';
import { AppText } from '@components';
import useStyles from '../styles';
import type { MemberProfile } from '../types';

type MemberCardProps = {
  member: MemberProfile;
  onPress: (memberId: number) => void;
};

const MemberCard = ({ member, onPress }: MemberCardProps) => {
  const styles = useStyles();

  const avatarSource = member.avatar
    ? { uri: member.avatar }
    : images.profilePlaceholder;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(member.id)}
      style={({ pressed }) => [
        styles.memberCard,
        pressed && styles.memberCardPressed,
      ]}
    >
      <View style={styles.avatarShell}>
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      <View style={styles.memberInfo}>
        <AppText semibold label={member.name} style={styles.memberName} />
        <View style={styles.memberMetaRow}>
          <Building2
            width={styles.memberMetaIcon.width}
            height={styles.memberMetaIcon.height}
            color={styles.memberMetaIcon.color}
          />
          <AppText
            numberOfLines={1}
            label={member.company}
            style={styles.memberMeta}
          />
        </View>
        <View style={styles.memberSpecialtyPill}>
          <BriefcaseBusiness
            width={styles.specialtyIcon.width}
            height={styles.specialtyIcon.height}
            color={styles.specialtyIcon.color}
          />
          <AppText
            medium
            numberOfLines={1}
            label={member.specialty}
            style={styles.memberSpecialty}
          />
        </View>
      </View>
      <ChevronRight
        width={styles.memberChevron.width}
        height={styles.memberChevron.height}
        color={styles.memberChevron.color}
      />
    </Pressable>
  );
};

export default MemberCard;
