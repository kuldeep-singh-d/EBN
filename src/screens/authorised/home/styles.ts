import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    content: {
      paddingHorizontal: 0,
    },
    refreshControl: {
      color: colors.primary,
    },
    container: {
      flexGrow: 1,
      paddingTop: moderateHeight(1.15),
      backgroundColor: colors.background,
      paddingBottom: moderateHeight(1.4),
    },
    memberCard: {
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primaryDark,
      borderRadius: moderateHeight(1.8),
      paddingVertical: moderateHeight(1.45),
      paddingHorizontal: moderateWidth(4.4),
      marginHorizontal: moderateWidth(4.2),

      elevation: 3,
      shadowRadius: 5,
      shadowOpacity: 0.16,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    memberGradient: {
      ...StyleSheet.absoluteFill,
    },
    memberGradientStart: {
      color: colors.primary,
    },
    memberGradientEnd: {
      color: colors.primaryDark,
    },
    avatar: {
      zIndex: 1,
      borderWidth: 2,
      width: moderateWidth(13.5),
      height: moderateWidth(13.5),
      borderRadius: moderateWidth(6.75),
      borderColor: colors.white,
    },
    memberInfo: {
      flex: 1,
      zIndex: 1,
      marginLeft: moderateWidth(3.6),
      paddingRight: moderateWidth(14),
    },
    memberName: {
      color: colors.white,
      fontSize: moderateHeight(2.1),
      lineHeight: moderateHeight(2.55),
      textTransform: 'capitalize',
    },
    memberText: {
      color: colors.whiteMuted,
      fontSize: moderateHeight(1.48),
      lineHeight: moderateHeight(1.95),
    },
    statusPill: {
      top: moderateHeight(1.5),
      right: moderateWidth(3.2),
      zIndex: 2,
      position: 'absolute',
      borderRadius: moderateWidth(5),
      paddingVertical: moderateHeight(0.36),
      paddingHorizontal: moderateWidth(2.8),
      backgroundColor: colors.whiteSubtle,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.whiteMuted,
    },
    statusText: {
      color: colors.white,
      fontSize: moderateHeight(1.08),
      lineHeight: moderateHeight(1.35),
      textTransform: 'capitalize',
    },
    chevron: {
      color: colors.white,
      fontSize: moderateHeight(3.1),
      lineHeight: moderateHeight(3),
      marginLeft: moderateWidth(2),
    },
    card: {
      overflow: 'hidden',
      backgroundColor: colors.white,
      marginTop: moderateHeight(1.35),
      borderRadius: moderateHeight(1.8),
      paddingHorizontal: moderateWidth(3.8),
      marginHorizontal: moderateWidth(4.2),
      paddingVertical: moderateHeight(1.45),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,

      elevation: 2,
      shadowRadius: 4,
      shadowOpacity: 0.1,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    meetingCard: {
      backgroundColor: colors.primarySurface,
      borderColor: colors.primaryBorder,
    },
    corner: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      borderTopWidth: moderateWidth(5),
      borderRightWidth: moderateWidth(5),
      borderTopColor: colors.primary,
      borderRightColor: colors.card,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cardTitle: {
      letterSpacing: 0,
      color: colors.primaryDark,
      fontSize: moderateHeight(1.55),
    },
    meetingDate: {
      color: colors.primaryDark,
      fontSize: moderateHeight(2.05),
      lineHeight: moderateHeight(2.55),
      marginTop: moderateHeight(1),
    },
    meetingType: {
      color: colors.gray,
      fontSize: moderateHeight(1.58),
      marginTop: moderateHeight(0.45),
    },
    meetingVenue: {
      color: colors.gray,
      fontSize: moderateHeight(1.52),
      lineHeight: moderateHeight(2),
      marginTop: moderateHeight(0.55),
      textTransform: 'capitalize',
    },
    meetingAddressRow: {
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: moderateHeight(0.35),
    },
    meetingAddress: {
      color: colors.gray,
      paddingTop: moderateWidth(0.6),
      fontSize: moderateHeight(1.35),
      marginRight: moderateWidth(1.5),
      lineHeight: moderateHeight(1.75),
    },
    locationButton: {
      width: moderateWidth(5),
      height: moderateWidth(5),
      borderRadius: moderateWidth(2.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationButtonPressed: {
      opacity: 0.72,
    },
    locationIcon: {
      color: colors.primary,
      width: moderateWidth(4),
      height: moderateWidth(4),
    },
    meetingMetrics: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateHeight(1.25),
    },
    metricGroup: {
      rowGap: moderateHeight(0.8),
    },
    metricRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    metricLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
      minWidth: moderateWidth(15),
    },
    metricValue: {
      color: colors.primaryDark,
      fontSize: moderateHeight(1.35),
    },
    visitorMetric: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingBottom: moderateHeight(0.2),
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateHeight(1.6),
    },
    linkIcon: {
      width: moderateWidth(5.5),
      height: moderateWidth(5.5),
      color: colors.gray,
    },
    linkText: {
      color: colors.primary,
      fontSize: moderateHeight(1.9),
      marginLeft: moderateWidth(1.2),
    },
    qrButton: {
      minHeight: moderateHeight(3.8),
      borderRadius: moderateWidth(1.6),
      backgroundColor: colors.primary,
      marginTop: moderateHeight(1.2),
      paddingHorizontal: moderateWidth(3.2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrButtonPressed: {
      opacity: 0.72,
    },
    qrIcon: {
      width: moderateWidth(4.2),
      height: moderateWidth(4.2),
      color: colors.white,
    },
    qrButtonText: {
      color: colors.white,
      fontSize: moderateHeight(1.5),
      marginLeft: moderateWidth(1.5),
    },
    slipsList: {
      rowGap: moderateHeight(0.5),
      marginTop: moderateHeight(1.45),
    },
    slipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: moderateHeight(4.2),
    },
    slipLabelRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 0,
      paddingRight: moderateWidth(2),
    },
    slipIcon: {
      width: moderateWidth(5.3),
      height: moderateWidth(5.3),
      color: colors.primary,
    },
    slipLabel: {
      flex: 1,
      color: colors.gray,
      fontSize: moderateHeight(1.8),
      lineHeight: moderateHeight(2),
      marginLeft: moderateWidth(2.2),
    },
    slipValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: moderateWidth(34),
      minWidth: moderateWidth(8),
      justifyContent: 'flex-end',
    },
    slipValue: {
      color: colors.primary,
      fontSize: moderateHeight(2.25),
      lineHeight: moderateHeight(2.65),
    },
    plusText: {
      color: colors.primary,
      fontSize: moderateHeight(1.75),
      marginLeft: moderateWidth(1.2),
    },
    quickActionCard: {
      paddingTop: moderateHeight(1.6),
      paddingHorizontal: moderateWidth(1.2),
      paddingBottom: moderateHeight(0.25),
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    quickActionItem: {
      width: '33.333%',
      minHeight: moderateHeight(9.2),
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: moderateWidth(0.8),
      paddingBottom: moderateHeight(1),
    },
    quickActionItemPressed: {
      opacity: 0.72,
    },
    quickActionIconShell: {
      width: moderateWidth(10.2),
      height: moderateWidth(10.2),
      borderRadius: moderateWidth(5.1),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    quickActionIcon: {
      width: moderateWidth(5.8),
      height: moderateWidth(5.8),
      color: colors.primary,
    },
    quickActionLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.15),
      lineHeight: moderateHeight(1.4),
      marginTop: moderateHeight(0.35),
    },
    rangeTabs: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      columnGap: moderateWidth(2.5),
      paddingBottom: moderateHeight(1.1),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    rangeText: {
      color: colors.gray,
      fontSize: moderateHeight(1.28),
    },
    activeRangeText: {
      color: colors.primary,
    },
    statsList: {},
    statRow: {
      minHeight: moderateHeight(4.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    statLabel: {
      flex: 1,
      color: colors.gray,
      fontSize: moderateHeight(1.55),
    },
    statValue: {
      color: colors.gray,
      fontSize: moderateHeight(1.6),
      marginLeft: moderateWidth(3),
    },
    trafficTitle: {
      color: colors.gray,
      fontSize: moderateHeight(1.8),
      lineHeight: moderateHeight(2.45),
      marginBottom: moderateHeight(1.4),
    },
    trafficTotalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: moderateHeight(1.2),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    trafficTotalLabel: {
      flex: 1,
      color: colors.gray,
      fontSize: moderateHeight(1.65),
    },
    trafficHeaderRow: {
      minHeight: moderateHeight(3.2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    trafficNameColumn: {
      flex: 1.25,
    },
    trafficHead: {
      flex: 0.55,
      color: colors.gray,
      textAlign: 'center',
      fontSize: moderateHeight(1.45),
    },
    trafficRow: {
      minHeight: moderateHeight(4.25),
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    trafficLabel: {
      flex: 1.25,
      color: colors.gray,
      fontSize: moderateHeight(1.45),
    },
    trafficRate: {
      flex: 0.55,
      color: colors.gray,
      textAlign: 'center',
      fontSize: moderateHeight(1.55),
    },
    trafficScoreBadge: {
      flex: 0.48,
      minWidth: moderateWidth(10.5),
      paddingVertical: moderateHeight(0.55),
      borderRadius: moderateWidth(1.2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    greenScoreBadge: {
      backgroundColor: colors.toastSuccess,
    },
    redScoreBadge: {
      backgroundColor: colors.toastError,
    },
    neutralScoreBadge: {
      backgroundColor: colors.border,
    },
    trafficScoreText: {
      color: colors.primaryDark,
      fontSize: moderateHeight(1.6),
    },
    trafficFooter: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
      lineHeight: moderateHeight(1.85),
      marginTop: moderateHeight(1.5),
      marginBottom: moderateHeight(0.5),
    },
  });
};

export default useStyles;
