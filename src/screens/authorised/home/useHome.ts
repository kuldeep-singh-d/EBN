import useStyles from './styles';
import moment from 'moment';
import { Svgs } from '@assets/svgs';
import { images } from '@assets/images';
import { useDispatch, useSelector } from '@hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HomeData, HomeQuickAction, HomeStatsRange } from './types';
import { getDashboardData } from '@store/slices/app/dashboard/dashboard';

type DashboardProfile = {
  name?: string;
  chapter_name?: string;
  renewal_date?: string;
  avatar?: string | null;
};

type DashboardResponse = {
  data?: {
    profile?: DashboardProfile | null;
  };
};

const HOME_DATA: HomeData = {
  member: {
    name: 'Suresh Suthar',
    company: 'Ganicus',
    status: 'Active',
    dueDate: '10/01/2026',
    avatar: images.profilePlaceholder,
  },
  nextMeeting: {
    title: 'NEXT MEETING',
    date: 'Thursday, July 02, 2026',
    type: 'Meeting: In-Person',
    tyfcb: '₹32.6k',
    speakers: '0',
    visitors: '0',
    linkLabel: 'Online Meeting Link',
  },
  slips: [
    { id: 'tyfcb', label: 'TYFCBs', value: '0', icon: Svgs.HomeHandshake },
    {
      id: 'referrals',
      label: 'Referrals',
      value: '0',
      icon: Svgs.HomeReferral,
    },
    { id: 'ceus', label: 'CEUs', value: '0', icon: Svgs.HomeBook },
    {
      id: 'oneToOnes',
      label: 'One-to-Ones',
      value: '0',
      icon: Svgs.HomeOneToOne,
    },
  ],
  quickActions: [
    { id: 'training', label: 'Training', icon: Svgs.QuickTraining },
    {
      id: 'memberAttendance',
      label: 'Member Attendance',
      icon: Svgs.QuickMemberAttendance,
    },
    { id: 'event', label: 'Event', icon: Svgs.QuickEvent },
    {
      id: 'experienceFees',
      label: 'Experience Fees',
      icon: Svgs.QuickExperienceFees,
    },
    { id: 'membership', label: 'MemberShip', icon: Svgs.QuickMembership },
    {
      id: 'trainingTechnology',
      label: 'Training & Technology',
      icon: Svgs.QuickTrainingTechnology,
    },
    { id: 'cdpsDeposit', label: 'CDPS Deposit', icon: Svgs.QuickCdpsDeposit },
    { id: 'members', label: 'Members', icon: Svgs.QuickMembers },
    { id: 'sicilianSpot', label: 'SicilianSpot', icon: Svgs.QuickSicilianSpot },
  ],
  stats: {
    defaultRange: 'LIFETIME',
    ranges: ['6 MONTHS', '12 MONTHS', 'LIFETIME'],
    rowsByRange: {
      '6 MONTHS': [
        { id: 'oneToOne', label: 'One-to-One', value: '21' },
        { id: 'referralsGiven', label: 'Referrals Given', value: '12' },
        { id: 'referralsReceived', label: 'Referrals Received', value: '10' },
        { id: 'tyfcbGiven', label: 'TYFCB Given', value: '1432500' },
        { id: 'revenueReceived', label: 'Revenue Received', value: '76420' },
        { id: 'visitors', label: 'Visitors', value: '0' },
        { id: 'ceus', label: 'CEUs', value: '0' },
      ],
      '12 MONTHS': [
        { id: 'oneToOne', label: 'One-to-One', value: '76' },
        { id: 'referralsGiven', label: 'Referrals Given', value: '35' },
        { id: 'referralsReceived', label: 'Referrals Received', value: '33' },
        { id: 'tyfcbGiven', label: 'TYFCB Given', value: '4256142' },
        { id: 'revenueReceived', label: 'Revenue Received', value: '223760' },
        { id: 'visitors', label: 'Visitors', value: '0' },
        { id: 'ceus', label: 'CEUs', value: '0' },
      ],
      LIFETIME: [
        { id: 'oneToOne', label: 'One-to-One', value: '148' },
        { id: 'referralsGiven', label: 'Referrals Given', value: '79' },
        { id: 'referralsReceived', label: 'Referrals Received', value: '64' },
        { id: 'tyfcbGiven', label: 'TYFCB Given', value: '8428100' },
        { id: 'revenueReceived', label: 'Revenue Received', value: '497500' },
        { id: 'visitors', label: 'Visitors', value: '0' },
        { id: 'ceus', label: 'CEUs', value: '0' },
      ],
    },
  },
  trafficLight: {
    title: 'EBN Member Traffic Light',
    totalLabel: 'Your Total score',
    totalScore: '40',
    totalTone: 'red',
    rateLabel: 'Rate',
    scoreLabel: 'Score',
    footer: 'Last Updated   May 31 2026 | Weekly average*',
    rows: [
      {
        id: 'attendance',
        label: 'Attendance',
        rate: '100.0%',
        score: '10',
        tone: 'green',
      },
      {
        id: 'oneToOne',
        label: 'One-to-One*',
        rate: '1.27',
        score: '20',
        tone: 'green',
      },
      { id: 'ceus', label: 'CEUs*', rate: '0.0', score: '0', tone: 'red' },
      {
        id: 'referralsGiven',
        label: 'Referrals Given*',
        rate: '0.31',
        score: '5',
        tone: 'red',
      },
      {
        id: 'tyfcbGiven',
        label: 'TYFCB Given',
        rate: '1.91m',
        score: '5',
        tone: 'green',
      },
      {
        id: 'visitors',
        label: 'Visitors',
        rate: '0',
        score: '0',
        tone: 'neutral',
      },
      {
        id: 'membersSponsored',
        label: 'Members Sponsored',
        rate: '0',
        score: '0',
        tone: 'red',
      },
    ],
  },
};

