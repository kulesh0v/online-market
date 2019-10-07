import express from 'express';
import webpackConfig from '../webpack.config.js';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import productsApiRouter from './routes/productApi.js';
import categoriesApiRouter from './routes/categoryApi.js';
import schema from './learn/graphqlSchema.js';

const app = express();
const compiler = webpack(webpackConfig);

app.use(middleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(express.json());

app.use('/products', productsApiRouter);
app.use('/categories', categoriesApiRouter);

//<LEARN>
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
//</LEARN>

app.get('*/bundle.js', (req, res) => {
  const filename = path.join(compiler.outputPath, 'bundle.js');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.type('application/javascript');
    res.send(result);
  });
});

app.get('*', (req, res) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.type('html');
    res.send(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});