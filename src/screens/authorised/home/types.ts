import type { ComponentType } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { SvgProps } from 'react-native-svg';

export type HomeSlip = {
  id: string;
  label: string;
  value: string;
  icon: ComponentType<SvgProps>;
};

export type HomeQuickAction = {
  id: string;
  label: string;
  icon: ComponentType<SvgProps>;
};

export type HomeStat = {
  id: string;
  label: string;
  value: string;
};

export type HomeStatsRange = '6 MONTHS' | '12 MONTHS' | 'LIFETIME';

export type HomeTrafficLightScoreTone = 'green' | 'red' | 'neutral';

export type HomeTrafficLightRow = {
  id: string;
  label: string;
  rate: string;
  score: string;
  tone: HomeTrafficLightScoreTone;
};

export interface HomeData {
  member: {
    name: string;
    company: string;
    status: string;
    dueDate: string;
    avatar: ImageSourcePropType;
  };
  nextMeeting: {
    title: string;
    date: string;
    type: string;
    tyfcb: string;
    speakers: string;
    visitors: string;
    linkLabel: string;
  };
  slips: HomeSlip[];
  quickActions: HomeQuickAction[];
  stats: {
    defaultRange: HomeStatsRange;
    ranges: HomeStatsRange[];
    rowsByRange: Record<HomeStatsRange, HomeStat[]>;
  };
  trafficLight: {
    title: string;
    totalLabel: string;
    totalScore: string;
    totalTone: HomeTrafficLightScoreTone;
    rateLabel: string;
    scoreLabel: string;
    rows: HomeTrafficLightRow[];
    footer: string;
  };
}
