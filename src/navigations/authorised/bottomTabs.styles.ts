import { StyleSheet } from 'react-native';
import { useDeviceDimensions } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@assets/colors';

export const useStyles = () => {
  const insets = useSafeAreaInsets();
  const { moderateHeight, moderateWidth } = useDeviceDimensions();
  const themeColors = colors.light;

  return StyleSheet.create({
    container: {
      borderRadius: moderateWidth(6),
      marginHorizontal: moderateWidth(3.2),
      // paddingHorizontal: moderateWidth(3),
      backgroundColor: themeColors.background,
      paddingBottom: Math.max(insets.bottom, moderateHeight(0.8)),
    },
    tabBar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: moderateHeight(8.2),
      borderRadius: moderateWidth(6),
      paddingTop: moderateHeight(1.1),
      paddingBottom: moderateHeight(0.85),
      paddingHorizontal: moderateWidth(2.4),
      backgroundColor: themeColors.primary,

      elevation: 10,
      shadowRadius: 14,
      shadowOpacity: 0.16,
      shadowColor: themeColors.secondary,
      shadowOffset: { width: 0, height: 5 },
    },
    tabButton: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: moderateHeight(5.2),
    },
    activeTabButton: {},
    pressedTabButton: {
      opacity: 0.78,
    },
    tabContent: {
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(0.5),
    },
    tabIcon: {
      alignItems: 'center',
      width: moderateWidth(6.5),
      justifyContent: 'center',
      height: moderateWidth(6),
    },
    activeTabIcon: {},
    iconSize: {
      width: moderateWidth(5.6),
      height: moderateWidth(5.6),
    },
    iconColor: {
      color: themeColors.white,
    },
    activeIconColor: {
      color: '#B8BDC6',
    },
    tabLabel: {
      color: themeColors.white,
      fontSize: moderateHeight(1.12),
      lineHeight: moderateHeight(1.35),
      marginTop: moderateHeight(0.2),
    },
    activeTabLabel: {
      color: '#B8BDC6',
    },
    activeIndicator: {
      width: moderateWidth(4.2),
      height: moderateHeight(0.34),
      marginTop: moderateHeight(0.35),
      borderRadius: moderateHeight(0.25),
      backgroundColor: themeColors.white,
    },
  });
};

export default useStyles;
