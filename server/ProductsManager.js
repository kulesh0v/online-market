class ProductsManager {
  static filterProducts(categoryName, filterConfig, products) {
    let categoryProducts = this.findCategory(categoryName, products).products;
    let from = filterConfig.from || 0;
    let to = filterConfig.to;
    this.sortProducts(filterConfig, categoryProducts);
    categoryProducts = this.filterPrice(filterConfig, categoryProducts);
    categoryProducts = categoryProducts.slice(from, to);
    return categoryProducts;
  }

  static findCategory(categoryName, products) {
    return products.find(c => c.name.toLowerCase() === categoryName);
  }

  static filterPrice(filterConfig, products) {
    if (filterConfig.minPrice) {
      return products.filter(product => product.price > filterConfig.minPrice);
    }
    if (filterConfig.maxPrice) {
      return products.filter(product => product.price < filterConfig.maxPrice);
    }
    return products;
  }

  static sortProducts(filterConfig, products) {
    if (filterConfig.sorttype) {
      switch (filterConfig.sorttype) {
        case 'dprice':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'uprice':
          products.sort((a, b) => b.price - a.price);
          break;
      }
    }
  }

  static findProduct(id, categoryName, products) {
    return this.findCategory(categoryName, products).products.find(p => p.id === id);
  }
}

export default ProductsManager;