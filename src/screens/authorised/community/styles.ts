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
      backgroundColor: colors.background,
    },
    hero: {
      paddingTop: moderateHeight(4.6),
      paddingHorizontal: moderateWidth(7.2),
    },
    heroTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(5.3),
      lineHeight: moderateHeight(6.5),
    },
    heroSubtitle: {
      color: colors.primary,
      marginTop: moderateHeight(0.8),
      fontSize: moderateHeight(2),
    },
    actionsGrid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: moderateWidth(7),
      marginTop: moderateHeight(5.3),
      rowGap: moderateHeight(3.3),
      columnGap: moderateWidth(4.5),
    },
    actionItem: {
      width: moderateWidth(25),
      alignItems: 'center',
    },
    iconCard: {
      width: moderateWidth(20.8),
      height: moderateWidth(20.8),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateWidth(1.8),
      backgroundColor: colors.primary,
    },
    actionIcon: {
      width: moderateWidth(9),
      height: moderateWidth(9),
      color: colors.white,
    },
    actionLabel: {
      marginTop: moderateHeight(1.6),
      color: colors.primary,
      fontSize: moderateHeight(1.55),
    },
  });
};

export default useStyles;
