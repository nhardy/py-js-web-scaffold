import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getPathname } from 'app/lib/routing';
import { fetchPageData } from 'app/actions/fetchPageData';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';

@asyncConnect({
  promise: (params, { store: { dispatch, getState } }) => {
    const promises = [];

    const pathname = getPathname(getState());

    if (!getState().pages[pathname]) {
      promises.push(dispatch(fetchPageData(pathname)));
    }

    return Promise.all(promises);
  },
})
@connect(state => {
  const pathname = getPathname(state);
  return {
    title: state.pages[pathname].data.meta.title,
  };
})
export default class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  };

  render() {
    const { title } = this.props;

    return (
      <div>
        <Helmet title={title} />
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
