export const ENDPOINTS = {
  get: {
    transactions: '/transactions',
    orders: '/orders',
    orderStats: '/orders/stats/last-7-days',
    buildings: '/buildings',
  },
  post: {
    order: '/order/create',
    orderUser: '/orders/user',
    orderShipper: '/orders/shipper',
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
