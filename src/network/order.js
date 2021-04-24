import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';

const orderApi = {
  selectOrderById(id) {
    const url = '/order';
    return http.get(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  selectAllOrders(pageNum, pageSize) {
    const url = '/order/all';
    return http.get(url, {
      params: {
        pageNum,
        pageSize,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  selectOrderByName(pageNum, pageSize, name) {
    const url = '/order/name';
    return http.get(url, {
      params: {
        pageNum,
        pageSize,
        name,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  insertOrder(id, code, name) {
    const url = '/order';
    return http.post(url, {
      id,
      code,
      name,
    },
    {
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  updateOrder(id, code, name) {
    const url = '/order';
    return http.put(url, {
      id,
      code,
      name,
    },
    {
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  deleteOrder(id) {
    const url = '/order';
    return http.delete(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
};

export default orderApi;
