import { StyleSheet } from 'react-native';
import { useDeviceDimensions } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
  const insets = useSafeAreaInsets();
  const { moderateHeight, moderateWidth } = useDeviceDimensions();

  return StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: moderateWidth(3),
      paddingBottom: Math.max(insets.bottom, moderateHeight(1.1)),
    },
    tabBar: {
      width: '100%',
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#E3F2E6',
      padding: moderateWidth(1),
      backgroundColor: '#FFFFFF',
      minHeight: moderateHeight(8),
      borderRadius: moderateWidth(5),

      elevation: 10,
      shadowRadius: 14,
      shadowOpacity: 0.16,
      shadowColor: '#087E8B',
      shadowOffset: { width: 0, height: 5 },
    },
    tabButton: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: moderateHeight(6.2),
      borderRadius: moderateWidth(3),
    },
    activeTabButton: {
      backgroundColor: '#E8F8ED',
    },
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
      width: moderateWidth(7),
      height: moderateWidth(7),
      borderRadius: moderateWidth(3.5),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F4F6',
    },
    activeTabIcon: {
      backgroundColor: '#31C44C',
    },
    tabIconLabel: {
      color: '#607578',
      fontSize: moderateHeight(1.4),
      lineHeight: moderateHeight(1.8),
    },
    activeTabIconLabel: {
      color: '#FFFFFF',
    },
    tabLabel: {
      color: '#607578',
      fontSize: moderateHeight(1.15),
      lineHeight: moderateHeight(1.6),
      marginTop: moderateHeight(0.35),
    },
    activeTabLabel: {
      color: '#14201A',
    },
  });
};

export default useStyles;
