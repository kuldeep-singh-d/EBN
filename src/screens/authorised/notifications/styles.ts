import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    content: {
      paddingHorizontal: 0,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerTitle: {
      marginLeft: 0,
      color: colors.secondary,
      fontSize: moderateHeight(2.05),
      letterSpacing: 0,
      textTransform: 'uppercase',
    },
    headerIcon: {
      color: colors.primary,
    },
    notificationRow: {
      flexDirection: 'row',
      minHeight: moderateHeight(6.1),
      paddingRight: moderateWidth(4.5),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      backgroundColor: colors.white,
    },
    unreadColumn: {
      width: moderateWidth(6),
      alignItems: 'center',
      paddingTop: moderateHeight(2.8),
    },
    unreadDot: {
      width: moderateWidth(1.25),
      height: moderateWidth(1.25),
      borderRadius: moderateWidth(0.65),
      backgroundColor: colors.primary,
    },
    notificationContent: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: moderateHeight(0.75),
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sender: {
      flex: 1,
      color: colors.secondary,
      fontSize: moderateHeight(1.58),
      lineHeight: moderateHeight(2.15),
      marginRight: moderateWidth(2),
    },
    timeAgo: {
      color: colors.gray,
      fontSize: moderateHeight(1.22),
      lineHeight: moderateHeight(1.7),
    },
    message: {
      color: colors.gray,
      fontSize: moderateHeight(1.48),
      lineHeight: moderateHeight(2),
    },
    unreadMessage: {
      color: colors.primary,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: moderateHeight(8),
    },
    emptyText: {
      color: colors.gray,
      fontSize: moderateHeight(1.6),
    },
  });
};

export default useStyles;
