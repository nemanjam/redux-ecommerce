import faker from 'faker';
import _ from 'lodash';

const brandAndImage = _.flatten(
  _.times(20, i => {
    return ['rapala', 'heddon', 'rebel', 'cottoncordel', 'mepps'].map(
      (brand, j) => {
        return { brand, image: `${brand}${i + 1}.jpg` };
      },
    );
  }),
);

const products = _.times(20, index => ({
  id: index,
  isAdvert: false,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  brand: brandAndImage[index].brand,
  image: brandAndImage[index].image,
  color: faker.commerce.color(),
  size: faker.random.number(),
  weight: faker.random.number(),
  shortDescription: faker.lorem.words(),
  description: faker.lorem.paragraph(),
}));

/*
const products = [
  {
    id: 0,
    isAdvert: false,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    brand: 'rapala',
    image: 'rapala1.jpg',
    color: 'yellow',
    size: faker.random.number(),
    weight: faker.random.number(),
    shortDescription: faker.lorem.words(),
    description: faker.lorem.paragraph(),
  },
];
*/

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
