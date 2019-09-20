import React from 'react';
import {IntlProvider} from 'react-intl';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import messages from '../constants/messages.js';
import SidebarContainer from './SidebarContainer.js';
import {Layout} from 'antd'
import {connect} from "react-redux";
import {setLocale} from "../actions/global";
import NavigationBar from "../components/header/NavigationBar.js";
import CategoryWindow from '../components/windows/CategoryWindow.js';
import {addCategory, editCategory} from "../actions/categories";
import {getProducts} from "../actions/products.js";


const {Content, Footer} = Layout;
const history = createBrowserHistory();
const App = ({locale, setLocale, editCategory, addCategory, closeWindow, routes}) => {
  return (
    <Router history={history}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout>

          <SidebarContainer/>

          <Layout>

            <Content>

              <Route
                exact path={'/addCategory'}
                component={() =>
                  <CategoryWindow
                    closeWindow={closeWindow}
                    addCategory={addCategory}
                    editCategory={editCategory}
                  />
                }/>

              <Route
                exact path={'/editCategory/:categoryId'}
                component={({match}) => {
                  const {categoryId} = match.params;
                  return <CategoryWindow
                    closeWindow={closeWindow}
                    addCategory={addCategory}
                    editCategory={editCategory}
                    categoryURL={routes.categoryById(categoryId)}
                  />
                }
                }/>
            </Content>

          </Layout>

        </Layout>
      </IntlProvider>
    </Router>
  )
};

const mapStateToProps = (state) => {
  return {
    locale: state.global.locale || 'en',
    history: history,
    routes: state.global.routes,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: dispatch(setLocale),
    addCategory: (category) => dispatch(addCategory(category)),
    editCategory: (id, category) => dispatch(editCategory(id, category)),
    closeWindow: () => {
      history.goBack();
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
