import React from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useVisitors from './useVisitors';

type VisitorAction = {
  label: string;
  icon: React.ComponentType<SvgProps>;
};

const INVITE_ACTIONS: VisitorAction[] = [
  { label: 'Email', icon: Svgs.VisitorEmail },
  { label: 'SMS', icon: Svgs.VisitorSms },
  { label: 'Share', icon: Svgs.VisitorShare },
];

const REGISTER_ACTIONS: VisitorAction[] = [
  { label: 'Myself', icon: Svgs.VisitorMyself },
  { label: 'Visitor', icon: Svgs.VisitorPerson },
];

export const Visitors = () => {
  const { styles } = useVisitors();

  const renderAction = ({ label, icon: Icon }: VisitorAction) => (
    <Pressable key={label} style={styles.actionCard}>
      <Icon
        width={styles.actionIcon.width}
        height={styles.actionIcon.height}
        color={styles.actionIcon.color}
      />
      <AppText semibold centered label={label} style={styles.actionLabel} />
    </Pressable>
  );

  return (
    <AppContainer
      listing
      title="VISITORS"
      centerTitle
      rightIcon={Svgs.HelpCircle}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerIconColor={String(styles.headerIcon.color)}
      headerIconSize={styles.headerIcon.width}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        <View style={styles.inviteSection}>
          <AppText
            medium
            centered
            label="INVITE TO MY CHAPTER"
            style={styles.sectionTitle}
          />
          <View style={styles.inviteRow}>{INVITE_ACTIONS.map(renderAction)}</View>
        </View>

        <View style={styles.registerSection}>
          <AppText
            medium
            centered
            label="REGISTER A VISIT"
            style={styles.sectionTitle}
          />
          <View style={styles.registerRow}>
            {REGISTER_ACTIONS.map(renderAction)}
          </View>
        </View>
      </View>
    </AppContainer>
  );
};
