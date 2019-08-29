import express from 'express'
import db from './../database.js';
import ProductManager from './../ProductsManager.js';
import {CategoryNotFoundError, ErrorsList} from './../Errors.js';

const productManager = ProductManager();
const router = express.Router();

router.get('/', (req, res) => {
  res.send(productManager.getCategories({
    database: db,
  }));
});

router.get('/:categoryId', (req, res) => {
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

router.post('/', (req, res) => {
  try {
    productManager.addCategory({
      category: req.body,
      database: db,
    });
    res.send('Category has been added');
  } catch (e) {
    if (e instanceof ErrorsList) {
      res.status(404).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});


router.put('/:categoryId', (req, res) => {
  try {
    const {categoryId} = req.params;
    productManager.replaceCategory({
      id: categoryId,
      category: req.body,
      database: db,
    });
    res.send('Category has been changed');
  } catch (e) {
    if (e instanceof ErrorsList || CategoryNotFoundError) {
      console.log(e);
      res.status(e.status).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Unexpected error');
    }
  }
});

router.delete('/:categoryId', (req, res) => {
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

export default router;