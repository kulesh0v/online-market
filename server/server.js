import express from 'express';
import webpackConfig from '../webpack.config.js';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';

import ProductManager from './ProductsManager.js';
import db from './database.js';
import {ProductNotFoundError, CategoryNotFoundError, FieldError} from './Errors.js';

const app = express();
const productManager = ProductManager();
const compiler = webpack(webpackConfig);

app.use(middleware(compiler));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', (req, res) => {
  try {
    const result = productManager.filterProducts({
      filterConfig: req.query,
      database: db,
    });
    if (result.length) {
      res.send(result);
    } else {
      res.send('Products not found');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Unexpected error');
  }
});

app.get('/products/:productId', (req, res) => {
  try {
    const {productId} = req.params;
    const result = productManager.getProduct({
      id: productId,
      database: db,
    });
    res.send(result);
  } catch (e) {
    if (e instanceof ProductNotFoundError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.post('/products', (req, res) => {
  try {
    productManager.addProduct({
      product: req.body,
      database: db,
    });
    res.send('Product has been added');
  } catch (e) {
    if (e instanceof FieldError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.put('/products/:productId', (req, res) => {
  try {
    const {productId} = req.params;
    productManager.replaceProduct({
      id: productId,
      product: req.body,
      database: db,
    });
    res.send('Product has been changed');
  } catch (e) {
    if (e instanceof FieldError || ProductNotFoundError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.delete('/products/:productId', (req, res) => {
  try {
    const {productId} = req.params;
    productManager.removeProduct({
      id: productId,
      database: db,
    });
    res.send('Product has been removed');
  } catch (e) {
    if (e instanceof ProductNotFoundError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.get('/categories', (req, res) => {
  res.send(productManager.getCategories({
    database: db,
  }));
});

app.get('/categories/:categoryId', (req, res) => {
  try {
    const {categoryId} = req.params;
    const answer = productManager.getCategory({
      id: categoryId,
      database: db,
    });
    res.send(answer);
  } catch (e) {
    if (e instanceof CategoryNotFoundError) {
      res.status(404).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.post('/categories', (req, res) => {
  try {
    productManager.addCategory({
      category: req.body,
      database: db,
    });
    res.send('Category has been added');
  } catch (e) {
    if (e instanceof FieldError) {
      res.status(404).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});


app.put('/categories/:categoryId', (req, res) => {
  try {
    const {categoryId} = req.params;
    productManager.replaceCategory({
      id: categoryId,
      category: req.body,
      database: db,
    });
    res.send('Category has been changed');
  } catch (e) {
    if (e instanceof FieldError || CategoryNotFoundError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

app.delete('/categories/:categoryId', (req, res) => {
  try {
    const {categoryId} = req.params;
    productManager.removeCategory({
      id: categoryId,
      database: db,
    });
    res.send('Category has been removed');
  } catch (e) {
    if (e instanceof CategoryNotFoundError) {
      res.status(500).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});