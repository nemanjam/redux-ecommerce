import * as endpoints from './config';

const API = ({ config, params }) => {
  let _config = config || {},
    header = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ..._config,
    };

  return fetch(
    `${endpoints.config.baseURL}${endpoints.config.products}`,
    header,
  ).then(response => response.json());
};

export default API;
