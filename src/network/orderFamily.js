import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';

const orderFamilyApi = {
  selectOrderByFamilyId(id) {
    const url = '/orderFamily';
    return http.get(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
};

export default orderFamilyApi;
