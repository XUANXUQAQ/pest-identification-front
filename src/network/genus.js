import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';
import baseURLs from '@/network/baseURLs';

const baseURL = baseURLs.databaseURL;

const genusApi = {
  selectAllGenus(pageNum, pageSize) {
    const url = `${baseURL}/genus/all`;
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
  selectGenusById(id) {
    const url = `${baseURL}/genus`;
    return http.get(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  selectGenusByName(pageNum, pageSize, name) {
    const url = `${baseURL}/genus/name`;
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
  updateGenus(id, code, name, familyId) {
    const url = `${baseURL}/genus`;
    return http.put(url, {
      id,
      code,
      name,
    },
    {
      params: {
        familyId,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  deleteGenus(id) {
    const url = `${baseURL}/genus`;
    return http.delete(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  insertGenus(id, code, name, familyId) {
    const url = `${baseURL}/genus/${familyId}`;
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
};

export default genusApi;
