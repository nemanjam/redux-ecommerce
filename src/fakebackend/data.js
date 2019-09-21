/*
const getData = id => Promise.resolve({ some: 'data' });
const sleep = t => new Promise(r => setTimeout(r, t));
await sleep(t);
*/

const products = [{ id: 1, name: 'product 1' }];

const getProductsWithDelay = (resolveFn, delay = 1000) =>
  new Promise(resolveFn => setTimeout(resolveFn, delay));

const getProductData = () => getProductsWithDelay(() => ({ products }));

export { getProductData };
