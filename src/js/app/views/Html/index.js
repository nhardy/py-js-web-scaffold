import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import stats from 'server/stats';


export default class Html extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const { component, store } = this.props;
    const content = component ? ReactDOMServer.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <meta httpEquiv="Content-Type" value="text/html; charset='utf-8'" />
          <link rel="stylesheet" type="text/css" href={`/${stats.cssBundle}`} />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${JSON.stringify(store.getState())};`,
            }} />
          <script src={`/${stats.jsBundle}`} />
        </body>
      </html>
    );
  }
}