const getMemberStatus = (renewalDate?: string) => {
  const parsedDate = moment(
    renewalDate,
    ['D MMMM, YYYY', 'DD MMMM, YYYY'],
    true,
  );

  if (!parsedDate.isValid()) {
    return 'Expired';
  }

  return parsedDate.isAfter(moment(), 'day') ? 'Active' : 'Expired';
};

const useHome = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const dashboardRequestRef = useRef(false);
  const dashboardResponse = useSelector(
    state => state.dashboard?.data,
  ) as DashboardResponse;
  const dashboardLoading = useSelector(state => state.dashboard?.loading);
  const [selectedStatsRange, setSelectedStatsRange] = useState<HomeStatsRange>(
    HOME_DATA.stats.defaultRange,
  );

  useEffect(() => {
    if (
      !dashboardRequestRef.current ||
      dashboardLoading ||
      !dashboardResponse
    ) {
      return;
    }

    console.log('[Dashboard API Response]', dashboardResponse);
    dashboardRequestRef.current = false;
  }, [dashboardLoading, dashboardResponse]);

  useEffect(() => {
    dashboardRequestRef.current = true;
    dispatch(getDashboardData());
  }, [dispatch]);

  const screenData = useMemo(() => {
    const profile = dashboardResponse?.data?.profile;

    if (!profile) {
      return HOME_DATA;
    }

    return {
      ...HOME_DATA,
      member: {
        name: profile.name || HOME_DATA.member.name,
        company: profile.chapter_name || HOME_DATA.member.company,
        status: getMemberStatus(profile.renewal_date),
        dueDate: profile.renewal_date || HOME_DATA.member.dueDate,
        avatar: profile.avatar
          ? { uri: profile.avatar }
          : images.profilePlaceholder,
      },
    };
  }, [dashboardResponse]);

  const statsRows = useMemo(
    () => HOME_DATA.stats.rowsByRange[selectedStatsRange],
    [selectedStatsRange],
  );

  const onQuickActionPress = useCallback((action: HomeQuickAction) => {
    console.log('[Home Quick Action]', {
      id: action.id,
      label: action.label,
    });
  }, []);

  return {
    styles,
    states: {
      statsRows,
      selectedStatsRange,
      screenData,
    },
    handlers: {
      onQuickActionPress,
      setSelectedStatsRange,
    },
    constants: {},
  };
};

export default useHome;
