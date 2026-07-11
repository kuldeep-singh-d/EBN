import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  CalendarDays,
  Check,
  Clock3,
  Download,
  Funnel,
  X,
} from 'lucide-react-native';

import { AppContainer, AppText } from '@components';
import usePayment from './usePayment';
import type { PaymentRecord } from './types';

export const Payment = () => {
  const { styles, states, handlers } = usePayment();
  const { screenData } = states;

  const getStatusStyles = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'completed':
        return {
          shell: styles.successStatusShell,
          icon: styles.successStatusIcon,
          text: styles.successStatusText,
          label: 'Completed',
        };
      case 'pending':
        return {
          shell: styles.pendingStatusShell,
          icon: styles.pendingStatusIcon,
          text: styles.pendingStatusText,
          label: 'Pending',
        };
      default:
        return {
          shell: styles.failedStatusShell,
          icon: styles.failedStatusIcon,
          text: styles.failedStatusText,
          label: 'Failed',
        };
    }
  };

  const renderStatusIcon = (payment: PaymentRecord) => {
    const statusStyles = getStatusStyles(payment.status);
    const Icon = payment.status === 'failed' ? X : Check;

    return (
      <View style={[styles.statusShell, statusStyles.shell]}>
        <Icon
          width={styles.statusIcon.width}
          height={styles.statusIcon.height}
          color={statusStyles.icon.color}
        />
      </View>
    );
  };

  const renderPayment = (payment: PaymentRecord) => {
    const statusStyles = getStatusStyles(payment.status);

    return (
      <Pressable
        key={payment.id}
        accessibilityRole="button"
        onPress={() => handlers.onPaymentPress(payment.id)}
        style={({ pressed }) => [
          styles.paymentCard,
          pressed && styles.paymentCardPressed,
        ]}
      >
        {renderStatusIcon(payment)}
        <View style={styles.paymentBody}>
          <View style={styles.paymentTopRow}>
            <AppText
              semibold
              numberOfLines={1}
              label={payment.orderNo}
              style={styles.orderNumber}
            />
            <AppText
              semibold
              numberOfLines={1}
              label={payment.amount}
              style={styles.amountText}
            />
          </View>
          <View style={styles.statusRow}>
            <AppText
              semibold
              label={statusStyles.label}
              style={[styles.statusText, statusStyles.text]}
            />
          </View>
          <View style={styles.paymentMetaRow}>
            <View style={styles.metaItem}>
              <CalendarDays
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={payment.date} style={styles.metaText} />
            </View>
            <View style={styles.metaItem}>
              <Clock3
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={payment.time} style={styles.metaText} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderHistory = () => (
    <>
      <View style={styles.tabRow}>
        {screenData.tabs.map(tab => {
          const isActive = states.activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => handlers.setActivePaymentTab(tab.key)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <AppText
                semibold={isActive}
                centered
                label={tab.label}
                style={[styles.tabText, isActive && styles.activeTabText]}
              />
            </Pressable>
          );
        })}
      </View>

      {states.isFilterVisible ? (
        <View style={styles.filterCard}>
          <View style={styles.filterArrow} />
          {screenData.periodFilters.map(period => {
            const isActive = states.selectedPeriod.id === period.id;

            return (
              <Pressable
                key={period.id}
                accessibilityRole="button"
                onPress={() => handlers.setPeriod(period)}
                style={({ pressed }) => [
                  styles.filterItem,
                  isActive && styles.activeFilterItem,
                  pressed && styles.filterItemPressed,
                ]}
              >
                <AppText
                  medium={isActive}
                  label={period.label}
                  style={[
                    styles.filterItemText,
                    isActive && styles.activeFilterItemText,
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <View style={styles.summaryCard}>
        <View>
          <AppText
            semibold
            label={`${states.filteredPayments.length} transactions`}
            style={styles.summaryTitle}
          />
          <AppText
            label={states.selectedPeriod.label}
            style={styles.summarySubtitle}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {states.filteredPayments.map(renderPayment)}
      </ScrollView>
    </>
  );

  const renderDetail = (payment: PaymentRecord) => {
    const statusStyles = getStatusStyles(payment.status);

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContent}
      >
        <View style={styles.detailStatusCard}>
          <View style={styles.detailStatusBadge}>
            <Check
              width={styles.detailStatusIcon.width}
              height={styles.detailStatusIcon.height}
              color={styles.detailStatusIcon.color}
            />
          </View>

          <View style={styles.detailTopRow}>
            <View style={styles.detailOrderBlock}>
              <AppText label="Order No" style={styles.detailLabel} />
              <AppText
                semibold
                label={payment.orderNo}
                style={styles.detailValue}
              />
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => handlers.onInvoicePress(payment)}
              style={({ pressed }) => [
                styles.invoiceButton,
                pressed && styles.invoiceButtonPressed,
              ]}
            >
              <AppText semibold label="Invoice" style={styles.invoiceText} />
              <Download
                width={styles.invoiceIcon.width}
                height={styles.invoiceIcon.height}
                color={styles.invoiceIcon.color}
              />
            </Pressable>
          </View>

          <View style={styles.detailOrderBlock}>
            <AppText label="Invoice No" style={styles.detailLabel} />
            <AppText label={payment.invoiceNo} style={styles.detailValue} />
          </View>

          <View style={styles.detailMetaRow}>
            <View style={styles.metaItem}>
              <CalendarDays
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={payment.date} style={styles.metaText} />
            </View>
            <View style={styles.metaItem}>
              <Clock3
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={payment.time} style={styles.metaText} />
            </View>
            <AppText
              semibold
              label={statusStyles.label}
              style={[styles.detailStatusText, statusStyles.text]}
            />
          </View>
        </View>

        <View style={styles.feeCard}>
          <AppText label={payment.itemName} style={styles.feeTitle} />
          <AppText semibold label={payment.subtotal} style={styles.feeAmount} />
        </View>

        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <AppText semibold label="Subtotal" style={styles.totalLabel} />
            <AppText
              semibold
              label={payment.subtotal}
              style={styles.totalValueAccent}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <AppText label="CGST (9.00%)" style={styles.totalLabel} />
            <AppText label={payment.cgst} style={styles.totalValue} />
          </View>
          <View style={styles.totalRow}>
            <AppText label="SGST (9.00%)" style={styles.totalLabel} />
            <AppText label={payment.sgst} style={styles.totalValue} />
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <AppText semibold label="Total" style={styles.totalLabel} />
            <AppText
              semibold
              label={payment.amount}
              style={styles.totalValueAccent}
            />
          </View>
        </View>

        <View style={styles.customerCard}>
          <View style={styles.customerRow}>
            <AppText label="Name" style={styles.customerLabel} />
            <AppText
              label={payment.customer.name}
              style={styles.customerText}
            />
          </View>
          <View style={styles.customerRow}>
            <AppText label="Email" style={styles.customerLabel} />
            <AppText
              label={payment.customer.email}
              style={styles.customerText}
            />
          </View>
          <View style={styles.customerRow}>
            <AppText label="Mobile" style={styles.customerLabel} />
            <AppText
              label={payment.customer.mobile}
              style={styles.customerText}
            />
          </View>
          <View style={styles.customerRow}>
            <AppText label="GSTIN" style={styles.customerLabel} />
            <AppText
              label={payment.customer.gstin}
              style={styles.customerText}
            />
          </View>
          <View style={styles.customerRow}>
            <AppText label="Address" style={styles.customerLabel} />
            <AppText
              numberOfLines={4}
              label={payment.customer.address}
              style={styles.customerText}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <AppContainer
      listing
      centerTitle
      hideBackBtn={!states.isDetailView}
      title={states.isDetailView ? screenData.detailTitle : screenData.title}
      showHeaderActions={false}
      headerIconColor={String(styles.headerIcon.color)}
      onHeaderRightPress={handlers.toggleFilter}
      onBackPress={handlers.onBackToHistory}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
      rightComponent={
        states.isDetailView ? undefined : (
          <Pressable
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Filter payments"
            onPress={handlers.toggleFilter}
            style={({ pressed }) => [
              styles.headerAction,
              states.isFilterVisible && styles.activeHeaderAction,
              pressed && styles.headerActionPressed,
            ]}
          >
            <Funnel
              width={styles.headerActionIcon.width}
              height={styles.headerActionIcon.height}
              color={
                states.isFilterVisible
                  ? styles.activeHeaderActionIcon.color
                  : styles.headerActionIcon.color
              }
            />
          </Pressable>
        )
      }
    >
      <View style={styles.container}>
        {states.selectedPayment
          ? renderDetail(states.selectedPayment)
          : renderHistory()}
      </View>
    </AppContainer>
  );
};
