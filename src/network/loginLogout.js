import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';
import baseURLs from '@/network/baseURLs';

const baseURL = baseURLs.databaseURL;

const loginLogoutApi = {
  /**
   * 登录
   * @param {*} username
   * @param {*} password
   * @returns
   */
  login(username, password) {
    const url = `${baseURL}/login`;
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
