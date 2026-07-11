import { useCallback, useMemo, useState } from 'react';

import useStyles from './styles';
import type { PaymentData, PaymentRecord, PaymentTabKey } from './types';

const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: 'order-1',
    orderNo: 'EBN26071492',
    invoiceNo: 'INV/EBN/26/0842',
    status: 'completed',
    date: '09-Jul-2026',
    time: '10:42 AM',
    amount: '₹7,240.00',
    itemName: 'Annual Networking Pass',
    subtotal: '₹6,135.59',
    cgst: '₹552.20',
    sgst: '₹552.21',
    customer: {
      name: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      mobile: '9824512087',
      gstin: '24AAXCM4921D1Z5',
      address:
        'A-703, Skyline Business Park, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    },
  },
  {
    id: 'order-2',
    orderNo: 'EBN26061385',
    invoiceNo: 'INV/EBN/26/0791',
    status: 'completed',
    date: '18-Jun-2026',
    time: '04:18 PM',
    amount: '₹4,860.00',
    itemName: 'Leadership Workshop',
    subtotal: '₹4,118.64',
    cgst: '₹370.68',
    sgst: '₹370.68',
    customer: {
      name: 'Nisha Trivedi',
      email: 'nisha.trivedi@example.com',
      mobile: '9904427611',
      gstin: '24AAZFN2042E1Z8',
      address:
        'B-1202, Orchid Plaza, Satellite Road, Ahmedabad, Gujarat 380054',
    },
  },
  {
    id: 'order-3',
    orderNo: 'EBN26051264',
    invoiceNo: 'INV/EBN/26/0718',
    status: 'completed',
    date: '22-May-2026',
    time: '09:05 AM',
    amount: '₹9,180.00',
    itemName: 'Chapter Growth Package',
    subtotal: '₹7,779.66',
    cgst: '₹700.17',
    sgst: '₹700.17',
    customer: {
      name: 'Karan Desai',
      email: 'karan.desai@example.com',
      mobile: '9879023441',
      gstin: '24AALFK8832B1Z3',
      address: '412, Riverfront Arcade, Ashram Road, Ahmedabad, Gujarat 380009',
    },
  },
  {
    id: 'order-4',
    orderNo: 'EBN26041647',
    invoiceNo: 'INV/EBN/26/0664',
    status: 'pending',
    date: '28-Apr-2026',
    time: '02:26 PM',
    amount: '₹3,450.00',
    itemName: 'Event Participation Fee',
    subtotal: '₹2,923.73',
    cgst: '₹263.14',
    sgst: '₹263.13',
    customer: {
      name: 'Riya Shah',
      email: 'riya.shah@example.com',
      mobile: '9978452301',
      gstin: '24AAUFR6219M1Z1',
      address: '8th Floor, Stellar Hub, C G Road, Ahmedabad, Gujarat 380006',
    },
  },
  {
    id: 'order-5',
    orderNo: 'EBN26031803',
    invoiceNo: 'INV/EBN/26/0599',
    status: 'failed',
    date: '12-Mar-2026',
    time: '07:34 PM',
    amount: '₹5,320.00',
    itemName: 'Training Subscription',
    subtotal: '₹4,508.47',
    cgst: '₹405.76',
    sgst: '₹405.77',
    customer: {
      name: 'Manan Patel',
      email: 'manan.patel@example.com',
      mobile: '9913017654',
      gstin: '24AAGFM7750K1Z7',
      address: '203, Commerce Square, Bodakdev, Ahmedabad, Gujarat 380059',
    },
  },
];

const PAYMENT_DATA: PaymentData = {
  title: 'Payment History',
  detailTitle: 'Order Detail',
  tabs: [
    { key: 'all', label: 'All' },
    { key: 'success', label: 'Success' },
  ],
  periodFilters: [
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'Last Quarter' },
    { id: 'year', label: 'Year to Date' },
    { id: 'complete', label: 'Complete History' },
  ],
  payments: MOCK_PAYMENTS,
};

const usePayment = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<PaymentTabKey>('all');
  const [selectedPeriod, setSelectedPeriod] = useState(
    PAYMENT_DATA.periodFilters[0],
  );
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  const filteredPayments = useMemo(
    () =>
      PAYMENT_DATA.payments.filter(payment =>
        activeTab === 'success' ? payment.status === 'completed' : true,
      ),
    [activeTab],
  );

  const selectedPayment = useMemo(
    () =>
      PAYMENT_DATA.payments.find(payment => payment.id === selectedPaymentId) ??
      null,
    [selectedPaymentId],
  );

  const setActivePaymentTab = useCallback((tab: PaymentTabKey) => {
    setActiveTab(tab);
    setIsFilterVisible(false);
  }, []);

  const toggleFilter = useCallback(() => {
    setIsFilterVisible(current => !current);
  }, []);

  const setPeriod = useCallback(
    (period: PaymentData['periodFilters'][number]) => {
      setSelectedPeriod(period);
      setIsFilterVisible(false);
    },
    [],
  );

  const onPaymentPress = useCallback((paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setIsFilterVisible(false);
  }, []);

  const onBackToHistory = useCallback(() => {
    setSelectedPaymentId(null);
  }, []);

  const onInvoicePress = useCallback((payment: PaymentRecord) => {
    console.log('[Payment] download invoice', payment.invoiceNo);
  }, []);

  return {
    styles,
    states: {
      activeTab,
      filteredPayments,
      isDetailView: Boolean(selectedPayment),
      isFilterVisible,
      screenData: PAYMENT_DATA,
      selectedPayment,
      selectedPeriod,
    },
    handlers: {
      onBackToHistory,
      onInvoicePress,
      onPaymentPress,
      setActivePaymentTab,
      setPeriod,
      toggleFilter,
    },
    constants: {},
  };
};

export default usePayment;
