import axiosInstance from './axios/config';

export const orderAuthApi = {
  /**
   * [Route Private] Tạo một link ủy quyền mới.
   * Tương ứng với: POST /order-authorization
   */
  createAuthorization: (orderId: number, email: string, name: string) => {
    // Sửa lại URL cho nhất quán (từ /order-authorizations -> /order-authorization)
    return axiosInstance.post('/order-authorization', {
      orderId,
      email,
      name,
    });
  },

  /**
   * [Route Public] Lấy thông tin ủy quyền bằng access_link.
   * Tương ứng với: GET /order-authorization/access-link
   * Được dùng trong: OrderAuthorizationPage (useEffect)
   */
  getAuthorizationByAccessLink: (access_link: string) => {
    return axiosInstance.get('/order-authorization/access-link', {
      params: {
        access_link, // Gửi qua query params
      },
    });
  },

  /**
   * [Route Public] Xác nhận ủy quyền bằng access_link.
   * Tương ứng với: POST /order-authorization/access-link/confirm
   * Được dùng trong: OrderAuthorizationPage (handleConfirm)
   */
  confirmAuthorizationByAccessLink: (data: { access_link: string }) => {
    // Gửi access_link trong body
    return axiosInstance.post('/order-authorization/access-link/confirm', data);
  },

  /**
   * Đây có vẻ là một luồng xác nhận khác (ví dụ: dùng token)
   * Tạm thời giữ lại nếu bạn dùng ở nơi khác.
   */
  confirmAuthorization: (orderId: number, token: string | null) =>
    axiosInstance.post(`/order-authorization/${orderId}/confirm`, { token }),
};
