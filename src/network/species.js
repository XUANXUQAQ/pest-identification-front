import networkUtils from '@/utils/networkUtils';
import baseURLs from '@/network/baseURLs';
import http from './axios.config';

const baseURL = baseURLs.databaseURL;

const speciesApi = {
  /**
   * 查询所有的种
   * @param {*} pageNum
   * @param {*} pageSize
   * @returns
   */
  getAllSpecies(pageNum, pageSize) {
    const url = `${baseURL}/species/all`;
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
  getSpeciesById(id) {
    const url = `${baseURL}/species`;
    return http.get(url, {
      params: {
        id,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  getSpeciesByName(pageNum, pageSize, name) {
    const url = `${baseURL}/species/name`;
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
  getSpeciesByCode(code) {
    const url = `${baseURL}/species/${code}`;
    return http.get(url, {
      params: {
        code,
      },
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  insertSpecies(area, code, genusId, id, image, latin, name, plant) {
    const url = `${baseURL}/species`;
    return http.post(url, {
      area, code, genusId, id, image, latin, name, plant,
    },
    {
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  updateSpecies(area, code, genusId, id, image, latin, name, plant) {
    const url = `${baseURL}/species`;
    return http.put(url, {
      area, code, genusId, id, image, latin, name, plant,
    },
    {
      headers: {
        token: networkUtils.token.getToken(),
      },
    });
  },
  deleteSpecies(id) {
    const url = `${baseURL}/species`;
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

export default speciesApi;
