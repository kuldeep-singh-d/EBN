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
      paddingHorizontal: 0,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabs: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      minHeight: moderateHeight(5.4),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    tabText: {
      color: colors.secondary,
      fontSize: moderateHeight(1.35),
    },
    activeTabText: {
      color: colors.primary,
    },
    activeTabLine: {
      left: moderateWidth(11.2),
      right: moderateWidth(11.2),
      bottom: 0,
      height: moderateHeight(0.28),
      position: 'absolute',
      borderRadius: moderateHeight(0.2),
      backgroundColor: colors.primary,
    },
    rosterContainer: {
      flex: 1,
    },
    searchPanel: {
      minHeight: moderateHeight(8),
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      marginBottom: moderateHeight(0.9),
      paddingHorizontal: moderateWidth(5.2),
      backgroundColor: colors.white,
      elevation: 2,
      shadowRadius: 3,
      shadowOpacity: 0.12,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    searchInput: {
      flex: 1,
      height: moderateHeight(5),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: moderateHeight(0.75),
      paddingHorizontal: moderateWidth(3.5),
      paddingRight: moderateWidth(9),
      backgroundColor: colors.white,
    },
    searchIcon: {
      width: moderateWidth(5),
      height: moderateWidth(5),
      color: colors.primary,
    },
    searchIconWrap: {
      position: 'absolute',
      right: moderateWidth(9),
      alignItems: 'center',
      justifyContent: 'center',
    },
    memberList: {
      paddingHorizontal: moderateWidth(4.7),
      paddingTop: moderateHeight(0.8),
      paddingBottom: moderateHeight(2.2),
      rowGap: moderateHeight(1.25),
    },
    memberCard: {
      minHeight: moderateHeight(9.4),
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateHeight(1.25),
      paddingHorizontal: moderateWidth(3.5),
      borderRadius: moderateWidth(1.5),
      backgroundColor: colors.white,
      elevation: 3,
      shadowRadius: 3,
      shadowOpacity: 0.14,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    memberCardPressed: {
      opacity: 0.72,
    },
    avatar: {
      width: moderateWidth(10.6),
      height: moderateWidth(10.6),
      borderRadius: moderateWidth(5.3),
      backgroundColor: colors.background,
    },
    memberInfo: {
      flex: 1,
      marginLeft: moderateWidth(3.2),
    },
    memberName: {
      color: colors.secondary,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(1.95),
    },
    memberMeta: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
      lineHeight: moderateHeight(1.85),
    },
    memberChevron: {
      color: colors.primary,
      fontSize: moderateHeight(3.8),
      lineHeight: moderateHeight(3.8),
      marginLeft: moderateWidth(1.4),
    },
    formContent: {
      paddingHorizontal: moderateWidth(4.7),
      paddingTop: moderateHeight(2.1),
      paddingBottom: moderateHeight(3),
    },
    instructions: {
      color: colors.gray,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(2.05),
      marginHorizontal: moderateWidth(5),
      marginBottom: moderateHeight(2.1),
    },
    formCard: {
      paddingHorizontal: moderateWidth(3.5),
      paddingTop: moderateHeight(2),
      paddingBottom: moderateHeight(1.4),
      marginBottom: moderateHeight(1.8),
      borderRadius: moderateWidth(1.5),
      backgroundColor: colors.white,
      elevation: 3,
      shadowRadius: 3,
      shadowOpacity: 0.14,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    formTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(1.5),
      marginBottom: moderateHeight(2),
    },
    fieldRow: {
      flexDirection: 'row',
      columnGap: moderateWidth(2.6),
    },
    input: {
      height: moderateHeight(4.9),
      borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: moderateHeight(3),
      paddingHorizontal: moderateWidth(3.5),
      marginBottom: moderateHeight(1.6),
      backgroundColor: colors.white,
    },
    inputText: {
      color: colors.text,
      fontSize: moderateHeight(1.45),
      paddingVertical: 0,
      textAlignVertical: 'center',
    },
    placeholder: {
      color: colors.gray,
    },
    countryInput: {
      height: moderateHeight(5.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: moderateHeight(3.2),
      paddingHorizontal: moderateWidth(3.5),
      marginBottom: moderateHeight(2),
      backgroundColor: colors.white,
    },
    countryText: {
      flex: 1,
      color: colors.text,
      fontSize: moderateHeight(1.45),
    },
    downIcon: {
      width: moderateWidth(4.5),
      height: moderateWidth(4.5),
      color: colors.gray,
    },
    searchButton: {
      height: moderateHeight(5.3),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateHeight(3.2),
      marginTop: moderateHeight(0.7),
      backgroundColor: colors.primary,
    },
    searchButtonDisabled: {
      backgroundColor: colors.border,
    },
    searchButtonText: {
      color: colors.white,
      fontSize: moderateHeight(1.65),
    },
  });
};

export default useStyles;
