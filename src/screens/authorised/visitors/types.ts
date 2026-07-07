export type VisitorFormData = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  companyName: string;
  gstNumber: string;
  invitationMeetingDate: string;
  chapterName: string;
};

export interface VisitorsData {
  title: string;
  form: VisitorFormData;
}
