import API from '../API';
import EnvironmentConfig from '../constants/EnvironmentConfig';

const Endpoint = {
  trending: (limit, offset) =>
    `/trending?api_key=${EnvironmentConfig.apiToken}&limit=${limit}&offset=${offset}`,
  search: (query, limit, offset) =>
    `/search?api_key=${EnvironmentConfig.apiToken}&q=${query}&limit=${limit}&offset=${offset}`,
};

class GiphyApi {
  getTrendingGifs(limit, offset) {
    const api = new API();
    return api.get(Endpoint.trending(limit, offset));
  }
  search({query, limit, offset}) {
    const api = new API();
    return api.get(Endpoint.search(query, limit, offset));
  }
}

export default new GiphyApi();
