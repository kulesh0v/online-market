import loki from  'lokijs';

const db = new loki('products.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

function databaseInitialize() {
  let products = db.getCollection('products');
  if (!products) {
    products = db.addCollection("products");
    products.insert([
      {
        categoryId: 1,
        name: 'Samsung S10e',
        url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1551208882-samsung-galaxy-s10e-smartphone-1550695757.jpg',
        price: 760.99,
        amount: 91
      },
      {
        categoryId: 1,
        name: 'Asus Rog Phone',
        url: 'https://www.asus.com/media/global/products/YHbcnTAG8qt4B47T/P_setting_fff_1_90_end_600.png',
        price: 448.99,
        amount: 55
      },
      {
        categoryId: 1,
        name: 'Samsung A40',
        url: 'https://www.dateks.lv/images/pic/600/600/783/423.jpg',
        price: 303.99,
        amount: 77
      },
      {
        categoryId: 1,
        name: 'Samsung S9',
        url: 'https://www.pricerunner.com/product/600x600/1814566310/Samsung-Galaxy-S9-64GB.jpg?c=0.7',
        price: 1286.99,
        amount: 48
      },
      {
        categoryId: 1,
        name: 'Xiaomi Redmi Note 7',
        url: 'https://quke.ru/UserFiles/Landing/products/59968_photos_0.jpeg',
        price: 1080.99,
        amount: 67
      },
      {
        categoryId: 1,
        name: 'Huawei P30',
        url: 'https://img.mvideo.ru/Pdb/30043038b.jpg',
        price: 689.99,
        amount: 61
      },
      {
        categoryId: 2,
        name: 'Asus Studiobook',
        url: 'https://www.asus.com/media/global/products/YkMxOYzNhCW0mwpT/P_setting_fff_1_90_end_600.png',
        price: 989.99,
        amount: 87
      },
      {
        categoryId: 2,
        name: 'Asus ZenBook 14',
        url: 'https://www.asus.com/media/global/products/IAUUa98beOzYP4WZ/P_setting_fff_1_90_end_600.png',
        price: 866.99,
        amount: 89
      },
      {
        categoryId: 2,
        name: 'Apple MacBook Pro 13',
        url: 'https://img.mvideo.ru/Pdb/30039067b.jpg',
        price: 322.99,
        amount: 78
      },
      {
        categoryId: 2,
        name: 'Huawei MateBook X',
        url: 'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2018/07/09/source-img/20180709135730_48015.jpg',
        price: 731.99,
        amount: 96
      },
      {
        categoryId: 2,
        name: 'Dell XPS 13',
        url: 'https://vipcomp.by/image/cache/data/quad/12/dell-xps-13-9370-1719-12225-1-600x600.jpg',
        price: 536.99,
        amount: 7
      },
      {
        categoryId: 2,
        name: 'HP Pavilion 14',
        url: 'https://img.mvideo.ru/Pdb/30039625b.jpg',
        price: 442.99,
        amount: 51
      },
      {
        categoryId: 3,
        name: 'Lenovo Tab',
        url: 'https://img.mvideo.ru/Pdb/30042186b.jpg',
        price: 69.99,
        amount: 33
      },
      {
        categoryId: 3,
        name: 'Lenovo Youga',
        url: 'https://img.mvideo.ru/Pdb/30028499b.jpg',
        price: 826.99,
        amount: 28
      },
      {
        categoryId: 3,
        name: 'Asus Zenpad',
        url: 'https://img.mvideo.ru/Pdb/30029544b.jpg',
        price: 644.99,
        amount: 18
      },
      {
        categoryId: 3,
        name: 'Apple Ipad',
        url: 'https://img.mvideo.ru/Pdb/30036515b.jpg',
        price: 1050.99,
        amount: 2
      },
      {
        categoryId: 3,
        name: 'Sumsung Tablet Galaxy',
        url: 'https://www.dateks.lv/images/pic/600/600/416/415.jpg',
        price: 958.99,
        amount: 5
      },
      {
        categoryId: 3,
        name: 'Xiaomi Mi Pad 8',
        url: 'https://img.mvideo.ru/Pdb/30026477b.jpg',
        price: 1349.99,
        amount: 33
      },
      {
        categoryId: 4,
        name: 'Xiaomi Mi BP Mini',
        url: 'http://5element.by/upload/5element/aeb/aebe071221fd7602453df4af4efd977a.jpg',
        price: 1142.99,
        amount: 49
      },
      {
        categoryId: 4,
        name: 'JBL Flip 4',
        url: 'https://s4.sywcdn.net/getImage?url=https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_b63e040d-7d68-4963-929a-bbe0ef4c2a7a&t=Product&w=600&h=600&qlt=100&mrg=1&str=1&s=bb170e63d82774ec13cc1832408225cf',
        price: 131.99,
        amount: 23
      },
      {
        categoryId: 4,
        name: 'JBL Go 2',
        url: 'https://govanmani.durban/wp-content/uploads/2018/06/JBL_Go2_Hero_Deep_Sea_Blue-1605x1605px.jpg',
        price: 935.99,
        amount: 75
      },
      {
        categoryId: 4,
        name: 'Apple HomePod',
        url: 'https://s3-eu-west-1.amazonaws.com/klk-website/upload/product/19875/apple-homepod-wireless-bluetooth-speaker-with-home-assistant-white-1545127631-1.png',
        price: 406.99,
        amount: 57
      },
      {
        categoryId: 4,
        name: 'Sony BSO10',
        url: 'http://connected-365.com/wp-content/uploads/2018/08/BSP10JP-B-1-600x600.jpg',
        price: 572.99,
        amount: 53
      },
      {
        categoryId: 4,
        name: 'SVEN PS-465',
        url: 'https://content.it4profit.com/pimg/s/resize/600x600x600x600/181121150013067218.jpg',
        price: 1080.99,
        amount: 24
      },
      {
        categoryId: 4,
        name: 'HP S9500',
        url: 'http://www.techno.pk/wp-content/uploads/2018/01/HP_S9500_lowest_price_in_pakistan-1-600x600.jpg',
        price: 618.99,
        amount: 93
      },
      {
        categoryId: 5,
        name: 'XBOX 360 512GB',
        url: 'https://img.mvideo.ru/Pdb/11007469b.jpg',
        price: 1088.99,
        amount: 61
      },
      {
        categoryId: 5,
        name: 'Sony PlayStation 4 512Gb',
        url: 'https://img.moyo.ua/img/products/1964/95_600.jpg',
        price: 1343.99,
        amount: 43
      },
      {
        categoryId: 5,
        name: 'Nintendo Switch',
        url: 'https://cms.sulpak.kz/photo/img_0_68_117_4.jpg',
        price: 332.99,
        amount: 74
      },
      {
        categoryId: 5,
        name: 'XBOX One X',
        url: 'https://img.mvideo.ru/Pdb/40066763b.jpg',
        price: 1105.99,
        amount: 60
      },

    ]);
  }

  let categories = db.getCollection('categories');
  if (!categories) {
    categories = db.addCollection('categories');
    categories.insert([
      {
        name: "Mobile phones",
        id: '1',
      },
      {
        name: 'Laptops',
        id: '2',
      },
      {
        name: 'Tablets',
        id: '3',
      },
      {
        name: 'Bluetooth speakers',
        id: '4',
      },
      {
        name: 'Games consoles',
        id: '5'
      }
    ]);
  }
}

export default db;

