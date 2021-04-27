import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';
import baseURLs from '@/network/baseURLs';

const baseURL = baseURLs.databaseURL;

const familyGenusApi = {
  selectFamilyByGenusId(id) {
    const url = `${baseURL}/familyGenus`;
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

export default familyGenusApi;
