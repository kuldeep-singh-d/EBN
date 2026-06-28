import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    header: {
      paddingVertical: moderateHeight(1.5),
      paddingHorizontal: moderateWidth(3.2),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      backgroundColor: colors.white,
      elevation: 2,
      shadowColor: colors.border,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 3,
    },
    headerTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(2.6),
    },
    headerIcon: {
      width: moderateHeight(3.2),
      height: moderateHeight(3.2),
      color: colors.primary,
    },
    content: {
      paddingHorizontal: 0,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    inviteSection: {
      width: '100%',
      alignItems: 'center',
      marginTop: moderateHeight(4.6),
    },
    registerSection: {
      width: '100%',
      alignItems: 'center',
      marginTop: moderateHeight(4.9),
    },
    sectionTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(2.1),
      letterSpacing: 0,
    },
    inviteRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: moderateWidth(2.8),
      marginTop: moderateHeight(2.5),
    },
    registerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: moderateWidth(2.8),
      marginTop: moderateHeight(2.6),
    },
    actionCard: {
      width: moderateWidth(22.8),
      height: moderateHeight(13.2),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
    },
    actionIcon: {
      width: moderateWidth(8.8),
      height: moderateWidth(8.8),
      color: colors.primary,
    },
    actionLabel: {
      marginTop: moderateHeight(1.9),
      color: colors.primary,
      fontSize: moderateHeight(2.2),
    },
  });
};

export default useStyles;
