class ProductsManager {
  static filterProducts(filterConfig, products) {
    let result = products.slice();
    const from = filterConfig.from || 0;
    const to = filterConfig.to;
    const categories = filterConfig.categoryId;
    result = this.filterCategories(categories, result);
    result = this.filterPrice(filterConfig, result);
    this.sortProducts(filterConfig, result);
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
      const mp = Number(filterConfig.minPrice);
      products = products.filter(product => product.price >= mp);
    }
    if (filterConfig.maxPrice && isFinite(filterConfig.maxPrice)) {
      const mp = Number(filterConfig.maxPrice);
      products = products.filter(product => product.price <= mp);
    }
    return products;
  }

  static sortProducts(filterConfig, products) {
    if (filterConfig.sortType) {
      switch (filterConfig.sortType) {
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