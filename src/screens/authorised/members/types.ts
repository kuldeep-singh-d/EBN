import type { ImageSourcePropType } from 'react-native';

export type MembersTabKey = 'chapterRoster' | 'otherMember';

export type MembersTab = {
  key: MembersTabKey;
  label: string;
};

export type MemberProfile = {
  id: string;
  name: string;
  company: string;
  specialty: string;
  avatar: ImageSourcePropType;
};

export type MemberSearchCriteria = {
  firstName: string;
  lastName: string;
  company: string;
  keyword: string;
  country: string;
  city: string;
  state: string;
};

export interface MembersData {
  title: string;
  tabs: MembersTab[];
  rosterMembers: MemberProfile[];
}
