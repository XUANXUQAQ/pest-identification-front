import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';

const familyApi = {
  selectAllFamilies(pageNum, pageSize) {
    const url = '/family/all';
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
  selectFamilyById(id) {
    const url = '/family';
    return http.get(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  selectFamiliesByName(pageNum, pageSize, name) {
    const url = '/family/name';
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
  updateFamily(id, code, name, orderId) {
    const url = '/family';
    return http.put(url, {
      id,
      code,
      name,
    },
    {
      params: {
        orderId,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  insertFamily(id, code, name, orderId) {
    const url = `/family/${orderId}`;
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
  deleteFamily(id) {
    const url = '/family';
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

export default familyApi;
