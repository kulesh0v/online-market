import express from 'express';
import webpackConfig from '../configs/webpack.config.js';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';

import ProductsManager from './ProductsManager.js';

const app = express();
const categories = [
  /*  {
      name: 'Sneakers',
      id: '1'
    },*/
  {
    name: "Mobile phones",
    id: '2',
  },
  {
    name: 'Laptops',
    id: '3',
  },
  {
    name: 'Tablets',
    id: '4',
  },
  {
    name: 'Bluetooth speakers',
    id: '5',
  },
  {
    name: 'Games consoles',
    id: '6'
  }
];

const products = [
  /*{
    id: '1',
    categoryId: '1',
    price: 89.99,
    amount: 12,
    name: "Adidas Falcon White",
    url: "https://assets.adidas.com/images/w_600,h_600,f_auto,q_auto:sensitive,fl_lossy/49e9743bc8574c79b765a913009cdbc2_9366/Krossovki_Falcon_belyj_B28128_01_standard.jpg",
  },
  {
    id: '2',
    categoryId: '1',
    price: 69.99,
    amount: 45,
    name: "Nike Air Max 1",
    url: "https://artbasket.store/wordpress/wp-content/uploads/2019/03/zhenskie-krossovki-nike-air-max-1-black-geode-teal-light-silver-bordeaux-3_1600x1600-600x600.jpg",
  },
  {
    id: '3',
    categoryId: '1',
    price: 109.99,
    amount: 53,
    name: "New Balance CM997HAI",
    url: "https://artbasket.store/wordpress/wp-content/uploads/2019/03/muzhskie-krossovki-new-balance-cm997hai-black-grey-red-0_1600x1600-600x600.jpg",
  },
  {
    id: '4',
    categoryId: '1',
    price: 94.99,
    amount: 12,
    name: "Nike M2K Tekno SP Grey",
    url: "https://img.brandshop.ru/cache/products/m/muzhskie-krossovki-nike-m2k-tekno-sp-atmosphere-grey-gunsmoke-dark-grey-white-0_676x676.jpg",
  },
  {
    id: '5',
    categoryId: '1',
    price: 76.99,
    amount: 45,
    name: "New Balance MX608BP1",
    url: "https://img.brandshop.ru/cache/products/k/krossovki-new-balance-mx608bp1-white-lilac-multicolor-0_450x450.jpg",
  },
  {
    id: '6',
    categoryId: '1',
    price: 109.99,
    amount: 53,
    name: "Adidas Yung-1",
    url: "https://assets.adidas.com/images/w_600,h_600,f_auto,q_auto:sensitive,fl_lossy/faba0cb1b97c467abd18a8b700e64bef_9366/Yung_1_Shoes_White_B37615_01_standard.jpg",
  },*/
  {
    id: '8',
    categoryId: '2',
    price: 399.99,
    amount: 2,
    name: "iPhone 5",
    url: "https://www.akoda.com.au/image/cache/catalog/Product%20Photos/Apple/iPhone/5/iphone-5-silver-600x600.jpg",
  },
  {
    id: '9',
    categoryId: '4',
    price: 199.99,
    amount: 6,
    name: "Nexus 7",
    url: "https://mytechnics.ru/image/cache/data/articles2/0095a6dbae41c14e43733b0cea009835_1000x1000-600x600.jpg",
  },
  {
    id: '10',
    categoryId: '3',
    price: 899.99,
    amount: 16,
    name: "Xiaomi Mi NoteBook Pro 15.6",
    url: "https://avatars.mds.yandex.net/get-mpic/1453843/img_id8172809070843085415.jpeg/9hq",
  },
  {
    id: '11',
    categoryId: '2',
    price: 99.99,
    amount: 200,
    name: "ASUS ZenFone M1 3/32GB",
    url: "https://avatars.mds.yandex.net/get-mpic/1365202/img_id714975428777332688.jpeg/9hq",
  },
  {
    categoryId: '2',
    name: 'Samsung S10e',
    url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1551208882-samsung-galaxy-s10e-smartphone-1550695757.jpg',
    id: 12,
    price: 751.99,
    amount: 80
  },
  {
    categoryId: '2',
    name: 'Asus Rog Phone',
    url: 'https://www.asus.com/media/global/products/YHbcnTAG8qt4B47T/P_setting_fff_1_90_end_600.png',
    id: 13,
    price: 918.99,
    amount: 84
  },
  {
    categoryId: '2',
    name: 'Samsung A40',
    url: 'https://www.dateks.lv/images/pic/600/600/783/423.jpg',
    id: 14,
    price: 756.99,
    amount: 90
  },
  {
    categoryId: '2',
    name: 'Samsung S9',
    url: 'https://www.pricerunner.com/product/600x600/1814566310/Samsung-Galaxy-S9-64GB.jpg?c=0.7',
    id: 15,
    price: 431.99,
    amount: 14
  },
  {
    categoryId: '2',
    name: 'Xiaomi Redmi Note 7',
    url: 'https://quke.ru/UserFiles/Landing/products/59968_photos_0.jpeg',
    id: 16,
    price: 737.99,
    amount: 85
  },
  {
    categoryId: '2',
    name: 'Huawei P30',
    url: 'https://img.mvideo.ru/Pdb/30043038b.jpg',
    id: 17,
    price: 763.99,
    amount: 5
  },
  {
    categoryId: '3',
    name: 'Asus Studiobook',
    url: 'https://www.asus.com/media/global/products/YkMxOYzNhCW0mwpT/P_setting_fff_1_90_end_600.png',
    id: 18,
    price: 598.99,
    amount: 84
  },
  {
    categoryId: '3',
    name: 'Asus ZenBook 14',
    url: 'https://www.asus.com/media/global/products/IAUUa98beOzYP4WZ/P_setting_fff_1_90_end_600.png',
    id: 19,
    price: 1253.99,
    amount: 61
  },
  {
    categoryId: '3',
    name: 'Apple MacBook Pro 13',
    url: 'https://img.mvideo.ru/Pdb/30039067b.jpg',
    id: 20,
    price: 691.99,
    amount: 56
  },
  {
    categoryId: '3',
    name: 'Huawei MateBook X',
    url: 'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2018/07/09/source-img/20180709135730_48015.jpg',
    id: 21,
    price: 1270.99,
    amount: 84
  },
  {
    categoryId: '3',
    name: 'Dell XPS 13',
    url: 'https://vipcomp.by/image/cache/data/quad/12/dell-xps-13-9370-1719-12225-1-600x600.jpg',
    id: 22,
    price: 756.99,
    amount: 35
  },
  {
    categoryId: '3',
    name: 'HP Pavilion 14',
    url: 'https://img.mvideo.ru/Pdb/30039625b.jpg',
    id: 23,
    price: 84.99,
    amount: 75
  },
  {
    categoryId: '4',
    name: 'Lenovo Tab',
    url: 'https://img.mvideo.ru/Pdb/30042186b.jpg',
    id: 24,
    price: 963.99,
    amount: 19
  },
  {
    categoryId: '4',
    name: 'Lenovo Youga',
    url: 'https://img.mvideo.ru/Pdb/30028499b.jpg',
    id: 25,
    price: 619.99,
    amount: 58
  },
  {
    categoryId: '4',
    name: 'Asus Zenpad',
    url: 'https://img.mvideo.ru/Pdb/30029544b.jpg',
    id: 26,
    price: 109.99,
    amount: 16
  },
  {
    categoryId: '4',
    name: 'Apple Ipad',
    url: 'https://img.mvideo.ru/Pdb/30036515b.jpg',
    id: 27,
    price: 1095.99,
    amount: 24
  },
  {
    categoryId: '4',
    name: 'Sumsung Tablet Galaxy',
    url: 'https://www.dateks.lv/images/pic/600/600/416/415.jpg',
    id: 28,
    price: 607.99,
    amount: 52
  },
  {
    categoryId: '4',
    name: 'Xiaomi Mi Pad 8',
    url: 'https://img.mvideo.ru/Pdb/30026477b.jpg',
    id: 29,
    price: 205.99,
    amount: 28
  },
  {
    categoryId: '5',
    name: 'Xiaomi Mi BP Mini',
    url: 'http://5element.by/upload/5element/aeb/aebe071221fd7602453df4af4efd977a.jpg',
    id: 30,
    price: 794.99,
    amount: 92
  },
  {
    categoryId: '5',
    name: 'JBL Flip 4',
    url: 'https://s4.sywcdn.net/getImage?url=https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_b63e040d-7d68-4963-929a-bbe0ef4c2a7a&t=Product&w=600&h=600&qlt=100&mrg=1&str=1&s=bb170e63d82774ec13cc1832408225cf',
    id: 31,
    price: 902.99,
    amount: 67
  },
  {
    categoryId: '5',
    name: 'JBL Go 2',
    url: 'https://govanmani.durban/wp-content/uploads/2018/06/JBL_Go2_Hero_Deep_Sea_Blue-1605x1605px.jpg',
    id: 32,
    price: 1202.99,
    amount: 38
  },
  {
    categoryId: '5',
    name: 'Apple HomePod',
    url: 'https://s3-eu-west-1.amazonaws.com/klk-website/upload/product/19875/apple-homepod-wireless-bluetooth-speaker-with-home-assistant-white-1545127631-1.png',
    id: 33,
    price: 1096.99,
    amount: 100
  },
  {
    categoryId: '5',
    name: 'Sony BSO10',
    url: 'http://connected-365.com/wp-content/uploads/2018/08/BSP10JP-B-1-600x600.jpg',
    id: 34,
    price: 1118.99,
    amount: 100
  },
  {
    categoryId: '5',
    name: 'SVEN PS-465',
    url: 'https://content.it4profit.com/pimg/s/resize/600x600x600x600/181121150013067218.jpg',
    id: 35,
    price: 229.99,
    amount: 92
  },
  {
    categoryId: '5',
    name: 'HP S9500',
    url: 'http://www.techno.pk/wp-content/uploads/2018/01/HP_S9500_lowest_price_in_pakistan-1-600x600.jpg',
    id: 36,
    price: 1216.99,
    amount: 70
  },
  {
    categoryId: '6',
    name: 'XBOX 360 512GB',
    url: 'https://img.mvideo.ru/Pdb/11007469b.jpg',
    id: 37,
    price: 722.99,
    amount: 26
  },
  {
    categoryId: '6',
    name: 'Sony PlayStation 4 512Gb',
    url: 'https://img.moyo.ua/img/products/1964/95_600.jpg',
    id: 38,
    price: 922.99,
    amount: 78
  },
  {
    categoryId: '6',
    name: 'Nintendo Switch',
    url: 'https://cms.sulpak.kz/photo/img_0_68_117_4.jpg',
    id: 39,
    price: 1020.99,
    amount: 17
  },
  {
    categoryId: '6',
    name: 'XBOX One X',
    url: 'https://img.mvideo.ru/Pdb/40066763b.jpg',
    id: 40,
    price: 1123.99,
    amount: 26
  },
];

const compiler = webpack(webpackConfig);
app.use(middleware(compiler));

app.get('/categories', (req, res) => {
  res.send(categories);
});

app.get('/products', (req, res) => {
  try {
    console.log(1);
    const result = ProductsManager.filterProducts(req.query, products);
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
  const {productId} = req.params;
  try {
    const result = ProductsManager.findProduct(productId, products);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Unexpected error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});