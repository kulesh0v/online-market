import {ProductNotFoundError, CategoryNotFoundError, FieldError, eCodes, ErrorsList} from './Errors.js';

function ProductsManager() {
  const PAGE_SIZE = 8;

  function _checkCategories(product, {categoryId}) {
    if (categoryId) {
      if (!Array.isArray(categoryId)) {
        categoryId = [categoryId];
      }
      return categoryId.includes(product.categoryId.toString());
    }
    return true;
  }

  function _checkPrice(product, {minPrice, maxPrice}) {
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
  }

  function _getSortType({sortType}) {
    if (sortType === 'uprice') {
      return {type: 'price', flag: false};
    }
    if (sortType === 'dprice') {
      return {type: 'price', flag: true};
    }
    return {type: 'loki', flag: true};
  }


  function _validateProductName(product, errors) {
    if (!product.name) {
      errors.add(new FieldError('name', eCodes.IS_REQUIRED));
    } else {
      if (typeof product.name !== "string") {
        errors.add(new FieldError('name', eCodes.IS_NOT_STRING));
      } else {
        if (product.name.length > 35) {
          errors.add(new FieldError('name', eCodes.TOO_LONG));
        }
      }
    }
  }

  function _validateProductPrice(product, errors) {
    if (!product.price) {
      errors.add(new FieldError('price', eCodes.IS_REQUIRED));
    } else {
      if (!Number.isFinite(+product.amount)) {
        errors.add(new FieldError('price', eCodes.IS_NOT_NUMBER));
      } else {
        if (+product.price <= 0) {
          errors.add(new FieldError('price', eCodes.NOT_POSITIVE));
        }
      }
    }
  }

  function _validateProductAmount(product, errors) {
    if (!product.amount) {
      errors.add(new FieldError('amount', eCodes.IS_REQUIRED));
    } else {
      if (!Number.isFinite(+product.amount)) {
        errors.add(new FieldError('amount', eCodes.IS_NOT_NUMBER));
      } else {
        if (!Number.isInteger(+product.amount)) {
          errors.add(new FieldError('amount', eCodes.IS_NOT_INTEGER));
        } else {
          if (+product.amount <= 0) {
            errors.add(new FieldError('amount', eCodes.NOT_POSITIVE));
          }
        }
      }
    }
  }

  function _validateProductCategoryId(product, categories, errors) {
    if (typeof product.categoryId !== 'number') {
      errors.add(new FieldError('categoryId', eCodes.IS_NOT_NUMBER));
    } else {
      if (!categories.get(product.categoryId)) {
        errors.add(new FieldError('categoryId', eCodes.IS_NOT_EXIST))
      }
    }
  }

  function _validateProductUrl(product, errors) {
    if (!product.url) {
      errors.add(new FieldError('url', eCodes.IS_REQUIRED));
    } else {
      if (typeof product.url !== "string") {
        errors.add(new FieldError('url', eCodes.IS_NOT_STRING));
      }
    }
  }

  function _validateProduct(product, categories) {
    const errors = new ErrorsList();
    try {
      _validateProductName(product, errors);
      _validateProductPrice(product, errors);
      _validateProductAmount(product, errors);
      _validateProductCategoryId(product, categories, errors);
      _validateProductUrl(product, errors);
      if (errors.size) {
        throw  errors;
      }
    } catch (e) {
      throw e;
    }
  }

  function _validateProductId(id, products) {
    if (!products.get(id)) {
      throw new ProductNotFoundError();
    }
  }

  function _validateCategory(category, categories) {
    const errors = new ErrorsList();
    try {
      _validateCategoryName(category, categories, errors);
      if (errors.size) {
        throw  errors;
      }
    } catch (e) {
      throw e;
    }

  }

  function _validateCategoryName(category, categories, errors) {
    if (!category.name) {
      errors.add(new FieldError('name', eCodes.IS_REQUIRED));
    } else {
      if (typeof category.name !== "string") {
        errors.add(new FieldError('name', eCodes.IS_NOT_STRING));
      } else {
        if (category.name.length > 35) {
          errors.add(new FieldError('name', eCodes.TOO_LONG));
        } else {
          if (categories.findOne({name: category.name})) {
            errors.add(new FieldError('name', eCodes.UNIQUE));
          }
        }
      }
    }
  }

  function _validateCategoryId(id, categories) {
    if (!categories.get(id)) {
      throw new CategoryNotFoundError();
    }
  }

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
      const sortType = _getSortType(filterConfig);
      const page = filterConfig.page || 1;
      const result = products
        .chain()
        .where((product) => {
          return _checkCategories(product, filterConfig) &&
            _checkPrice(product, filterConfig);
        })
        .simplesort(sortType.type, sortType.flag);
      return {
        pageAmount: Math.ceil(result.data().length / PAGE_SIZE),
        products: result.offset(PAGE_SIZE * (page)).limit(PAGE_SIZE).data().map((p) => this.toSendObject(p))
      };
    },


    getProduct: function ({id, database}) {
      try {
        const products = database.getCollection('products');
        _validateProductId(id, products);
        return this.toSendObject(products.get(id));
      }
      catch (e) {
        throw e;
      }
    },

    addProduct: function ({product, database}) {
      try {
        _validateProduct(product, database.getCollection('categories'));
        database.getCollection('products').insert(product);
      } catch (e) {
        throw e;
      }
    },

    replaceProduct: function ({id, product, database}) {
      try {
        const products = database.getCollection('products');
        _validateProductId(id, products);
        _validateProduct(product, database.getCollection('categories'));
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
        _validateProductId(id, products);
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
      try {
        const categories = database.getCollection('categories');
        _validateCategoryId(id, categories);
        return this.toSendObject(categories.get(id));
      } catch (e) {
        throw e;
      }
    },

    addCategory: function ({category, database}) {
      try {
        const categories = database.getCollection('categories');
        _validateCategory(category, categories);
        categories.insert(category);
        return category;
      } catch (e) {
        throw e;
      }
    },

    replaceCategory: function ({id, category, database}) {
      try {
        const categories = database.getCollection('categories');
        _validateCategoryId(id, categories);
        _validateCategory(category, categories);
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
        _validateCategoryId(id, categories);
        products.remove(products.find({categoryId: Number(id)}));
        categories.remove(categories.get(id));
      } catch (e) {
        throw e;
      }
    }
  }
}

export default ProductsManager;



