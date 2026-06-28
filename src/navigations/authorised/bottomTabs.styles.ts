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
      borderRadius: moderateWidth(8),
      marginHorizontal: moderateWidth(3),
      // paddingHorizontal: moderateWidth(3),
      backgroundColor: themeColors.background,
      paddingBottom: Math.max(insets.bottom, moderateHeight(1.1)),
    },
    tabBar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: moderateHeight(10),
      borderRadius: moderateWidth(8),
      paddingTop: moderateHeight(1.8),
      paddingBottom: moderateHeight(1.2),
      paddingHorizontal: moderateWidth(3),
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
      minHeight: moderateHeight(6.5),
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
      width: moderateWidth(8),
      justifyContent: 'center',
      height: moderateWidth(7.2),
    },
    activeTabIcon: {},
    iconSize: {
      width: moderateWidth(7),
      height: moderateWidth(7),
    },
    iconColor: {
      color: themeColors.white,
    },
    activeIconColor: {
      color: '#B8BDC6',
    },
    tabLabel: {
      color: themeColors.white,
      fontSize: moderateHeight(1.15),
      lineHeight: moderateHeight(1.6),
      marginTop: moderateHeight(0.35),
    },
    activeTabLabel: {
      color: '#B8BDC6',
    },
    activeIndicator: {
      width: moderateWidth(5),
      height: moderateHeight(0.45),
      marginTop: moderateHeight(0.45),
      borderRadius: moderateHeight(0.25),
      backgroundColor: themeColors.white,
    },
  });
};

export default useStyles;
