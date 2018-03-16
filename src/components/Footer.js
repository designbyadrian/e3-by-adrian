import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default () => {
  return (
    <footer>
      <div className="container">
        <FontAwesomeIcon size="2x" icon={['fas', 'meh']} />
        <FontAwesomeIcon icon={['fas', 'question']} transform="left-4 up-24"/>
        <FontAwesomeIcon size="2x" icon={['fas', 'long-arrow-alt-right']} transform="left-2" />
        <a href="https://twitter.com/e3timer" title="E3 Timer on Twitter"><FontAwesomeIcon size="2x" icon={['fab', 'twitter']} /></a>
        <br />
        <br />
        V 2.0, content updated 2018-03-13. This website is not associated in any way with E3 Expo or its affiliates. Site by Design By Adrian Ltd. and made with React
      </div>
    </footer>
  );
};
