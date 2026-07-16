import React from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {
  BadgeIndianRupee,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Hash,
  ReceiptText,
  X,
} from 'lucide-react-native';

import { AppContainer, AppText } from '@components';
import usePayment, { getInvoiceStatus } from './usePayment';
import type { InvoicePaymentStatus, InvoiceRecord } from './types';

export const Payment = () => {
  const { styles, states, handlers } = usePayment();
  const { screenData } = states;

  const getStatusStyles = (status: InvoicePaymentStatus) => {
    switch (status) {
      case 'success':
        return {
          shell: styles.successStatusShell,
          icon: styles.successStatusIcon,
          text: styles.successStatusText,
          label: 'Success',
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

  const renderStatusIcon = (invoice: InvoiceRecord) => {
    const status = getInvoiceStatus(invoice.payment_status);
    const statusStyles = getStatusStyles(status);
    const Icon = status === 'failed' ? X : Check;

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

  const renderInvoice = (invoice: InvoiceRecord) => {
    const statusStyles = getStatusStyles(
      getInvoiceStatus(invoice.payment_status),
    );

    return (
      <Pressable
        key={invoice.id}
        accessibilityRole="button"
        onPress={() => handlers.onPaymentPress(invoice)}
        style={({ pressed }) => [
          styles.paymentCard,
          pressed && styles.paymentCardPressed,
        ]}
      >
        {renderStatusIcon(invoice)}
        <View style={styles.paymentBody}>
          <View style={styles.paymentTopRow}>
            <AppText
              semibold
              numberOfLines={1}
              label={invoice.invoice_number}
              style={styles.orderNumber}
            />
            <AppText
              semibold
              numberOfLines={1}
              label={`₹${invoice.total_amount}`}
              style={styles.amountText}
            />
          </View>
          <AppText
            numberOfLines={2}
            label={invoice.description || '-'}
            style={styles.invoiceDescription}
          />
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
              <AppText label={invoice.invoice_date} style={styles.metaText} />
            </View>
            <View style={styles.metaItem}>
              <Clock3
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={invoice.due_date} style={styles.metaText} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const handleListScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      states.invoicesLoading ||
      states.isFetchingNextPage ||
      !states.hasNextPage
    ) {
      return;
    }

    const distanceFromBottom =
      nativeEvent.contentSize.height -
      (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y);

    if (distanceFromBottom <= 96) {
      handlers.fetchNextInvoices();
    }
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

      {states.isInitialLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={styles.loaderIcon.color} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={handleListScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={states.isRefreshing}
              onRefresh={handlers.refreshInvoices}
              tintColor={styles.refreshControl.color}
              colors={[styles.refreshControl.color]}
            />
          }
        >
          {states.filteredInvoices.length ? (
            states.filteredInvoices.map(renderInvoice)
          ) : (
            <View style={styles.emptyState}>
              <AppText
                semibold
                centered
                label="No Invoices"
                style={styles.emptyTitle}
              />
              <AppText
                centered
                label="Invoices will appear here once available."
                style={styles.emptyText}
              />
            </View>
          )}

          {states.isFetchingNextPage ? (
            <View style={styles.paginationLoader}>
              <ActivityIndicator size="small" color={styles.loaderIcon.color} />
            </View>
          ) : null}
        </ScrollView>
      )}
    </>
  );

  const renderDetailRow = (
    label: string,
    value?: string | number | boolean | null,
  ) => (
    <View style={styles.customerRow}>
      <AppText label={label} style={styles.customerLabel} />
      <AppText
        numberOfLines={3}
        label={
          typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || '-'
        }
        style={styles.customerText}
      />
    </View>
  );

  const renderDetail = (invoice: InvoiceRecord) => {
    const statusStyles = getStatusStyles(
      getInvoiceStatus(invoice.payment_status),
    );

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
              <AppText label="Invoice Number" style={styles.detailLabel} />
              <AppText
                semibold
                label={invoice.invoice_number}
                style={styles.detailValue}
              />
            </View>
          </View>

          <View style={styles.detailMetaRow}>
            <View style={styles.metaItem}>
              <CalendarDays
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={invoice.invoice_date} style={styles.metaText} />
            </View>
            <View style={styles.metaItem}>
              <Clock3
                width={styles.metaIcon.width}
                height={styles.metaIcon.height}
                color={styles.metaIcon.color}
              />
              <AppText label={invoice.due_date} style={styles.metaText} />
            </View>
            <AppText
              semibold
              label={statusStyles.label}
              style={[styles.detailStatusText, statusStyles.text]}
            />
          </View>
        </View>

        <View style={styles.feeCard}>
          <AppText
            numberOfLines={2}
            label={invoice.description}
            style={styles.feeTitle}
          />
          <AppText
            semibold
            label={`₹${invoice.total_amount}`}
            style={styles.feeAmount}
          />
        </View>

        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <View style={styles.totalLabelRow}>
              <BadgeIndianRupee
                width={styles.totalIcon.width}
                height={styles.totalIcon.height}
                color={styles.totalIcon.color}
              />
              <AppText semibold label="Amount" style={styles.totalLabel} />
            </View>
            <AppText
              semibold
              label={`₹${invoice.amount}`}
              style={styles.totalValueAccent}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <View style={styles.totalLabelRow}>
              <ReceiptText
                width={styles.totalIcon.width}
                height={styles.totalIcon.height}
                color={styles.totalIcon.color}
              />
              <AppText label="GST Amount" style={styles.totalLabel} />
            </View>
            <AppText
              label={`₹${invoice.gst_amount}`}
              style={styles.totalValue}
            />
          </View>
          <View style={styles.totalRow}>
            <View style={styles.totalLabelRow}>
              <Hash
                width={styles.totalIcon.width}
                height={styles.totalIcon.height}
                color={styles.totalIcon.color}
              />
              <AppText label="Penalty Amount" style={styles.totalLabel} />
            </View>
            <AppText
              label={`₹${invoice.penalty_amount}`}
              style={styles.totalValue}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <View style={styles.totalLabelRow}>
              <CreditCard
                width={styles.totalIcon.width}
                height={styles.totalIcon.height}
                color={styles.totalIcon.color}
              />
              <AppText semibold label="Total" style={styles.totalLabel} />
            </View>
            <AppText
              semibold
              label={`₹${invoice.total_amount}`}
              style={styles.totalValueAccent}
            />
          </View>
        </View>

        <View style={styles.customerCard}>
          {renderDetailRow('Invoice ID', invoice.id)}
          {renderDetailRow('Payment Mode', invoice.payment_mode)}
          {renderDetailRow('Payment Status', invoice.payment_status)}
          {renderDetailRow(
            'Transaction Reference',
            invoice.transaction_reference,
          )}
          {renderDetailRow(
            'Penalty Applied',
            Boolean(invoice.is_penalty_applied),
          )}
          {renderDetailRow('Show Pay Button', invoice.show_pay_button)}
          {renderDetailRow('Created At', invoice.created_at)}
          {renderDetailRow('Chapter', invoice.chapter?.name)}
          {renderDetailRow('Chapter ID', invoice.chapter?.id)}
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
      onBackPress={handlers.onBackToHistory}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        {states.selectedInvoice
          ? renderDetail(states.selectedInvoice)
          : renderHistory()}
      </View>
    </AppContainer>
  );
};
