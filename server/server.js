import express from 'express';
import webpackConfig from '../configs/webpack.config.js';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';

import ProductsManager from './ProductsManager.js';

const app = express();
const products = [
  {
    name: 'Sneakers',
    products: [
      {
        id: '1',
        category: "Sneakers",
        price: 89.99,
        amount: 12,
        name: "Adidas Falcon White",
        url: "https://assets.adidas.com/images/w_600,h_600,f_auto,q_auto:sensitive,fl_lossy/49e9743bc8574c79b765a913009cdbc2_9366/Krossovki_Falcon_belyj_B28128_01_standard.jpg",
        inBasket: 0,
      },
      {
        id: '2',
        category: "Sneakers",
        price: 69.99,
        amount: 45,
        name: "Nike Air Max 1",
        url: "https://artbasket.store/wordpress/wp-content/uploads/2019/03/zhenskie-krossovki-nike-air-max-1-black-geode-teal-light-silver-bordeaux-3_1600x1600-600x600.jpg",
        inBasket: 0,
      },
      {
        id: '3',
        category: "Sneakers",
        price: 109.99,
        amount: 53,
        name: "New Balance CM997HAI",
        url: "https://artbasket.store/wordpress/wp-content/uploads/2019/03/muzhskie-krossovki-new-balance-cm997hai-black-grey-red-0_1600x1600-600x600.jpg",
        inBasket: 0,
      },
      {
        id: '4',
        category: "Sneakers",
        price: 94.99,
        amount: 12,
        name: "Nike M2K Tekno SP Grey",
        url: "https://img.brandshop.ru/cache/products/m/muzhskie-krossovki-nike-m2k-tekno-sp-atmosphere-grey-gunsmoke-dark-grey-white-0_676x676.jpg",
        inBasket: 0,
      },
      {
        id: '5',
        category: "Sneakers",
        price: 76.99,
        amount: 45,
        name: "New Balance MX608BP1",
        url: "https://img.brandshop.ru/cache/products/k/krossovki-new-balance-mx608bp1-white-lilac-multicolor-0_450x450.jpg",
        inBasket: 0,
      },
      {
        id: '6',
        category: "Sneakers",
        price: 109.99,
        amount: 53,
        name: "Adidas Yung-1",
        url: "https://assets.adidas.com/images/w_600,h_600,f_auto,q_auto:sensitive,fl_lossy/faba0cb1b97c467abd18a8b700e64bef_9366/Yung_1_Shoes_White_B37615_01_standard.jpg",
        inBasket: 0,
      }]
  },
  {
    name: "Electronics",
    products: [
      {
        id: '7',
        category: "Electronics",
        price: 99.99,
        amount: 84,
        name: "iPod Touch",
        url: "https://avatars.mds.yandex.net/get-mpic/195452/img_id3409220608597860124/9hq",
        inBasket: 0,
      },
      {
        id: '8',
        category: "Electronics",
        price: 399.99,
        amount: 2,
        name: "iPhone 5",
        url: "https://www.akoda.com.au/image/cache/catalog/Product%20Photos/Apple/iPhone/5/iphone-5-silver-600x600.jpg",
        inBasket: 0,
      },
      {
        id: '9',
        category: "Electronics",
        price: 199.99,
        amount: 6,
        name: "Nexus 7",
        url: "https://mytechnics.ru/image/cache/data/articles2/0095a6dbae41c14e43733b0cea009835_1000x1000-600x600.jpg",
        inBasket: 0,
      },
      {
        id: '10',
        category: "Electronics",
        price: 899.99,
        amount: 16,
        name: "Xiaomi Mi NoteBook Pro 15.6",
        url: "https://avatars.mds.yandex.net/get-mpic/1453843/img_id8172809070843085415.jpeg/9hq",
        inBasket: 0,
      },
      {
        id: '11',
        category: "Electronics",
        price: 99.99,
        amount: 200,
        name: "ASUS ZenFone M1 3/32GB",
        url: "https://avatars.mds.yandex.net/get-mpic/1365202/img_id714975428777332688.jpeg/9hq",
        inBasket: 0,
      }]
  }
];

const compiler = webpack(webpackConfig);
app.use(middleware(compiler));

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/:categoryName', (req, res) => {
  const {categoryName} = req.params;
  try {
    const result = ProductsManager.filterProducts(categoryName, req.query, products);
    res.send(result);
  } catch (e) {
    res.status(404).send('Category not found');
  }
});

app.get('/products/:categoryName/:id', (req, res) => {
  const {id, categoryName} = req.params;
  try {
    const result = ProductsManager.findProduct(id, categoryName, products);
    if (result) res.send(result);
  } catch (e) {
    res.status(404).send('Category not found');
  }
  res.status(404).send('Product not found');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});