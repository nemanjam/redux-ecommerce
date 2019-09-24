export const insertAdvert = (products, adverts, insertAtIndex) => {
  let advertIndex = 0;
  let resultArr = [];
  const justProducts = products.filter(product => !product.isAdvert);

  if (justProducts.length <= insertAtIndex) return justProducts;

  while (justProducts.length > 0) {
    // 2 same adds in the row
    while (
      adverts.length > advertIndex + 1 &&
      adverts[advertIndex].id === adverts[advertIndex + 1].id
    )
      advertIndex++;
    // 0,1,2..9,0,1,2
    adverts.length <= advertIndex + 1 ? (advertIndex = 0) : advertIndex++;

    //index is calculated
    const chunk = justProducts.splice(0, insertAtIndex);
    if (chunk.length === insertAtIndex)
      resultArr = resultArr.concat(chunk, [adverts[advertIndex]]);
  }
  return resultArr;
};
