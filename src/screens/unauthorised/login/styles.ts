import { colors } from '@assets/colors';
import { StyleSheet } from 'react-native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { width, moderateWidth, moderateHeight } = useDeviceDimensions();
  const authColors = colors.light;

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: authColors.background,
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: authColors.background,
      paddingHorizontal: moderateWidth(9),
    },
    logoSection: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateHeight(7),
      marginBottom: moderateHeight(5),
    },
    logo: {
      width: Math.min(width * 0.56, 260),
      height: moderateHeight(12.8),
    },
    form: {
      width: '100%',
      marginTop: moderateHeight(5),
    },
    input: {
      height: moderateHeight(6.2),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: authColors.primaryBorder,
      borderRadius: moderateWidth(2.4),
      backgroundColor: authColors.primarySurface,
      paddingHorizontal: moderateWidth(4),
      shadowColor: authColors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 1,
    },
    inputText: {
      color: authColors.text,
      fontSize: moderateHeight(1.9),
    },
    placeholder: {
      color: authColors.gray,
    },
    button: {
      alignSelf: 'center',
      width: '100%',
      height: moderateHeight(6.2),
      marginTop: moderateHeight(2.4),
      borderRadius: moderateWidth(2.5),
      shadowColor: authColors.primaryDark,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.16,
      shadowRadius: 9,
      elevation: 3,
    },
    buttonLabel: {
      color: authColors.white,
      fontSize: moderateHeight(2.15),
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
