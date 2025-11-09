export const ENDPOINTS = {
  get: {
    transactions: '/transactions',
    orders: '/orders',
    orderStats: '/orders/stats/last-7-days',
    buildings: '/buildings',
    notifications: '/notifications',
  },
  patch: {
    notificationRead: (id: number | string) => `/notifications/${id}/read`,
    notificationReadAll: '/notifications/read-all',
  },
  delete: {
    notification: (id: number | string) => `/notifications/${id}`,
  },
  post: {
    order: '/order/create',
    orderUser: '/orders/user',
    orderShipper: '/orders/shipper',
    sendPackage: 'orders/send',
    discount: '/checkdiscount',
    message: '/message',
    sendmessage: '/sendmessage',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    googleCheck: '/auth/google-check',
    googleRegisterComplete: '/auth/google-register-complete',
  },
};
