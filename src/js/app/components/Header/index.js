import React, { Component } from 'react';

import styles from './styles.styl';

export default class Header extends Component {

  render() {
    return (
      <header className={styles.root}>
        <h1>This is a heading</h1>
        <p>{`${JSON.stringify(styles)}`}</p>
      </header>
    );
  }
}
