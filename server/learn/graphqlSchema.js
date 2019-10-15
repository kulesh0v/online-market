import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import database from '../database.js';
import ProductsManager from "../ProductsManager";

const productManager = ProductsManager();

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    price: {type: GraphQLFloat},
    amount: {type: GraphQLInt},
    ratingsIds: {type: GraphQLList(GraphQLID)},
    ratings: {
      type: GraphQLList(RatingType),
      resolve(parent, args) {
        return Promise.all(parent.ratingsIds.map(ratingId =>
          new Promise((res, rej) => {
            setTimeout(_ => {
              res(productManager.getRating({
                id: ratingId,
                database: database,
              }))
            }, 1000)
          })
        ));
      }
    },
    categoryId: {type: GraphQLID},
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return productManager.getCategory({
          id: parent.categoryId,
          database,
        });
      }
    },
  }),
});

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  fields: () => ({
    id: {type: GraphQLID},
    productId: {type: GraphQLID},
    rating: {type: GraphQLInt},
  })
});

const ProductsListType = new GraphQLObjectType({
  name: 'ProductsList',
  fields: () => ({
    productsAmount: {type: GraphQLInt},
    products: {type: new GraphQLList(ProductType)},
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    productsList: {
      type: ProductsListType,
      resolve(parent, args) {
        return productManager.filterProducts({
          filterConfig: {categoryId: parent.id.toString()},
          database,
        });
      },
    }
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    product: {
      type: ProductType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return productManager.getProduct({
          id: args.id,
          database,
        });
      }
    },
    category: {
      type: CategoryType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return productManager.getCategory({
          id: args.id,
          database,
        });
      }
    },
    categories: {
      args: {ids: {type: new GraphQLList(GraphQLID)}},
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return args.ids ?
          productManager.getCategories({database}).filter(c => args.ids.includes(c.id.toString())) :
          productManager.getCategories({database});
      }
    },

    productsList: {
      type: ProductsListType,
      args: {
        minPrice: {type: GraphQLFloat},
        maxPrice: {type: GraphQLFloat},
        categoryId: {type: new GraphQLList(GraphQLID)},
        page: {type: GraphQLInt},
      },
      resolve(parent, args) {
        return productManager.filterProducts({
          filterConfig: args,
          database,
        });
      },
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRating: {
      type: RatingType,
      args: {
        rating: {type: GraphQLInt},
        productId: {type: GraphQLID},
      },
      errors: {type: GraphQLString},
      async resolve(parent, args) {
        try {
          return await new Promise((res, rej) => {
            setTimeout(() => {
              if (Math.random() > 0.5) {
                const result = productManager.addRating({
                  rating: args.rating,
                  productId: args.productId,
                  database
                });
                res({...result, id: result.$loki});
              } else {
                rej(new Error('You have already rated this item'))
              }
            }, 2000);
          })
        } catch (e) {
          throw e;
        }
      }
    }
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});