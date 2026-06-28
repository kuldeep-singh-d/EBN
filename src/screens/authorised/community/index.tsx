import React from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useCommunity from './useCommunity';

type CommunityAction = {
  id: string;
  label: string;
  icon: React.ComponentType<SvgProps>;
};

const COMMUNITY_ACTIONS: CommunityAction[] = [
  {
    id: 'groups',
    label: 'Groups',
    icon: Svgs.CommunityMembers,
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: Svgs.CommunityTestimonials,
  },
  {
    id: 'connections',
    label: 'Connections',
    icon: Svgs.CommunityConnections,
  },
  {
    id: 'events',
    label: 'Events',
    icon: Svgs.CommunityEvents,
  },
];

export const Community = () => {
  const { styles } = useCommunity();

  const renderAction = ({ id, label, icon: Icon }: CommunityAction) => (
    <Pressable key={id} style={styles.actionItem}>
      <View style={styles.iconCard}>
        <Icon
          width={styles.actionIcon.width}
          height={styles.actionIcon.height}
          color={styles.actionIcon.color}
        />
      </View>
      <AppText semibold centered label={label} style={styles.actionLabel} />
    </Pressable>
  );

  return (
    <AppContainer
      listing
      centerTitle
      title="COMMUNITY"
      rightIcon={Svgs.HelpCircle}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerIconColor={String(styles.headerIcon.color)}
      headerIconSize={styles.headerIcon.width}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        <View style={styles.hero}>
          <AppText label="Get" style={styles.heroTitle} />
          <AppText label="Networking" style={styles.heroTitle} />
          <AppText
            medium
            label="Get to know your BNI Members"
            style={styles.heroSubtitle}
          />
        </View>

        <View style={styles.actionsGrid}>
          {COMMUNITY_ACTIONS.map(renderAction)}
        </View>
      </View>
    </AppContainer>
  );
};
