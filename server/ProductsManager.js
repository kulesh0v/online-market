function ProductsManager() {
  return {
    toSendObject: function (lokiObject) {
      const result = {...lokiObject};
      result.id = result.$loki;
      delete result.$loki;
      delete result.meta;
      return result;
    },

    filterProducts: function ({filterConfig, database}) {
      const products = database.getCollection('products');
      const sortType = this._getSortType(filterConfig);
      return products
        .chain()
        .where((product) => {
          return this._checkCategories(product, filterConfig) &&
            this._checkPrice(product, filterConfig);
        })
        .simplesort(sortType.type, sortType.flag)
        .data()
        .map((p) => this.toSendObject(p));
    },

    _checkCategories: function (product, {categoryId}) {
      if (categoryId) {
        if (!Array.isArray(categoryId)) {
          categoryId = [categoryId];
        }
        return categoryId.includes(product.categoryId.toString());
      }
      return true;
    },

    _checkPrice: function (product, {minPrice, maxPrice}) {
      if (minPrice) {
        const mp = Number(minPrice);
        if (product.price <= mp) {
          return false;
        }
      }
      if (maxPrice && isFinite(maxPrice)) {
        const mp = Number(maxPrice);
        return product.price <= mp;
      }
      return true;
    },

    _getSortType: function ({sortType}) {
      if (sortType === 'uprice') {
        return {type: 'price', flag: false};
      }
      if (sortType === 'dprice') {
        return {type: 'price', flag: true};
      }
      return {type: 'loki', flag: true};
    },

    getProduct: function ({id, database}) {
      return this.toSendObject(database.getCollection('products').get(id));
    },

    validateProduct: function ({product, categories}) {

    },

    validateProductId: function ({id, products}) {

    },

    addProduct: function ({product, database}) {
      try {
        this.validateProduct({
          product: product,
          categories: database.getCollection('categories'),
        });
        database.getCollection('products').insert(product);
      } catch (e) {
        throw e;
      }
    },

    replaceProduct: function ({id, product, database}) {
      try {
        const products = database.getCollection('products');
        this.validateProductId({
          id: id,
          products: products,
        });
        this.validateProduct({
          product: product,
          categories: database.getCollection('categories'),
        });
        let tmp = products.get(id);
        tmp = {...product, $loki: tmp.$loki, meta: tmp.meta};
        products.update(tmp);
      } catch (e) {
        throw e;
      }
    },

    removeProduct: function ({id, database}) {
      try {
        const products = database.getCollection('products');
        this.validateProductId({
          id: id,
          products: products,
        });
        products.remove(products.get(id));
      } catch (e) {
        throw e;
      }
    },


    getCategories: function ({database}) {
      return database.getCollection('categories')
        .data.map(c => this.toSendObject(c));
    },

    getCategory: function ({id, database}) {
      return this.toSendObject(database.getCollection('categories').get(id));
    },

    validateCategory: function ({category, categories}) {

    },

    validateCategoryId: function ({id, categories}) {

    },

    addCategory: function ({category, database}) {
      try {
        const categories = database.getCollection('categories');
        this.validateCategory({
          category: category,
          categories: categories,
        });
        categories.insert(category);
        return category;
      } catch (e) {
        throw e;
      }
    },

    replaceCategory: function ({id, category, database}) {
      try {
        const categories = database.getCollection('categories');
        this.validateCategoryId({
          id: id,
          categories: categories,
        });
        this.validateCategory({
          category: category,
          database: database,
        });
        let tmp = categories.get(id);
        tmp = {...category, $loki: tmp.$loki, meta: tmp.meta};
        categories.update(tmp);
      } catch (e) {
        throw e;
      }
    },

    removeCategory: function ({id, database}) {
      const categories = database.getCollection('categories');
      const products = database.getCollection('products');
      try {
        this.validateCategoryId({
          id: id,
          categories: categories,
        });
        products.remove(products.find({categoryId: Number(id)}));
        categories.remove(categories.get(id));
      } catch (e) {
        throw e;
      }
    }
  }
}

export default ProductsManager;



