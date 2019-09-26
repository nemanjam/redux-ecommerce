import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import qs from 'qs';

import { config } from '../services/config';
import { getProductData, getProductsData, getAdvertisementsData } from './data';

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: config.delay });

mock.onGet(/\/products.*/gi).reply(function(config) {
  //console.log(config);
  const query = config.url.replace('/products?', '');
  const params = qs.parse(query);
  const products = getProductsData(params);
  //console.log(products);
  return [200, products];
});

mock.onGet(/\/adverts.*/gi).reply(function(config) {
  const adverts = getAdvertisementsData();
  return [200, adverts];
});

mock.onGet(/\/product.*/gi).reply(function(config) {
  const id = config.url.replace('/product/', '');
  const product = getProductData(id);
  return [200, product];
});

// mock.onGet('/users').reply(200, {
//   users: [{ id: 1, name: 'John Smith' }],
// });

// const params = {
//   page: { index: 0, size: 10 },
//   filter: 'mepps',
//   sort: { key: 'price', direction: 'asc' },
// };

// mock.onGet(/\/products.*/gi).reply(function(config) {
//   //console.log(config);
//   const query = config.url.replace('/products?', '');
//   const params = qs.parse(query);
//   const products = getProductsData(params);
//   //console.log(products);
//   return [200, products];
// });

// var strParams = qs.stringify(params);
// //console.log(strParams);

// axios.get(`/products?${strParams}`).then(function(response) {
//   console.log(response.data);
// });
