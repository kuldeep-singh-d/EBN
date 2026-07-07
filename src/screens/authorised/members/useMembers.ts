import { useCallback, useMemo, useState } from 'react';

import useStyles from './styles';
import { images } from '@assets/images';
import type { MemberSearchCriteria, MembersData, MembersTabKey } from './types';

const INITIAL_CRITERIA: MemberSearchCriteria = {
  firstName: '',
  lastName: '',
  company: '',
  keyword: '',
  country: '',
  city: '',
  state: '',
};

const MEMBERS_DATA: MembersData = {
  title: 'Search Member',
  tabs: [
    { key: 'chapterRoster', label: 'CHAPTER ROSTER' },
    { key: 'otherMember', label: 'OTHER MEMBER' },
  ],
  rosterMembers: [
    {
      id: 'aashish-chowdharry',
      name: 'Aashish chowdharry',
      company: 'Konnect Me Video',
      specialty: 'Computer & Programming (Other)',
      avatar: images.profilePlaceholder,
    },
    {
      id: 'aatman-joshipura',
      name: 'Aatman Joshipura',
      company: 'Global Dental Clinic',
      specialty: 'Dentist',
      avatar: images.profilePlaceholder,
    },
    {
      id: 'aayush-jadia',
      name: 'Aayush Jadia',
      company: 'Jadia Jewels LLP',
      specialty: 'Fine Jewelry',
      avatar: images.profilePlaceholder,
    },
    {
      id: 'abhishek-modi',
      name: 'ABHISHEK MODI',
      company: 'GETFIVE CORPORATE ADVISORS LLP',
      specialty: 'Business Financing',
      avatar: images.profilePlaceholder,
    },
    {
      id: 'aesthetic-business-processes',
      name: 'Aesthetic Business Processes Pvt Ltd',
      company: 'Aesthetic Business Processes Pvt Ltd',
      specialty: 'Tax Advisor',
      avatar: images.profilePlaceholder,
    },
  ],
};

const useMembers = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<MembersTabKey>('chapterRoster');
  const [rosterQuery, setRosterQuery] = useState('');
  const [criteria, setCriteria] =
    useState<MemberSearchCriteria>(INITIAL_CRITERIA);

  const filteredMembers = useMemo(() => {
    const query = rosterQuery.trim().toLowerCase();

    if (!query) {
      return MEMBERS_DATA.rosterMembers;
    }

    return MEMBERS_DATA.rosterMembers.filter(member =>
      [member.name, member.company, member.specialty].some(value =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [rosterQuery]);

  const canSearch = useMemo(
    () => Object.values(criteria).some(value => value.trim().length >= 2),
    [criteria],
  );

  const setCriteriaValue = useCallback(
    (key: keyof MemberSearchCriteria, value: string) => {
      setCriteria(current => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const onMemberPress = useCallback((memberId: string) => {
    console.log('[Members] member press', memberId);
  }, []);

  const onCountryPress = useCallback(() => {
    console.log('[Members] select country');
  }, []);

  const onSearchPress = useCallback(() => {
    if (!canSearch) {
      return;
    }

    console.log('[Members] search criteria', criteria);
  }, [canSearch, criteria]);

  return {
    styles,
    states: {
      activeTab,
      canSearch,
      criteria,
      filteredMembers,
      rosterQuery,
      screenData: MEMBERS_DATA,
    },
    handlers: {
      onCountryPress,
      onMemberPress,
      onSearchPress,
      setActiveTab,
      setCriteriaValue,
      setRosterQuery,
    },
    constants: {},
  };
};

export default useMembers;
