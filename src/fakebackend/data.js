import faker from 'faker';
import _ from 'lodash';

/*
const getData = id => Promise.resolve({ some: 'data' });
const sleep = t => new Promise(r => setTimeout(r, t));
await sleep(t);
*/

const products = _.times(10, index => ({
  id: index,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.technics(),
  shortDescription: faker.lorem.words(),
  description: faker.lorem.paragraph(),
}));

const getDataWithDelay = (data, delay = 3000) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay, data));

export const getProductsPromise = () => getDataWithDelay(products);
