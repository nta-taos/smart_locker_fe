export const ENDPOINTS = {
  get: {
    transactions: '/transactions',
    orders: '/orders',
    orderStats: '/orders/stats/last-7-days',
  },
  post: {
    order: '/order/create',
    discount: '/checkdiscount',
    message: '/message',
    sendmessage: '/sendmessage',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
  },
};
