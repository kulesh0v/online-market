const routes = {
  products: '/products',
  buy: '/products/buy',
  categories: '/categories',
  productById(productId) {
    return this.products + `/${productId}`;
  },
  categoryById(categoryId) {
    return this.categories + `/${categoryId}`;
  }

};

export default routes;
