import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';
import baseURLs from '@/network/baseURLs';

const baseURL = baseURLs.databaseURL;

const familyApi = {
  selectAllFamilies(pageNum, pageSize) {
    const url = `${baseURL}/family/all`;
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
    const url = `${baseURL}/family`;
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
    const url = `${baseURL}/family/name`;
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
    const url = `${baseURL}/family`;
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
    const url = `${baseURL}/family/${orderId}`;
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
    const url = `${baseURL}/family`;
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
