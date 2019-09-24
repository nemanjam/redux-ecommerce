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

let products = _.times(100, index => ({
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
})).sort((a, b) => 0.5 - Math.random());

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

const getDataWithDelay = (data, delay = 0) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay, data));

export const getProductsPromise = params => {
  params = { page: { index: 0, size: 15 }, brand: 'mepps', sort: 'price' };
  if ('page' in params) {
    products = products.slice(params.page.index, params.page.size);
  }

  if ('brand' in params)
    products = products.filter(product => product.brand === params.brand);

  if ('sort' in params) {
    function compare(a, b) {
      if (a[params.sort] < b[params.sort]) return -1;
      if (a[params.sort] > b[params.sort]) return 1;
      return 0;
    }
    products = products.sort(compare);
  }

  return getDataWithDelay(products);
};
export const getAdvertisementsPromise = () => getDataWithDelay(advertisements);

//const myArg = "lol"; ary.sort((a,b) => a[myArg]...)
