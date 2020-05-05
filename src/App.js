import React from 'react';
import classes from './App.module.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

const app = (props) => (
  <div className={classes.App}>
    <Layout>
      <BurgerBuilder />
    </Layout>
  </div>
);

export default app;
