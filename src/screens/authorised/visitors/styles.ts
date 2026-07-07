import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    header: {
      minHeight: moderateHeight(6.3),
      paddingVertical: moderateHeight(1),
      paddingHorizontal: moderateWidth(4),
      backgroundColor: colors.primary,
    },
    headerTitle: {
      color: colors.white,
      fontSize: moderateHeight(2.1),
      textTransform: 'none',
    },
    content: {
      paddingHorizontal: moderateWidth(5.2),
      paddingTop: moderateHeight(2),
      paddingBottom: moderateHeight(3),
      backgroundColor: colors.white,
    },
    form: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
    inputWrapper: {
      height: moderateHeight(5.4),
      borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: moderateHeight(2.7),
      paddingLeft: moderateWidth(4),
      paddingRight: moderateWidth(2.4),
      backgroundColor: colors.white,
    },
    inputText: {
      color: colors.text,
      fontSize: moderateHeight(1.45),
      height: moderateHeight(5.2),
    },
    placeholder: {
      color: colors.gray,
    },
    iconBubble: {
      width: moderateWidth(8.2),
      height: moderateWidth(8.2),
      borderRadius: moderateWidth(4.1),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.toastError,
      marginLeft: moderateWidth(2),
    },
    fieldIcon: {
      width: moderateWidth(4.7),
      height: moderateWidth(4.7),
      color: colors.primary,
    },
    dropdownIcon: {
      width: moderateWidth(5.2),
      height: moderateWidth(5.2),
      color: colors.primary,
    },
    confirmButton: {
      height: moderateHeight(5.4),
      borderRadius: moderateHeight(2.7),
      marginHorizontal: moderateWidth(1.8),
      marginTop: moderateHeight(3.6),
      backgroundColor: colors.primary,
    },
    confirmButtonDisabled: {
      backgroundColor: colors.border,
      opacity: 1,
    },
    confirmButtonText: {
      color: colors.white,
      fontSize: moderateHeight(1.55),
    },
  });
};

export default useStyles;
