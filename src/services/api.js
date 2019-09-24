import * as endpoints from './endpoints';

const API = ({ config, params }) => {
  let _config = config || {},
    header = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ..._config,
    };

  return fetch(
    `${endpoints.api.baseURL}${endpoints.api.products}`,
    header,
  ).then(response => response.json());
};

export default API;
