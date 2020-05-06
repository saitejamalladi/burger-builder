import React from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './App.module.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';

const app = (props) => (
  <div className={classes.App}>
    <Layout>
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    </Layout>
  </div>
);

export default app;
