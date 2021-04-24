/*
 * @Description: 网络请求
 * @Author: 蒋淦
 * @LastEditors: 蒋淦
 * @Date: 2021-04-22 21:50:57
 * @LastEditTime: 2021-04-22 22:43:00
 */

import networkUtils from '@/utils/networkUtils';
import http from './axios.config';

const speciesApi = {
  /**
   * 查询所有的种
   * @param {*} pageNum
   * @param {*} pageSize
   * @returns
   */
  getAllSpecies(pageNum, pageSize) {
    const url = '/species/all';
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
    const url = '/species';
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
    const url = '/species/name';
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
    const url = `/species/${code}`;
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
    const url = '/species';
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
    const url = '/species';
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
    const url = '/species';
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
