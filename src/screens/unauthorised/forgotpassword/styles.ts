import { StyleSheet } from 'react-native';

import { colors } from '@assets/colors';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { width, moderateWidth, moderateHeight } = useDeviceDimensions();
  const authColors = colors.light;

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: authColors.white,
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: moderateWidth(8),
      backgroundColor: authColors.white,
    },
    logoSection: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateHeight(10),
    },
    logo: {
      width: Math.min(width * 0.52, 255),
      height: moderateHeight(20),
    },
    titleSection: {
      width: '100%',
      alignItems: 'center',
      marginTop: moderateHeight(0.8),
    },
    title: {
      color: authColors.gray,
      fontSize: moderateHeight(2.6),
    },
    divider: {
      width: '100%',
      height: 1,
      marginTop: moderateHeight(1.2),
      backgroundColor: authColors.border,
    },
    form: {
      width: '100%',
      marginTop: moderateHeight(3.8),
    },
    input: {
      height: moderateHeight(5.8),
      borderWidth: 1,
      borderColor: authColors.border,
      borderRadius: moderateWidth(1.3),
      backgroundColor: authColors.white,
      paddingHorizontal: moderateWidth(3),
    },
    inputText: {
      color: authColors.text,
      fontSize: moderateHeight(2),
    },
    placeholder: {
      color: authColors.placeholder,
    },
    button: {
      alignSelf: 'center',
      width: moderateWidth(36),
      height: moderateHeight(5.5),
      marginTop: moderateHeight(2.2),
      borderRadius: moderateWidth(9),
      backgroundColor: authColors.primary,
    },
    buttonLabel: {
      color: authColors.white,
      fontSize: moderateHeight(2),
    },
    successText: {
      color: authColors.primary,
      fontSize: moderateHeight(1.5),
      marginTop: moderateHeight(-0.4),
      marginBottom: moderateHeight(0.6),
    },
    footerLink: {
      marginTop: 'auto',
      marginBottom: moderateHeight(12.5),
    },
    footerLinkText: {
      color: authColors.primary,
      fontSize: moderateHeight(2.1),
    },
  });
};

export default useStyles;
