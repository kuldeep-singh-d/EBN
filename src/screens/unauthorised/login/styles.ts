import { colors } from '@assets/colors';
import { StyleSheet } from 'react-native';
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
      backgroundColor: authColors.white,
      paddingHorizontal: moderateWidth(9),
    },
    logoSection: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateHeight(5),
    },
    logo: {
      height: moderateHeight(21),
      width: Math.min(width * 0.52, 255),
    },
    form: {
      width: '100%',
      marginTop: moderateHeight(5),
    },
    input: {
      borderWidth: 1,
      height: moderateHeight(5.8),
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
      width: moderateWidth(34),
      height: moderateHeight(5.5),
      marginTop: moderateHeight(1.8),
      borderRadius: moderateWidth(9),
      backgroundColor: authColors.primary,
    },
    buttonLabel: {
      color: authColors.white,
      fontSize: moderateHeight(2),
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
