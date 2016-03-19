import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPathname } from 'app/lib/routing';

import styles from './styles.styl';


@connect(state => {
  const pathname = getPathname(state);
  return {
    ...state.pages[pathname].data.footer,
  };
})
export default class Footer extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    copyright: PropTypes.string,
  };

  render() {
    const { copyright } = this.props;

    return (
      <footer className={styles.root}>
        <div className={styles.wrapper}>
          <span className={styles.copyright}>{`© ${copyright}`}</span>
        </div>
      </footer>
    );
  }
}
