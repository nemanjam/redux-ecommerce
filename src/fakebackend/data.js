import faker from 'faker';
import _ from 'lodash';

const products = _.times(10, index => ({
  id: index,
  isAdvert: false,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.technics(),
  shortDescription: faker.lorem.words(),
  description: faker.lorem.paragraph(),
}));

const advertisements = _.times(10, index => ({
  id: index,
  isAdvert: true,
  name: faker.commerce.productName(),
  image: faker.image.business(),
  description: faker.lorem.paragraph(),
  link1: faker.internet.url(),
  link2: faker.internet.url(),
  time: faker.date.recent(),
}));

const getDataWithDelay = (data, delay = 1000) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay, data));

export const getProductsPromise = () => getDataWithDelay(products);
export const getAdvertisementsPromise = () => getDataWithDelay(advertisements);
