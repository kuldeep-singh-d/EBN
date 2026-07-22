import type { LucideIcon } from 'lucide-react-native';

export type SlipsTabKey = 'given' | 'received';

export type SlipType = 'meet' | 'elite' | 'referral';

export type SlipApiType = 'meet' | 'referral' | 'close_business';

export type SlipFormType = SlipType;

export type SlipDetailType = SlipApiType;

export type SlipFilterOption = {
  key: SlipType;
  apiType: SlipApiType;
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
  detailId?: string | number;
  detailType: SlipDetailType;
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

export type SlipDetailPayload = Record<string, unknown> & {
  id?: string | number;
  status?: string | null;
  status_label?: string | null;
  with_member_name?: string | null;
  prospect_name?: string | null;
};

export type SlipDetailResponse = {
  status?: string;
  message?: string;
  data?: SlipDetailPayload;
};
