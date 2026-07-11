export type PaymentTabKey = 'all' | 'success';

export type PaymentStatus = 'completed' | 'pending' | 'failed';

export type PaymentPeriodFilter = {
  id: string;
  label: string;
};

export type PaymentRecord = {
  id: string;
  orderNo: string;
  invoiceNo: string;
  status: PaymentStatus;
  date: string;
  time: string;
  amount: string;
  itemName: string;
  subtotal: string;
  cgst: string;
  sgst: string;
  customer: {
    name: string;
    email: string;
    mobile: string;
    gstin: string;
    address: string;
  };
};

export interface PaymentData {
  title: string;
  detailTitle: string;
  tabs: Array<{
    key: PaymentTabKey;
    label: string;
  }>;
  periodFilters: PaymentPeriodFilter[];
  payments: PaymentRecord[];
}
