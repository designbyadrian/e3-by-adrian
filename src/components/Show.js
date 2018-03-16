import React from 'react';
import moment from 'moment';
import Img from 'react-image';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Counter from './Counter';

export default class Show extends React.Component {

  shouldComponentUpdate(props) {
    return (
      this.props.startTimeFromNow !== props.startTimeFromNow ||
      this.props.timeFromNowRelative !== props.timeFromNowRelative
    );
  }

  render() {
    const img = `/assets/logos/${this.props.id}.svg`;
    const time = moment(this.props.time).format("LLLL");
    const startTimeFromNow = this.props.startTimeFromNow;

    let status = 'ticking';
    let expiryText = this.props.timeFromNowRelative;

    if (this.props.startTimeFromNow <= 0) {
      status = 'running';
      expiryText = `Started ${this.props.timeFromNowRelative}`;
    }
    if (this.props.endTimeFromNow <= 0) {
      status = 'expired';
      expiryText = `Ended ${this.props.timeFromNowRelative}`;
    }

    return (
      <div className={`show show--${status}`}>
        <div className="show__image">
          <Img alt={this.props.name} src={img} />
        </div>
        <div className="show__content">
          <div className="show__time">
            <small>{time}</small>
          </div>
          {status !== 'ticking' ? (
            <div className="show__expired">{expiryText}</div>
          ) : (
            <Counter time={startTimeFromNow} />
          )}
          <div className="show__links">
            {this.props.links.map(link =>
              <a key={link.icon} href={link.url} className="btn" target="_blank"><FontAwesomeIcon transform="shrink-2" icon={link.icon} /> {link.title}</a>
            )}
          </div>
        </div>
      </div>
    );

  }
}
