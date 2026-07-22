import useStyles from './styles';
import moment from 'moment';
import { images } from '@assets/images';
import { useDispatch, useSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  HomeData,
  HomeQuickAction,
  HomeSlip,
  HomeStatsRange,
  HomeTrafficLightScoreTone,
} from './types';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  BadgeIndianRupee,
  Banknote,
  BookOpen,
  Calendar,
  Coins,
  GraduationCap,
  Handshake,
  Send,
  UserCheck,
  UserPlus,
} from 'lucide-react-native';
import { getDashboardData } from '@store/slices/app/dashboard/dashboard';
import {
  getMeetingQrCode,
  resetMeetingQrCode,
} from '@store/slices/app/meetings/meetings';
import { getTrafficLightData } from '@store/slices/app/trafficLight/trafficLight';
import type { SlipFormType } from '../slips/types';

type DashboardProfile = {
  name?: string;
  chapter_name?: string;
  renewal_date?: string;
  avatar?: string | null;
};

type DashboardNextMeeting = {
  id?: string | number;
  meeting_id?: string | number;
  elite_meeting_id?: string | number;
  title?: string;
  date?: string;
  time?: string;
  venue?: string;
  mode_of_meeting?: string;
  address?: string;
  can_scan_qr?: boolean;
  show_qr?: boolean;
};

type DashboardActivity = {
  label?: string;
  value?: string | number;
  icon?: string;
};

type DashboardResponse = {
  data?: {
    profile?: DashboardProfile | null;
    next_meeting?: DashboardNextMeeting | null;
    meeting_id?: string | number | null;
    next_meeting_id?: string | number | null;
    current_meeting_id?: string | number | null;
    monthly_activity?: DashboardActivity[];
    activities?: DashboardActivity[];
    time_filter?: string;
  };
};

type TrafficLightMetric = {
  label?: string;
  score?: string | number;
  period_months?: number | null;
  color?: string;
};

type TrafficLightResponse = {
  data?: {
    total_score?: string | number;
    last_updated?: string;
    metrics?: TrafficLightMetric[];
  };
};

