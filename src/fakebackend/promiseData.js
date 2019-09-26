import _ from 'lodash';
import { config } from '../services/config';
import { getProductData, getProductsData, getAdvertisementsData } from './data';

const getDataWithDelay = (data, delay = config.delay) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay, data));

export const getProductsPromise = params => {
  const products = getProductsData(params);
  return getDataWithDelay(products);
};
export const getProductPromise = id => {
  const product = getProductData(id);
  return getDataWithDelay(product);
};
export const getAdvertisementsPromise = () => {
  const adverts = getAdvertisementsData();
  return getDataWithDelay(adverts);
};
