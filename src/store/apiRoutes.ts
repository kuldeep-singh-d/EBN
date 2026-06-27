export const methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

export const apiRoutes = {
  auth: {
    login: '/login',
    logout: '/logout',
  },
  dashboard: {
    get: '/dashboard',
  },
  eliteMeets: {
    list: '/elite-meets',
    create: '/elite-meets',
    show: (id: string | number) => `/elite-meets/${id}`,
    update: (id: string | number) => `/elite-meets/${id}`,
  },
  eliteReferrals: {
    list: '/elite-referrals',
    create: '/elite-referrals',
    show: (id: string | number) => `/elite-referrals/${id}`,
    update: (id: string | number) => `/elite-referrals/${id}`,
  },
  dropdowns: {
    regions: '/dropdowns/regions',
    chaptersByRegion: (regionId: string | number) =>
      `/dropdowns/regions/${regionId}/chapters`,
    membersByChapter: (chapterId: string | number) =>
      `/dropdowns/chapters/${chapterId}/members`,
    categories: '/dropdowns/categories',
    subCategoriesByCategory: (categoryId: string | number) =>
      `/dropdowns/categories/${categoryId}/sub-categories`,
  },
  eliteCloseBusiness: {
    availableReferrals: '/elite-close-business/available-referrals',
    list: '/elite-close-business',
    create: '/elite-close-business',
    show: (id: string | number) => `/elite-close-business/${id}`,
    update: (id: string | number) => `/elite-close-business/${id}`,
  },
  visitorInvitations: {
    list: '/elite-visitor-invitations',
    create: '/elite-visitor-invitations',
    show: (id: string | number) => `/elite-visitor-invitations/${id}`,
    update: (id: string | number) => `/elite-visitor-invitations/${id}`,
  },
  trainings: {
    list: '/trainings',
    register: (id: string | number) => `/trainings/${id}/register`,
    cancelRegistration: (id: string | number) => `/trainings/${id}/register`,
  },
  eliteMembers: {
    chapterMembers: '/elite-members/chapter-members',
    search: '/elite-members/search',
    show: (id: string | number) => `/elite-members/${id}`,
  },
  profile: {
    me: '/profile/me',
    billing: '/profile/billing',
  },
  payments: {
    createOrder: '/payments/create-order',
    verify: '/payments/verify',
  },
  notifications: {
    saveDeviceToken: '/device-token',
  },
};
