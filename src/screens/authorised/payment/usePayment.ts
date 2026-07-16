import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from '@hooks';
import {
  listInvoices,
  resetInvoices,
} from '@store/slices/app/payments/payments';
import useStyles from './styles';
import type {
  InvoicePaymentStatus,
  InvoiceRecord,
  InvoicesResponse,
  PaymentData,
  PaymentTabKey,
} from './types';

type ListRequestMode = 'initial' | 'refresh' | 'next';

const PAYMENT_DATA: PaymentData = {
  title: 'Payment History',
  detailTitle: 'Invoice Detail',
  tabs: [
    { key: 'all', label: 'All' },
    { key: 'success', label: 'Success' },
  ],
};

export const getInvoiceStatus = (status?: string): InvoicePaymentStatus => {
  const normalizedStatus = status?.toLowerCase();

  if (
    normalizedStatus === 'paid' ||
    normalizedStatus === 'completed' ||
    normalizedStatus === 'success'
  ) {
    return 'success';
  }

  if (normalizedStatus === 'failed' || normalizedStatus === 'cancelled') {
    return 'failed';
  }

  return 'pending';
};

const usePayment = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<PaymentTabKey>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(
    null,
  );
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [requestMode, setRequestMode] = useState<ListRequestMode>('initial');

  const invoicesResponse = useSelector(
    state => state.payments?.invoices?.data,
  ) as InvoicesResponse | undefined;
  const invoicesLoading = useSelector(state =>
    Boolean(state.payments?.invoices?.loading),
  );

  const fetchInvoices = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      setRequestMode(mode);
      dispatch(listInvoices({ page }));
    },
    [dispatch],
  );

  const refreshInvoices = useCallback(() => {
    fetchInvoices(1, 'refresh');
  }, [fetchInvoices]);

  const fetchNextInvoices = useCallback(() => {
    if (invoicesLoading || !nextPage) return;
    fetchInvoices(nextPage, 'next');
  }, [fetchInvoices, invoicesLoading, nextPage]);

  useEffect(() => {
    dispatch(resetInvoices());
    fetchInvoices(1, 'initial');

    return () => {
      dispatch(resetInvoices());
    };
  }, [dispatch, fetchInvoices]);

  useEffect(() => {
    const pagination = invoicesResponse?.data;
    if (!pagination) return;

    const page = pagination.current_page ?? 1;
    const pageItems = pagination.data ?? [];

    setNextPage(pagination.next_page_url ? page + 1 : null);
    setInvoices(current => {
      if (page <= 1 || requestMode !== 'next') {
        return pageItems;
      }

      const existingIds = new Set(current.map(invoice => invoice.id));
      const nextItems = pageItems.filter(
        invoice => !existingIds.has(invoice.id),
      );

      return [...current, ...nextItems];
    });
  }, [invoicesResponse, requestMode]);

  const filteredInvoices = useMemo(
    () =>
      invoices.filter(invoice =>
        activeTab === 'success'
          ? getInvoiceStatus(invoice.payment_status) === 'success'
          : true,
      ),
    [activeTab, invoices],
  );

  const setActivePaymentTab = useCallback((tab: PaymentTabKey) => {
    setActiveTab(tab);
  }, []);

  const onPaymentPress = useCallback((invoice: InvoiceRecord) => {
    setSelectedInvoice(invoice);
  }, []);

  const onBackToHistory = useCallback(() => {
    setSelectedInvoice(null);
  }, []);

  return {
    styles,
    states: {
      activeTab,
      filteredInvoices,
      hasNextPage: Boolean(nextPage),
      isDetailView: Boolean(selectedInvoice),
      isFetchingNextPage: invoicesLoading && requestMode === 'next',
      isInitialLoading:
        invoicesLoading && requestMode === 'initial' && !invoices.length,
      isRefreshing: invoicesLoading && requestMode === 'refresh',
      invoicesLoading,
      screenData: PAYMENT_DATA,
      selectedInvoice,
    },
    handlers: {
      fetchNextInvoices,
      onBackToHistory,
      onPaymentPress,
      refreshInvoices,
      setActivePaymentTab,
    },
    constants: {},
  };
};

export default usePayment;
