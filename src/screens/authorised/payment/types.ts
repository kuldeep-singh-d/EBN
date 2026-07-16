export type PaymentTabKey = 'all' | 'success';

export type InvoicePaymentStatus = 'success' | 'pending' | 'failed';

export type InvoiceChapter = {
  id: number;
  name: string;
};

export type InvoiceRecord = {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  description: string;
  amount: string;
  gst_amount: string;
  penalty_amount: string;
  total_amount: string;
  payment_mode: string;
  payment_status: string;
  is_penalty_applied: number;
  transaction_reference: string | null;
  show_pay_button: boolean;
  created_at: string;
  chapter?: InvoiceChapter;
};

export type InvoicesResponse = {
  status?: string;
  message?: string;
  data?: {
    current_page?: number;
    data?: InvoiceRecord[];
    from?: number;
    to?: number;
    per_page?: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
  };
};

export interface PaymentData {
  title: string;
  detailTitle: string;
  tabs: Array<{
    key: PaymentTabKey;
    label: string;
  }>;
}
