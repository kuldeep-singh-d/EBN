import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    content: {
      paddingHorizontal: 0,
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: moderateWidth(4.2),
      paddingTop: moderateHeight(1.4),
      paddingBottom: moderateHeight(3),
      backgroundColor: colors.background,
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
    headerBlock: {
      paddingVertical: moderateHeight(1.4),
      paddingHorizontal: moderateWidth(0.8),
    },
    sectionTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(2.2),
      lineHeight: moderateHeight(2.75),
    },
    sectionSubtitle: {
      color: colors.gray,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(2.05),
      marginTop: moderateHeight(0.25),
    },
    menuCard: {
      overflow: 'hidden',
      borderRadius: moderateHeight(1.6),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginTop: moderateHeight(1),

      elevation: 2,
      shadowRadius: 4,
      shadowOpacity: 0.08,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    menuRow: {
      minHeight: moderateHeight(6.7),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateWidth(3.8),
      backgroundColor: colors.white,
    },
    menuRowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    menuRowPressed: {
      backgroundColor: colors.primarySurface,
    },
    iconShell: {
      width: moderateWidth(9.4),
      height: moderateWidth(9.4),
      borderRadius: moderateWidth(4.7),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    dangerIconShell: {
      backgroundColor: colors.toastError,
      borderColor: colors.toastError,
    },
    menuIcon: {
      width: moderateWidth(5),
      height: moderateWidth(5),
      color: colors.primary,
    },
    dangerIcon: {
      color: colors.brandRed,
    },
    menuLabel: {
      flex: 1,
      color: colors.secondary,
      fontSize: moderateHeight(1.68),
      lineHeight: moderateHeight(2.25),
      marginLeft: moderateWidth(3.2),
    },
    dangerLabel: {
      color: colors.brandRed,
    },
    chevron: {
      width: moderateWidth(4.8),
      height: moderateWidth(4.8),
      color: colors.gray,
    },
    version: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
      lineHeight: moderateHeight(1.9),
      marginTop: moderateHeight(2.2),
    },
  });
};

export default useStyles;
