import type { ImageSourcePropType } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

export type HomeSlip = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
};

export type HomeQuickAction = {
  id: string;
  label: string;
  icon: LucideIcon;
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
    id?: string | number | null;
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    type: string;
    linkLabel: string;
    canScanQr: boolean;
  } | null;
  slips: HomeSlip[];
  quickActions: HomeQuickAction[];
  stats: {
    defaultRange: HomeStatsRange;
    ranges: HomeStatsRange[];
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
