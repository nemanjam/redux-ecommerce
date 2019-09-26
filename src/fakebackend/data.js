import faker from 'faker';
import _ from 'lodash';
import { config } from '../services/config';

const brandAndImage = _.flatten(
  _.times(20, i => {
    return ['rapala', 'heddon', 'rebel', 'cottoncordel', 'mepps'].map(
      (brand, j) => {
        return { brand, image: `${brand}${i + 1}.jpg` };
      },
    );
  }),
);
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getProducts = () => {
  const products = _.times(100, index => ({
    id: index,
    isAdvert: false,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    brand: brandAndImage[index].brand,
    image: brandAndImage[index].image,
    color: faker.commerce.color(),
    size: getRandomInt(3, 20),
    weight: getRandomInt(4, 40),
    shortDescription: faker.lorem.words(),
    modelNum: faker.random.number(),
    delivery: [
      faker.address.country(),
      faker.address.country(),
      faker.address.country(),
    ].join(', '),
    description: faker.lorem.paragraph(),
  })); //.sort((a, b) => 0.5 - Math.random());
  return products;
};

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

const getDataWithDelay = (data, delay = config.delay) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay, data));

export const getProductsPromise = params => {
  //params = { page: { index: 0, size: 15 }, filter: 'mepps', sort: {key:'price', direction:'asc'} };
  let products = getProducts();

  if (params && 'filter' in params && params.filter !== 'none')
    products = products.filter(product => product.brand === params.filter);

  if (params && 'sort' in params && params.sort.key !== 'none') {
    function compare(a, b) {
      if (a[params.sort.key] < b[params.sort.key]) return -1;
      if (a[params.sort.key] > b[params.sort.key]) return 1;
      return 0;
    }
    products = products.sort(compare);
    if (params.sort.direction === 'desc') products = products.reverse();
  }

  if (params && 'page' in params) {
    products = products.slice(
      params.page.index,
      params.page.index + params.page.size,
    );
  }

  return getDataWithDelay(products);
};
export const getProductPromise = id => {
  let products = getProducts();
  let product = {};
  id = parseInt(id);

  if (!Number.isNaN(id) && products.length > id)
    product = products.find(product => product.id === id);

  return getDataWithDelay(product);
};
export const getAdvertisementsPromise = () => getDataWithDelay(advertisements);

/*
export const timeout = (duration = 1500, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(`rejected after ${duration}ms`);
      } else {
        resolve(`resolved after ${duration}ms`);
      }
    }, duration);
  });
};
*/
