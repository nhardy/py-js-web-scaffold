import React, { Component, PropTypes } from 'react';

import styles from './styles.styl';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      target: PropTypes.string,
      children: PropTypes.array,
    })),
  };

  render() {
    const { title, tagline, links } = this.props;

    return (
      <header className={styles.root}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.tagline}>{tagline}</span>
          <nav>
            <ul>
              {links && links.map(({ label, href, target }) => (
                <li><a href={href} target={target}>{label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
