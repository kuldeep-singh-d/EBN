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
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingBottom: moderateHeight(2),
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      // paddingTop: moderateHeight(1.8),
      paddingBottom: moderateHeight(1.5),
      paddingHorizontal: moderateWidth(5),
    },
    avatar: {
      borderWidth: 1,
      width: moderateWidth(16),
      height: moderateWidth(16),
      borderRadius: moderateWidth(8),
      borderColor: colors.background,
    },
    memberInfo: {
      flex: 1,
      marginLeft: moderateWidth(3.6),
    },
    memberName: {
      color: colors.primary,
      fontSize: moderateHeight(2.35),
      lineHeight: moderateHeight(3),
      textTransform: 'capitalize',
    },
    memberText: {
      color: colors.gray,
      fontSize: moderateHeight(1.65),
      lineHeight: moderateHeight(2.25),
    },
    chevron: {
      color: colors.primary,
      fontSize: moderateHeight(3.8),
      lineHeight: moderateHeight(3.8),
      marginLeft: moderateWidth(2),
    },
    card: {
      overflow: 'hidden',
      backgroundColor: colors.white,
      marginTop: moderateHeight(1.8),
      borderRadius: moderateHeight(2),
      paddingHorizontal: moderateWidth(4),
      marginHorizontal: moderateWidth(4.7),
      paddingVertical: moderateHeight(1.6),

      elevation: 3,
      shadowRadius: 3,
      shadowOpacity: 0.16,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
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
      justifyContent: 'space-between',
    },
    headerSpacer: {
      width: moderateWidth(5.6),
    },
    cardTitle: {
      color: colors.gray,
      fontSize: moderateHeight(1.55),
      letterSpacing: 0,
    },
    eyeIcon: {
      width: moderateWidth(5.8),
      height: moderateWidth(5.8),
      color: colors.gray,
    },
    meetingDate: {
      color: colors.primary,
      fontSize: moderateHeight(2.35),
      lineHeight: moderateHeight(3.1),
      marginTop: moderateHeight(1.4),
    },
    meetingType: {
      color: colors.gray,
      fontSize: moderateHeight(1.8),
      marginTop: moderateHeight(0.8),
    },
    meetingMetrics: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateHeight(2),
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
      fontSize: moderateHeight(1.45),
      minWidth: moderateWidth(18),
    },
    metricValue: {
      color: colors.gray,
      fontSize: moderateHeight(1.45),
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
      fontSize: moderateHeight(1.8),
      marginLeft: moderateWidth(1.2),
    },
    slipsList: {
      marginTop: moderateHeight(2),
      rowGap: moderateHeight(1.1),
    },
    slipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    slipLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    slipIcon: {
      width: moderateWidth(7),
      height: moderateWidth(7),
      color: colors.text,
    },
    slipLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.8),
      marginLeft: moderateWidth(3),
    },
    slipValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: moderateWidth(10),
      justifyContent: 'flex-end',
    },
    slipValue: {
      color: colors.primary,
      fontSize: moderateHeight(3.15),
      lineHeight: moderateHeight(3.9),
    },
    plusText: {
      color: colors.primary,
      fontSize: moderateHeight(2.2),
      marginLeft: moderateWidth(2.2),
    },
    quickActionCard: {
      paddingHorizontal: moderateWidth(1.4),
      paddingTop: moderateHeight(1.8),
      paddingBottom: moderateHeight(0.4),
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    quickActionItem: {
      width: '33.333%',
      minHeight: moderateHeight(10.6),
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: moderateWidth(0.8),
      paddingBottom: moderateHeight(1.4),
    },
    quickActionItemPressed: {
      opacity: 0.72,
    },
    quickActionIcon: {
      width: moderateWidth(10.6),
      height: moderateWidth(10.6),
      color: colors.primary,
    },
    quickActionLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.2),
      lineHeight: moderateHeight(1.58),
      marginTop: moderateHeight(0.55),
    },
    rangeTabs: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      columnGap: moderateWidth(3),
      paddingBottom: moderateHeight(1.5),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    rangeText: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
    },
    activeRangeText: {
      color: colors.primary,
    },
    statsList: {},
    statRow: {
      minHeight: moderateHeight(5.4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    statLabel: {
      flex: 1,
      color: colors.gray,
      fontSize: moderateHeight(1.75),
    },
    statValue: {
      color: colors.gray,
      fontSize: moderateHeight(1.85),
      marginLeft: moderateWidth(3),
    },
    trafficTitle: {
      color: colors.gray,
      fontSize: moderateHeight(2.35),
      lineHeight: moderateHeight(3.1),
      marginBottom: moderateHeight(2.2),
    },
    trafficTotalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: moderateHeight(1.8),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    trafficTotalLabel: {
      flex: 1,
      color: colors.gray,
      fontSize: moderateHeight(2),
    },
    trafficHeaderRow: {
      minHeight: moderateHeight(4.2),
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
      fontSize: moderateHeight(1.75),
    },
    trafficRow: {
      minHeight: moderateHeight(5.6),
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    trafficLabel: {
      flex: 1.25,
      color: colors.gray,
      fontSize: moderateHeight(1.65),
    },
    trafficRate: {
      flex: 0.55,
      color: colors.gray,
      textAlign: 'center',
      fontSize: moderateHeight(1.95),
    },
    trafficScoreBadge: {
      flex: 0.48,
      minWidth: moderateWidth(13),
      paddingVertical: moderateHeight(0.8),
      borderRadius: moderateWidth(1.5),
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
      color: colors.black,
      fontSize: moderateHeight(2.05),
    },
    trafficFooter: {
      color: colors.gray,
      fontSize: moderateHeight(1.55),
      lineHeight: moderateHeight(2.3),
      marginTop: moderateHeight(2.4),
      marginBottom: moderateHeight(0.5),
    },
  });
};

export default useStyles;
