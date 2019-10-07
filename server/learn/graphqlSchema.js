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
    categoryId: {type: GraphQLID},
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return productManager.getCategory({
          id: parent.categoryId,
          database,
        });
      }
    }
  }),
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

export default new GraphQLSchema({
  query: Query,
});