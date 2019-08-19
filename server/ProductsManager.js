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

  static validateProduct(product, categories) {

  }

  static addProduct(product, products, categories) {
    try {
      product.id = products[products.length - 1].id + 1;
      product.price = Number(product.price);
      product.amount = Number(product.amount);
      if (categories.find(c => c.id === product.categoryId))
        products.push(product);
    } catch (e) {
      throw e;
    }
  }

  static replaceProduct(id, product, products, categories) {
    try {
      const old = products.find(p => p.id === id);
      old.price = Number(product.price);
      old.amount = Number(product.amount);
      old.categoryId = product.categoryId;
      old.name = product.name;
      old.url = product.url;
      console.log(products.findIndex(p => p.id === id));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default ProductsManager;