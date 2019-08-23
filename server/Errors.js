class ProductNotFoundError extends Error {
  constructor() {
    super('Product not found');
    this.status = 404;
  }
}

class CategoryNotFoundError extends Error {
  constructor() {
    super('Category not found');
    this.status = 404;
  }
}

class FieldError extends Error {
  constructor(field, code) {
    super();
    this.status = 400;
    this.code = code;
    this.field = field;
    this.message = JSON.stringify({
      field: this.field,
      error_code: this.code,
    });
  }
}

const eCodes = Object.freeze({
  IS_REQUIRED: 'IS_REQUIRED',
  TOO_LONG: 'TOO_LONG',
  UNIQUE: 'UNIQUE',
  IS_NOT_STRING: 'IS_NOT_STRING',
  IS_NOT_NUMBER: 'IS_NOT_NUMBER',
  IS_NOT_EXIST: 'IS_NOT_EXIST',
  IS_NOT_INTEGER: 'IS_NOT_INTEGER',
  NOT_POSITIVE: 'NOT_POSITIVE',
});

export {ProductNotFoundError, CategoryNotFoundError, FieldError, eCodes};