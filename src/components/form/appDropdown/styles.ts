import fonts from '@assets/fonts';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      zIndex: 1,
      marginTop: moderateHeight(1),
    },
    wrapperOpen: {
      zIndex: 20,
    },
    title: {
      flex: 1,
      color: colors.text as string,
      marginBottom: moderateHeight(0.3),
    },
    inputWrapper: {
      minHeight: moderateHeight(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateHeight(0.5),
      paddingHorizontal: moderateWidth(4),
      borderRadius: moderateWidth(2.5),
      backgroundColor: colors.white as string,
      borderWidth: moderateWidth(0.4),
      borderColor: colors.border as string,
    },
    inputWrapperOpen: {
      borderColor: colors.primary as string,
      borderBottomLeftRadius: moderateWidth(1.2),
      borderBottomRightRadius: moderateWidth(1.2),
    },
    disabledInputWrapper: {
      opacity: 0.65,
    },
    leftIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: moderateWidth(3),
    },
    rightElement: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: moderateWidth(2),
    },
    placeholderText: {
      flex: 1,
    },
    selectedText: {
      flex: 1,
    },
    clearButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: moderateWidth(2),
    },
    clearIcon: {
      width: moderateWidth(4),
      height: moderateWidth(4),
      color: colors.gray as string,
    },
    chevronIcon: {
      width: moderateWidth(4.5),
      height: moderateWidth(4.5),
      color: colors.primary as string,
    },
    errorText: {
      textAlign: 'right',
      marginTop: moderateHeight(0.5),
    },
    chipsScrollContainer: {
      flex: 1,
      maxHeight: moderateHeight(4),
    },
    chipsContentContainer: {
      alignItems: 'center',
      columnGap: moderateWidth(1.5),
    },
    chip: {
      maxWidth: moderateWidth(42),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: moderateWidth(4),
      paddingVertical: moderateHeight(0.3),
      paddingHorizontal: moderateWidth(2.5),
      backgroundColor: colors.primarySurface as string,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder as string,
    },
    chipLabel: {
      flexShrink: 1,
      fontFamily: fonts.medium,
      fontSize: moderateHeight(1.35),
      color: colors.primary as string,
    },
    chipClose: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: moderateWidth(1),
    },
    chipCloseIcon: {
      width: moderateWidth(3.2),
      height: moderateWidth(3.2),
      color: colors.primary as string,
    },
    inlinePanel: {
      maxHeight: moderateHeight(30),
      overflow: 'hidden',
      marginTop: moderateHeight(0.45),
      borderRadius: moderateWidth(2.2),
      backgroundColor: colors.white as string,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder as string,
      elevation: 6,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.14,
      shadowRadius: 10,
    },
    searchContainer: {
      paddingHorizontal: moderateWidth(2.2),
      paddingTop: moderateHeight(1),
      paddingBottom: moderateHeight(0.6),
      backgroundColor: colors.white as string,
    },
    searchInput: {
      height: moderateHeight(4.7),
      color: colors.text as string,
      fontFamily: fonts.regular,
      fontSize: moderateHeight(1.45),
      paddingVertical: 0,
      paddingHorizontal: moderateWidth(3),
      borderRadius: moderateWidth(1.8),
      backgroundColor: colors.primarySurface as string,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder as string,
    },
    listContentContainer: {
      paddingVertical: moderateHeight(0.45),
      paddingHorizontal: moderateWidth(1.2),
    },
    itemRow: {
      minHeight: moderateHeight(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateHeight(0.8),
      paddingHorizontal: moderateWidth(2.6),
      borderRadius: moderateWidth(1.7),
    },
    itemRowSelected: {
      backgroundColor: colors.primarySurface as string,
    },
    itemRowPressed: {
      opacity: 0.72,
    },
    itemLabel: {
      flex: 1,
      fontFamily: fonts.regular,
      color: colors.text as string,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(1.95),
    },
    itemSelected: {
      fontFamily: fonts.medium,
      color: colors.primary as string,
    },
    checkIcon: {
      width: moderateWidth(6),
      height: moderateWidth(6),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: moderateWidth(2),
      borderRadius: moderateWidth(3),
      backgroundColor: colors.primary as string,
    },
    checkGlyph: {
      width: moderateWidth(3.5),
      height: moderateWidth(3.5),
      color: colors.white as string,
    },
    emptyContainer: {
      minHeight: moderateHeight(8),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: moderateHeight(2),
      paddingHorizontal: moderateWidth(3),
    },
    emptyText: {
      color: colors.gray as string,
      fontFamily: fonts.regular,
      fontSize: moderateHeight(1.4),
      lineHeight: moderateHeight(1.9),
    },
    doneButton: {
      minHeight: moderateHeight(4.8),
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: moderateWidth(1.2),
      marginBottom: moderateHeight(1),
      borderRadius: moderateWidth(1.8),
      backgroundColor: colors.primary as string,
    },
    doneText: {
      color: colors.white as string,
      fontSize: moderateHeight(1.35),
    },
  });
};

export default useStyles;
