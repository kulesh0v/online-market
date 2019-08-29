import express from 'express'
import db from './../database.js';
import ProductManager from './../ProductsManager.js';
import {ProductNotFoundError, ErrorsList} from './../Errors.js';

const productManager = ProductManager();
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const result = productManager.filterProducts({
      filterConfig: req.query,
      database: db,
    });
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send('Unexpected error');
  }
});

router.get('/:productId', (req, res) => {
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

router.post('/', (req, res) => {
  try {
    productManager.addProduct({
      product: req.body,
      database: db,
    });
    res.send('Product has been added');
  } catch (e) {
    if (e instanceof ErrorsList) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

router.put('/:productId', (req, res) => {
  try {
    const {productId} = req.params;
    productManager.replaceProduct({
      id: productId,
      product: req.body,
      database: db,
    });
    res.send('Product has been changed');
  } catch (e) {
    if (e instanceof ErrorsList || ProductNotFoundError) {
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

router.delete('/:productId', (req, res) => {
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

export default router;