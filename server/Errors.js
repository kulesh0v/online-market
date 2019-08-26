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
    this.code = code;
    this.field = field;
  }
}

class ErrorsList extends Error {
  constructor() {
    super();
    this.status = 400;
    this.errorsList = [];
  }

  get message() {
    return JSON.stringify(this.errorsList)
  }

  get size() {
    return this.errorsList.length;
  }

  add(error) {
    this.errorsList.push(error);
  }
}

const
  eCodes = Object.freeze({
    IS_REQUIRED: 'IS_REQUIRED',
    TOO_LONG: 'TOO_LONG',
    UNIQUE: 'UNIQUE',
    IS_NOT_STRING: 'IS_NOT_STRING',
    IS_NOT_NUMBER: 'IS_NOT_NUMBER',
    IS_NOT_EXIST: 'IS_NOT_EXIST',
    IS_NOT_INTEGER: 'IS_NOT_INTEGER',
    NOT_POSITIVE: 'NOT_POSITIVE',
  });

export {ProductNotFoundError, CategoryNotFoundError, FieldError, eCodes, ErrorsList};