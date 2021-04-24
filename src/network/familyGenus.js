import http from '@/network/axios.config';
import networkUtils from '@/utils/networkUtils';

const familyGenusApi = {
  selectFamilyByGenusId(id) {
    const url = '/familyGenus';
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
