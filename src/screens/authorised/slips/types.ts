import type { LucideIcon } from 'lucide-react-native';

export type SlipsTabKey = 'given' | 'received';

export type SlipType = 'meet' | 'elite' | 'referral';

export type SlipFormType = SlipType;

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
  raw?: EliteActivityItem;
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

export type EliteActivityPayload = Record<string, unknown> & {
  id?: string | number;
};

export type EliteActivityItem = {
  type?: string;
  icon?: string;
  sort_date?: string;
  data?: EliteActivityPayload;
};

export type EliteActivitiesPagination = {
  current_page?: number;
  current_page_url?: string;
  data?: EliteActivityItem[];
  next_page_url?: string | null;
  per_page?: number;
  prev_page_url?: string | null;
};

export type EliteActivitiesListResponse = {
  status?: string;
  message?: string;
  data?: EliteActivitiesPagination;
};

export type SlipAddOption = SlipFilterOption;
