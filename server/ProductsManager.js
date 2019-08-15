class ProductsManager {
  static filterProducts(filterConfig, products) {
    let result = products.slice();
    const from = filterConfig.from || 0;
    const to = filterConfig.to;
    const categories = filterConfig.categoryId;
    result = this.filterCategories(categories, result);
    this.sortProducts(filterConfig, result);
    result = this.filterPrice(filterConfig, result);
    result = result.slice(from, to);
    return result;
  }

  static filterCategories(categories, products) {
    if (categories) {
      if (!Array.isArray(categories)) {
        categories = [categories];
      }
      return products.filter(p => categories.includes(p.categoryId));
    }
    return products;
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

  static findProduct(id, products) {
    return products.find(p => p.id === id);
  }
}

export default ProductsManager;