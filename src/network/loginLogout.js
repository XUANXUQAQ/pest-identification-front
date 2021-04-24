import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';

const loginLogoutApi = {
  /**
   * 登录
   * @param {*} username
   * @param {*} password
   * @returns
   */
  login(username, password) {
    const url = '/login';
    return http.post(
      url,
      networkUtils.args.form({
        username,
        password,
      }),
    );
  },
  logout() {
    networkUtils.token.removeToken();
  },
};

export default loginLogoutApi;
