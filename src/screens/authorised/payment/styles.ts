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
    headerIcon: {
      color: colors.white,
    },
    headerAction: {
      width: moderateHeight(3.6),
      height: moderateHeight(3.6),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateWidth(1.5),
    },
    activeHeaderAction: {
      backgroundColor: colors.whiteSubtle,
    },
    headerActionPressed: {
      opacity: 0.72,
    },
    headerActionIcon: {
      width: moderateHeight(2.4),
      height: moderateHeight(2.4),
      color: colors.white,
    },
    activeHeaderActionIcon: {
      color: colors.white,
    },
    content: {
      paddingHorizontal: 0,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabRow: {
      flexDirection: 'row',
      marginTop: moderateHeight(1),
      marginHorizontal: moderateWidth(4.7),
      padding: moderateWidth(0.8),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    tab: {
      flex: 1,
      minHeight: moderateHeight(4.5),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateWidth(1.8),
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      color: colors.gray,
      fontSize: moderateHeight(1.35),
    },
    activeTabText: {
      color: colors.white,
    },
    filterCard: {
      position: 'absolute',
      zIndex: 10,
      top: moderateHeight(1.2),
      right: moderateWidth(4.7),
      width: moderateWidth(62),
      paddingVertical: moderateHeight(0.8),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      elevation: 8,
      shadowRadius: 10,
      shadowOpacity: 0.18,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 5 },
    },
    filterArrow: {
      position: 'absolute',
      top: moderateHeight(-0.75),
      right: moderateWidth(3.3),
      width: moderateHeight(1.5),
      height: moderateHeight(1.5),
      transform: [{ rotate: '45deg' }],
      backgroundColor: colors.white,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    filterItem: {
      minHeight: moderateHeight(5.4),
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(4),
    },
    activeFilterItem: {
      backgroundColor: colors.primarySurface,
    },
    filterItemPressed: {
      opacity: 0.72,
    },
    filterItemText: {
      color: colors.secondary,
      fontSize: moderateHeight(1.55),
    },
    activeFilterItemText: {
      color: colors.primary,
    },
    summaryCard: {
      marginTop: moderateHeight(1.35),
      marginHorizontal: moderateWidth(4.7),
      paddingVertical: moderateHeight(1.2),
      paddingHorizontal: moderateWidth(3.6),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    summaryTitle: {
      color: colors.secondary,
      fontSize: moderateHeight(1.65),
      lineHeight: moderateHeight(2.15),
    },
    summarySubtitle: {
      color: colors.gray,
      fontSize: moderateHeight(1.28),
      lineHeight: moderateHeight(1.8),
      marginTop: moderateHeight(0.2),
    },
    listContent: {
      paddingHorizontal: moderateWidth(4.7),
      paddingTop: moderateHeight(1.2),
      paddingBottom: moderateHeight(3),
      rowGap: moderateHeight(1.25),
    },
    paymentCard: {
      minHeight: moderateHeight(10.5),
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateHeight(1.25),
      paddingHorizontal: moderateWidth(3.2),
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
    paymentCardPressed: {
      opacity: 0.72,
    },
    statusShell: {
      width: moderateWidth(12),
      height: moderateWidth(12),
      borderRadius: moderateWidth(3),
      alignItems: 'center',
      justifyContent: 'center',
    },
    successStatusShell: {
      backgroundColor: colors.toastSuccess,
    },
    pendingStatusShell: {
      backgroundColor: colors.toastWarn,
    },
    failedStatusShell: {
      backgroundColor: colors.toastError,
    },
    statusIcon: {
      width: moderateWidth(6),
      height: moderateWidth(6),
    },
    successStatusIcon: {
      color: colors.primary,
    },
    pendingStatusIcon: {
      color: colors.primaryDark,
    },
    failedStatusIcon: {
      color: colors.primaryDark,
    },
    paymentBody: {
      flex: 1,
      minWidth: 0,
      marginLeft: moderateWidth(3.2),
    },
    paymentTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: moderateWidth(2),
    },
    orderNumber: {
      flex: 1,
      color: colors.secondary,
      fontSize: moderateHeight(1.5),
    },
    amountText: {
      color: colors.primaryDark,
      fontSize: moderateHeight(1.55),
    },
    statusRow: {
      marginTop: moderateHeight(0.45),
    },
    statusText: {
      fontSize: moderateHeight(1.32),
      textTransform: 'capitalize',
    },
    successStatusText: {
      color: '#13A95B',
    },
    pendingStatusText: {
      color: colors.primaryDark,
    },
    failedStatusText: {
      color: '#C33A3A',
    },
    paymentMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: moderateHeight(1),
      columnGap: moderateWidth(2),
    },
    metaItem: {
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    metaIcon: {
      width: moderateWidth(3.6),
      height: moderateWidth(3.6),
      color: colors.gray,
    },
    metaText: {
      color: colors.gray,
      fontSize: moderateHeight(1.28),
      marginLeft: moderateWidth(1.3),
    },
    detailContent: {
      paddingHorizontal: moderateWidth(4.7),
      paddingTop: moderateHeight(2),
      paddingBottom: moderateHeight(4),
      rowGap: moderateHeight(1.6),
    },
    detailStatusCard: {
      position: 'relative',
      paddingTop: moderateHeight(3.2),
      paddingHorizontal: moderateWidth(4),
      paddingBottom: moderateHeight(1.7),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.toastSuccess,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    detailStatusBadge: {
      position: 'absolute',
      top: moderateHeight(-2),
      alignSelf: 'center',
      width: moderateHeight(5.2),
      height: moderateHeight(5.2),
      borderRadius: moderateHeight(2.6),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateWidth(0.8),
      borderColor: colors.background,
      backgroundColor: colors.primary,
    },
    detailStatusIcon: {
      width: moderateHeight(2.6),
      height: moderateHeight(2.6),
      color: colors.white,
    },
    detailTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: moderateWidth(3),
    },
    detailOrderBlock: {
      minWidth: 0,
      marginBottom: moderateHeight(1.2),
    },
    detailLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.25),
      lineHeight: moderateHeight(1.75),
    },
    detailValue: {
      color: colors.secondary,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(2),
      marginTop: moderateHeight(0.15),
    },
    invoiceButton: {
      minHeight: moderateHeight(4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(3),
      borderRadius: moderateWidth(8),
      backgroundColor: colors.primary,
    },
    invoiceButtonPressed: {
      opacity: 0.72,
    },
    invoiceText: {
      color: colors.white,
      fontSize: moderateHeight(1.35),
      marginRight: moderateWidth(1.4),
    },
    invoiceIcon: {
      width: moderateWidth(4),
      height: moderateWidth(4),
      color: colors.white,
    },
    detailMetaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      rowGap: moderateHeight(0.8),
      columnGap: moderateWidth(2),
    },
    detailStatusText: {
      fontSize: moderateHeight(1.35),
      textTransform: 'capitalize',
    },
    feeCard: {
      minHeight: moderateHeight(7),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateWidth(4),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    feeTitle: {
      flex: 1,
      color: colors.secondary,
      fontSize: moderateHeight(1.5),
      marginRight: moderateWidth(2),
    },
    feeAmount: {
      color: colors.primaryDark,
      fontSize: moderateHeight(1.55),
    },
    totalCard: {
      padding: moderateWidth(4),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.white,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    totalRow: {
      minHeight: moderateHeight(4.6),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: moderateWidth(3),
    },
    totalLabel: {
      flex: 1,
      color: colors.secondary,
      fontSize: moderateHeight(1.45),
    },
    totalValue: {
      color: colors.secondary,
      fontSize: moderateHeight(1.45),
    },
    totalValueAccent: {
      color: colors.primary,
      fontSize: moderateHeight(1.55),
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginVertical: moderateHeight(0.6),
    },
    customerCard: {
      padding: moderateWidth(4),
      borderRadius: moderateWidth(2.4),
      backgroundColor: colors.primarySurface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.primaryBorder,
    },
    customerRow: {
      marginBottom: moderateHeight(1.7),
    },
    customerLabel: {
      color: colors.gray,
      fontSize: moderateHeight(1.32),
      lineHeight: moderateHeight(1.8),
    },
    customerText: {
      color: colors.secondary,
      fontSize: moderateHeight(1.45),
      lineHeight: moderateHeight(2),
      marginTop: moderateHeight(0.2),
    },
  });
};

export default useStyles;
