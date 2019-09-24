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

const getProducts = () => {
  const products = _.times(100, index => ({
    id: index,
    isAdvert: false,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    brand: brandAndImage[index].brand,
    image: brandAndImage[index].image,
    color: faker.commerce.color(),
    size: faker.random.number(),
    weight: faker.random.number(),
    shortDescription: faker.lorem.words(),
    description: faker.lorem.paragraph(),
  })).sort((a, b) => 0.5 - Math.random());
  return products;
};

const advertisements = _.times(100, index => ({
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
  //params = { page: { index: 0, size: 15 }, filter: 'mepps', sort: 'price' };
  let products = getProducts();

  if (params && 'filter' in params && params.filter !== 'none')
    products = products.filter(product => product.brand === params.filter);

  if (params && 'sort' in params && params.sort !== 'none') {
    function compare(a, b) {
      if (a[params.sort] < b[params.sort]) return -1;
      if (a[params.sort] > b[params.sort]) return 1;
      return 0;
    }
    products = products.sort(compare);
  }

  if (params && 'page' in params) {
    products = products.slice(params.page.index, params.page.size);
  }

  return getDataWithDelay(products);
};
export const getAdvertisementsPromise = () => getDataWithDelay(advertisements);

//const myArg = "lol"; ary.sort((a,b) => a[myArg]...)
