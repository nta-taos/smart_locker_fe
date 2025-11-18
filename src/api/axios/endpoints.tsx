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
    openOrder: '/orders/:orderId/open',
    sendPackage: 'orders/send',
    discount: '/checkdiscount',
    message: '/message',
    sendmessage: '/sendmessage',
    createOrderAuthorization: '/order-authorizations',
    confirmOrderAuthorization: (orderId: number | string) =>
      `/order-authorizations/${orderId}/confirm`,
    rentalOrder: '/orders/rent',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    googleCheck: '/auth/google-check',
    googleRegisterComplete: '/auth/google-register-complete',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
};
