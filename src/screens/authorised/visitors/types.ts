export type VisitorFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  whatsappNumber: string;
  companyName: string;
  gstNumber: string;
  invitationDate: Date | null;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
};

export interface VisitorsData {
  title: string;
  form: VisitorFormData;
}

export type VisitorFormErrors = Partial<Record<keyof VisitorFormData, string>>;

export type VisitorsViewMode = 'list' | 'create' | 'detail';

export type VisitorDropdownApiItem = {
  id: number;
  name: string;
};

export type VisitorDropdownResponse = {
  status?: string;
  message?: string;
  data?: VisitorDropdownApiItem[];
};

export type CreateVisitorInvitationResponse = {
  status?: string;
  message?: string;
  data?: unknown;
};

export type VisitorInvitation = {
  id: number;
  chapter_id?: number;
  invited_by?: number;
  full_name?: string;
  company_name?: string;
  mobile_no?: string;
  whatsapp_no?: string;
  email?: string;
  gst_no?: string;
  category_id?: number;
  sub_category_id?: number;
  invitation_date?: string;
  payment_mode?: string;
  status?: string;
  invoice_number?: string;
  show_pay_button?: boolean;
  chapter?: VisitorDropdownApiItem;
  inviter?: {
    id: number;
    name: string;
  };
  category?: VisitorDropdownApiItem;
  sub_category?: VisitorDropdownApiItem;
};

export type VisitorInvitationsListResponse = {
  status?: string;
  message?: string;
  data?: {
    current_page?: number;
    data?: VisitorInvitation[];
    from?: number;
    to?: number;
    per_page?: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
  };
};

export type VisitorInvitationDetailResponse = {
  status?: string;
  message?: string;
  data?: VisitorInvitation;
};
