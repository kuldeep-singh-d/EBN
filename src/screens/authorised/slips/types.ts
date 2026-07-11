import type { LucideIcon } from 'lucide-react-native';

export type SlipsTabKey = 'given' | 'received';

export type SlipType = 'tyfcb' | 'referral' | 'ceu' | 'oneToOne';

export type SlipFilterOption = {
  key: SlipType;
  label: string;
  icon: LucideIcon;
};

export type SlipRecord = {
  id: string;
  tab: SlipsTabKey;
  type: SlipType;
  date: string;
  title: string;
  subtitle: string;
  amount?: string;
  isHighlighted?: boolean;
};

export interface SlipsData {
  title: string;
  tabs: Array<{
    key: SlipsTabKey;
    label: string;
  }>;
  filterOptions: SlipFilterOption[];
  slips: SlipRecord[];
}
