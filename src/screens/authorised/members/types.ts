export type MembersTabKey = 'chapterRoster' | 'otherMember';

export type MembersTab = {
  key: MembersTabKey;
  label: string;
};

export type MemberProfile = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  status?: string;
  company: string;
  specialty: string;
  avatar?: string | null;
  chapterName?: string;
  chapterCity?: string;
};

export type MemberApiProfile = {
  id: number;
  whatsapp?: string | null;
  avatar?: string | null;
  dob?: string | null;
  company_name?: string | null;
  brand_name?: string | null;
  nature_of_business?: string | null;
  years_in_business?: string | null;
  gst_number?: string | null;
  website?: string | null;
  office_address?: string | null;
  city?: string | null;
  pincode?: string | null;
  induction_date?: string | null;
  renewal_date?: string | null;
};

export type MemberApiRecord = {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  category?: {
    id: number;
    name: string;
  } | null;
  sub_category?: {
    id: number;
    name: string;
  } | null;
  primary_chapter?: {
    id: number;
    name: string;
    city?: string | null;
  } | null;
  member_profile?: MemberApiProfile | null;
};

export type MembersSearchResponse = {
  status?: string;
  message?: string;
  data?: {
    current_page?: number;
    data?: MemberApiRecord[];
    next_page_url?: string | null;
  };
};

export type MembersDetailResponse = {
  status?: string;
  message?: string;
  data?: MemberApiRecord;
};

export type MemberSearchCriteria = {
  search: string;
  company_name: string;
  brand_name: string;
  nature_of_business: string;
};

export interface MembersData {
  title: string;
  tabs: MembersTab[];
}
