require('./typography');

import React from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';

import './styles/index.sass';

import Header from './components/Header';
import Shows from './components/Shows';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Helmet
        title='Home | React 16 Webpack 4'
      />
      <div className="container">
        <Header />
        <Shows />
      </div>
      <Footer />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