type MeetingQrCodeResponse = {
  status?: string;
  data?: {
    qr_data?: string | null;
    meeting_id?: number | null;
    title?: string | null;
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
  nextMeeting: null,
  slips: [
    { id: 'tyfcb', label: 'TYFCBs', value: '0', icon: Handshake },
    {
      id: 'referrals',
      label: 'Referrals',
      value: '0',
      icon: Send,
    },
    { id: 'ceus', label: 'CEUs', value: '0', icon: BookOpen },
    {
      id: 'oneToOnes',
      label: 'One-to-Ones',
      value: '0',
      icon: UserCheck,
    },
  ],
  quickActions: [
    { id: 'training', label: 'Training', icon: GraduationCap },
    {
      id: 'memberAttendance',
      label: 'Member Attendance',
      icon: UserCheck,
    },
    { id: 'event', label: 'Event', icon: Calendar },
    {
      id: 'meetingFees',
      label: 'Meeting Fees',
      icon: BadgeIndianRupee,
    },
    { id: 'membership', label: 'MemberShip', icon: Award },
    // {
    //   id: 'trainingTechnology',
    //   label: 'Training & Technology',
    //   icon: BriefcaseBusiness,
    // },
    // { id: 'cdpsDeposit', label: 'CDPS Deposit', icon: Landmark },
    // { id: 'members', label: 'Members', icon: Users },
    // { id: 'sicilianSpot', label: 'SicilianSpot', icon: Lightbulb },
  ],
  stats: {
    defaultRange: 'LIFETIME',
    ranges: ['6 MONTHS', '12 MONTHS', 'LIFETIME'],
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
    ['D MMMM, YYYY', 'DD MMMM, YYYY', 'D MMM, YYYY', 'DD MMM, YYYY'],
    true,
  );

  if (!parsedDate.isValid()) {
    return 'Expired';
  }

  return parsedDate.isAfter(moment(), 'day') ? 'Active' : 'Expired';
};

const TIME_FILTER_BY_RANGE: Record<HomeStatsRange, string> = {
  '6 MONTHS': '6_months',
  '12 MONTHS': '12_months',
  LIFETIME: 'lifetime',
};

const ACTIVITY_ICONS = {
  handshake: Handshake,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-left': ArrowDownLeft,
  banknote: Banknote,
  coins: Coins,
  'user-plus': UserPlus,
  'graduation-cap': GraduationCap,
} as const;

const SLIP_ICONS = [Handshake, Send, BookOpen, UserCheck];
const FALLBACK_MEETING_QR_ID = 1;

const SLIP_NAVIGATION_TARGETS: Array<{
  labels: string[];
  form: SlipFormType;
}> = [
  {
    labels: ['elite meet', 'elite meets'],
    form: 'meet',
  },
  {
    labels: ['elite referrals given', 'elite referral given'],
    form: 'referral',
  },
  {
    labels: ['elite referrals received', 'elite referral received'],
    form: 'referral',
  },
  {
    labels: [
      'elite close business given',
      'elite close bussiness given',
      'elite close businesses given',
    ],
    form: 'elite',
  },
  {
    labels: [
      'elite close business received',
      'elite close bussiness received',
      'elite close businesses received',
    ],
    form: 'elite',
  },
];

const getActivityIcon = (icon?: string, index = 0) => {
  if (icon && icon in ACTIVITY_ICONS) {
    return ACTIVITY_ICONS[icon as keyof typeof ACTIVITY_ICONS];
  }

  return SLIP_ICONS[index % SLIP_ICONS.length];
};

const normalizeActivityLabel = (label?: string) =>
  (label || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const getSlipNavigationTarget = (label?: string) => {
  const normalizedLabel = normalizeActivityLabel(label);
  const target = SLIP_NAVIGATION_TARGETS.find(item =>
    item.labels.some(
      option => normalizeActivityLabel(option) === normalizedLabel,
    ),
  );

  return target
    ? {
        form: target.form,
      }
    : undefined;
};

const getNextMeetingData = (nextMeeting?: DashboardNextMeeting | null) => {
  if (!nextMeeting) {
    return null;
  }

  return {
    id:
      nextMeeting.id ??
      nextMeeting.meeting_id ??
      nextMeeting.elite_meeting_id ??
      null,
    title: nextMeeting.title || 'NEXT MEETING',
    date: nextMeeting.date || '',
    time: nextMeeting.time || '',
    venue: nextMeeting.venue || '',
    address: nextMeeting.address || '',
    type: nextMeeting.mode_of_meeting
      ? `Meeting: ${nextMeeting.mode_of_meeting}`
      : '',
    linkLabel: 'Online Meeting Link',
    canScanQr: Boolean(nextMeeting.can_scan_qr || nextMeeting.show_qr),
  };
};

const getMeetingQrRequestId = (response?: DashboardResponse) => {
  const data = response?.data;
  const nextMeeting = data?.next_meeting;

  return (
    nextMeeting?.id ??
    nextMeeting?.meeting_id ??
    nextMeeting?.elite_meeting_id ??
    data?.next_meeting_id ??
    data?.meeting_id ??
    data?.current_meeting_id ??
    FALLBACK_MEETING_QR_ID
  );
};

const getActivitySlips = (activities?: DashboardActivity[]): HomeSlip[] => {
  if (!activities?.length) {
    return HOME_DATA.slips;
  }

  return activities.map((activity, index) => ({
    id: `${activity.label || 'activity'}-${index}`,
    label: activity.label || '-',
    value: String(activity.value ?? '0'),
    icon: getActivityIcon(activity.icon, index),
    navigationTarget: getSlipNavigationTarget(activity.label),
  }));
};

const getStatsRows = (monthlyActivity?: DashboardActivity[]) => {
  if (!monthlyActivity?.length) {
    return [];
  }

  return monthlyActivity.map((activity, index) => ({
    id: `${activity.label || 'monthly-activity'}-${index}`,
    label: activity.label || '-',
    value: String(activity.value ?? '0'),
  }));
};

const getTrafficTone = (color?: string): HomeTrafficLightScoreTone => {
  switch (color?.toLowerCase()) {
    case 'green':
      return 'green';
    case 'red':
      return 'red';
    default:
      return 'neutral';
  }
};

const getTotalScoreTone = (
  score?: string | number,
): HomeTrafficLightScoreTone => {
  const numericScore = Number(score ?? 0);

  if (numericScore >= 100) {
    return 'green';
  }

  if (numericScore > 0) {
    return 'red';
  }

  return 'neutral';
};

const getTrafficLightScreenData = (
  trafficLightResponse?: TrafficLightResponse,
): HomeData['trafficLight'] => {
  const trafficLightData = trafficLightResponse?.data;

  if (!trafficLightData) {
    return HOME_DATA.trafficLight;
  }

  return {
    ...HOME_DATA.trafficLight,
    totalScore: String(
      trafficLightData.total_score ?? HOME_DATA.trafficLight.totalScore,
    ),
    totalTone: getTotalScoreTone(trafficLightData.total_score),
    rateLabel: 'Period',
    footer: trafficLightData.last_updated
      ? `Last Updated   ${trafficLightData.last_updated}`
      : HOME_DATA.trafficLight.footer,
    rows: trafficLightData.metrics?.length
      ? trafficLightData.metrics.map((metric, index) => ({
          id: `${metric.label || 'metric'}-${index}`,
          label: metric.label || '-',
          rate: metric.period_months ? `${metric.period_months}M` : '-',
          score: String(metric.score ?? 0),
          tone: getTrafficTone(metric.color),
        }))
      : HOME_DATA.trafficLight.rows,
  };
};

const useHome = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const dashboardRequestRef = useRef(false);
  const refreshRequestStartedRef = useRef(false);
  const dashboardResponse = useSelector(
    state => state.dashboard?.data,
  ) as DashboardResponse;
  const dashboardLoading = useSelector(state => state.dashboard?.loading);
  const trafficLightResponse = useSelector(
    state => state.trafficLight?.data,
  ) as TrafficLightResponse;
  const trafficLightLoading = useSelector(state => state.trafficLight?.loading);
  const qrCodeResponse = useSelector(state => state.meetings?.qrCode?.data) as
    | MeetingQrCodeResponse
    | undefined;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [selectedStatsRange, setSelectedStatsRange] = useState<HomeStatsRange>(
    HOME_DATA.stats.defaultRange,
  );

  const requestHomeData = useCallback(
    (refreshing = false, range: HomeStatsRange) => {
      if (refreshing) {
        setIsRefreshing(true);
      }

      dashboardRequestRef.current = true;
      dispatch(getDashboardData({ time_filter: TIME_FILTER_BY_RANGE[range] }));
      dispatch(getTrafficLightData());
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      !dashboardRequestRef.current ||
      dashboardLoading ||
      !dashboardResponse
    ) {
      return;
    }

    dashboardRequestRef.current = false;
  }, [dashboardLoading, dashboardResponse]);

  useEffect(() => {
    if (!isRefreshing) {
      return;
    }

    if (dashboardLoading || trafficLightLoading) {
      refreshRequestStartedRef.current = true;
      return;
    }

    if (refreshRequestStartedRef.current) {
      refreshRequestStartedRef.current = false;
      setIsRefreshing(false);
    }
  }, [dashboardLoading, isRefreshing, trafficLightLoading]);

  useEffect(() => {
    requestHomeData(false, HOME_DATA.stats.defaultRange);
  }, [requestHomeData]);

  useEffect(() => {
    dispatch(resetMeetingQrCode());
    setIsQrCodeVisible(false);

    if (dashboardResponse) {
      dispatch(getMeetingQrCode(getMeetingQrRequestId(dashboardResponse)));
    }
  }, [dashboardResponse, dispatch]);

  const screenData = useMemo(() => {
    const profile = dashboardResponse?.data?.profile;
    const nextMeeting = dashboardResponse?.data?.next_meeting;
    const activities = dashboardResponse?.data?.activities;
    const trafficLight = getTrafficLightScreenData(trafficLightResponse);

    if (!profile) {
      return {
        ...HOME_DATA,
        nextMeeting: getNextMeetingData(nextMeeting),
        slips: getActivitySlips(activities),
        stats: {
          ...HOME_DATA.stats,
        },
        trafficLight,
      };
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
      nextMeeting: getNextMeetingData(nextMeeting),
      slips: getActivitySlips(activities),
      stats: {
        ...HOME_DATA.stats,
      },
      trafficLight,
    };
  }, [dashboardResponse, trafficLightResponse]);

  const statsRows = useMemo(
    () => getStatsRows(dashboardResponse?.data?.monthly_activity),
    [dashboardResponse],
  );

  const handleStatsRangeChange = useCallback(
    (range: HomeStatsRange) => {
      setSelectedStatsRange(range);
      dashboardRequestRef.current = true;
      dispatch(getDashboardData({ time_filter: TIME_FILTER_BY_RANGE[range] }));
    },
    [dispatch],
  );

  const onQuickActionPress = useCallback((action: HomeQuickAction) => {
    console.log('[Home Quick Action]', {
      id: action.id,
      label: action.label,
    });
  }, []);

  const onSlipPress = useCallback(
    (slip: HomeSlip) => {
      if (!slip.navigationTarget) {
        return;
      }

      navigation.navigate(routes.app.slips, {
        initialForm: slip.navigationTarget.form,
      });
    },
    [navigation],
  );

  const meetingQrData =
    qrCodeResponse?.status === 'success'
      ? qrCodeResponse.data?.qr_data || undefined
      : undefined;

  const onQrCodePress = useCallback(() => {
    if (!meetingQrData) {
      return;
    }

    setIsQrCodeVisible(true);
  }, [meetingQrData]);

  const onCloseQrCode = useCallback(() => {
    setIsQrCodeVisible(false);
  }, []);

  const onMeetingLocationPress = useCallback(() => {
    console.log('[Next Meeting Location]');
  }, []);

  const onRefresh = useCallback(() => {
    if (dashboardLoading || trafficLightLoading) {
      return;
    }

    requestHomeData(true, selectedStatsRange);
  }, [
    dashboardLoading,
    requestHomeData,
    selectedStatsRange,
    trafficLightLoading,
  ]);

  return {
    styles,
    states: {
      isRefreshing,
      isQrCodeVisible,
      meetingQrData,
      statsRows,
      selectedStatsRange,
      screenData,
    },
    handlers: {
      onMeetingLocationPress,
      onCloseQrCode,
      onQrCodePress,
      onRefresh,
      onQuickActionPress,
      onSlipPress,
      setSelectedStatsRange: handleStatsRangeChange,
    },
    constants: {},
  };
};

export default useHome;
