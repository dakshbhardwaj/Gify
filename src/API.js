import axios from 'axios';
import EnvironmentConfig from './constants/EnvironmentConfig';

export const RequestType = {
  GET: 'GET',
  POST: 'POST',
};

class API {
  constructor() {
    this.config = {};
    this.config.baseURL = EnvironmentConfig.baseUrl;
    this.get.bind(this);
    this.axios = axios.create(this.config);
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default API;
