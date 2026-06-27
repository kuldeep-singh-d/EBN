import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    label: {
      marginTop: moderateHeight(2),
    },
    heroIcon: {
      width: moderateWidth(13),
      height: moderateWidth(13),
      color: colors.primary,
    },
  });
};

export default useStyles;
