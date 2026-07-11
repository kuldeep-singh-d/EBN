import { StyleSheet } from 'react-native';

import { colors } from '@assets/colors';
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
      paddingHorizontal: moderateWidth(8),
      backgroundColor: authColors.background,
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
      marginTop: moderateHeight(2.6),
      borderRadius: moderateWidth(2.5),
      shadowColor: authColors.primaryDark,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.16,
      shadowRadius: 9,
      elevation: 3,
    },
    buttonLabel: {
      color: authColors.white,
      fontSize: moderateHeight(2.05),
    },
    errorText: {
      color: authColors.gray,
      fontSize: moderateHeight(1.5),
      marginTop: moderateHeight(-0.4),
      marginBottom: moderateHeight(0.6),
    },
    successContent: {
      width: '100%',
      alignItems: 'center',
      marginTop: moderateHeight(4.6),
    },
    mailIcon: {
      width: moderateWidth(32),
      height: moderateHeight(12),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: moderateHeight(4.2),
    },
    envelope: {
      width: moderateWidth(26),
      height: moderateHeight(8.4),
      overflow: 'hidden',
      borderWidth: 1,
      borderRadius: moderateWidth(0.6),
      borderColor: authColors.border,
      backgroundColor: authColors.primarySurface,
    },
    envelopeLineLeft: {
      position: 'absolute',
      left: moderateWidth(-1.1),
      top: moderateHeight(1.7),
      width: moderateWidth(16),
      height: 1,
      backgroundColor: authColors.border,
      transform: [{ rotate: '33deg' }],
    },
    envelopeLineRight: {
      position: 'absolute',
      right: moderateWidth(-1.1),
      top: moderateHeight(1.7),
      width: moderateWidth(16),
      height: 1,
      backgroundColor: authColors.border,
      transform: [{ rotate: '-33deg' }],
    },
    envelopeLineBottomLeft: {
      position: 'absolute',
      left: moderateWidth(-0.8),
      bottom: moderateHeight(1.6),
      width: moderateWidth(16),
      height: 1,
      backgroundColor: authColors.border,
      transform: [{ rotate: '-31deg' }],
    },
    envelopeLineBottomRight: {
      position: 'absolute',
      right: moderateWidth(-0.8),
      bottom: moderateHeight(1.6),
      width: moderateWidth(16),
      height: 1,
      backgroundColor: authColors.border,
      transform: [{ rotate: '31deg' }],
    },
    checkBadge: {
      position: 'absolute',
      right: moderateWidth(0.4),
      bottom: moderateHeight(0.2),
      width: moderateWidth(10),
      height: moderateWidth(10),
      borderWidth: moderateWidth(0.8),
      borderRadius: moderateWidth(5),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: authColors.white,
      backgroundColor: authColors.primary,
    },
    checkMark: {
      width: moderateWidth(2.7),
      height: moderateWidth(5.1),
      marginTop: moderateHeight(-0.8),
      borderRightWidth: moderateWidth(0.6),
      borderBottomWidth: moderateWidth(0.6),
      borderColor: authColors.white,
      transform: [{ rotate: '45deg' }],
    },
    successMessage: {
      color: authColors.gray,
      lineHeight: moderateHeight(3),
      fontSize: moderateHeight(2),
      paddingHorizontal: moderateWidth(2),
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
