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
      paddingHorizontal: moderateWidth(4.7),
      paddingTop: moderateHeight(1.4),
      paddingBottom: moderateHeight(3.4),
      backgroundColor: colors.background,
    },
    form: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
    summaryCard: {
      minHeight: moderateHeight(8.6),
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateHeight(1.45),
      paddingVertical: moderateHeight(1.35),
      paddingHorizontal: moderateWidth(3.6),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      elevation: 2,
      shadowRadius: 5,
      shadowOpacity: 0.08,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    summaryIcon: {
      width: moderateWidth(12),
      height: moderateWidth(12),
      borderRadius: moderateWidth(6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    summaryIconGlyph: {
      width: moderateWidth(5.6),
      height: moderateWidth(5.6),
      color: colors.primary,
    },
    summaryTextBlock: {
      flex: 1,
      minWidth: 0,
      marginLeft: moderateWidth(3.2),
    },
    summaryTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(1.75),
      lineHeight: moderateHeight(2.25),
    },
    summaryText: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
      lineHeight: moderateHeight(1.9),
      marginTop: moderateHeight(0.25),
    },
    sectionCard: {
      paddingTop: moderateHeight(1.6),
      paddingBottom: moderateHeight(0.4),
      paddingHorizontal: moderateWidth(3.4),
      marginBottom: moderateHeight(1.45),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      elevation: 2,
      shadowRadius: 5,
      shadowOpacity: 0.08,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    sectionHeader: {
      minHeight: moderateHeight(2.4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateHeight(1.2),
    },
    sectionTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(1.55),
    },
    sectionMeta: {
      color: colors.primary,
      fontSize: moderateHeight(1.2),
    },
    inputWrapper: {
      height: moderateHeight(5.7),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
      borderRadius: moderateWidth(2),
      paddingLeft: moderateWidth(3.2),
      paddingRight: moderateWidth(2.8),
      backgroundColor: colors.primarySurface,
    },
    inputText: {
      color: colors.text,
      fontSize: moderateHeight(1.48),
      height: moderateHeight(5.4),
    },
    placeholder: {
      color: colors.gray,
    },
    iconBubble: {
      width: moderateWidth(7.2),
      height: moderateWidth(7.2),
      borderRadius: moderateWidth(3.6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    iconBubblePressed: {
      opacity: 0.72,
    },
    fieldIcon: {
      width: moderateWidth(4),
      height: moderateWidth(4),
      color: colors.primary,
    },
    dropdownIcon: {
      width: moderateWidth(4.8),
      height: moderateWidth(4.8),
      color: colors.primary,
    },
    confirmButton: {
      height: moderateHeight(5.9),
      borderRadius: moderateWidth(2.4),
      marginTop: moderateHeight(1),
      marginBottom: moderateHeight(1),
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.16,
      shadowRadius: 9,
      elevation: 3,
    },
    confirmButtonText: {
      color: colors.white,
      fontSize: moderateHeight(1.7),
    },
  });
};

export default useStyles;
