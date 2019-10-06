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

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return productManager.filterProducts({
          filterConfig: {categoryId: parent.id.toString(), page: 0},
          database,
        }).products;
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
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return productManager.getCategories({database});
      }
    },

    products: {
      type: new GraphQLList(ProductType),
      args: {
        minPrice: {type: GraphQLFloat},
        categoryId: {type: GraphQLList},
      },
      resolve(parent, args) {
        return productManager.filterProducts({
          filterConfig: {minPrice: args.minPrice},
          database,
        }).products;
      }
    }
  },
});

export default new GraphQLSchema({
  query: Query,
});