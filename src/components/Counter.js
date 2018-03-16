import React from 'react';
import moment from 'moment';

export default props => {
  const duration = moment.duration(props.time);
  const months = `00${duration.months()}`.slice(-2);
  const days = `00${duration.days()}`.slice(-2);
  const hours = `00${duration.hours()}`.slice(-2);
  const minutes = `00${duration.minutes()}`.slice(-2);
  const seconds = `00${duration.seconds()}`.slice(-2);

  return (
    <div className="counter">
      {months > 0 &&
        <div className="counter__digit">
          <strong>{months}</strong><br />
          <small>mon</small>
        </div>
      }
      <div className="counter__digit">
        <strong>{days}</strong><br />
        <small>days</small>
      </div>
      <div className="counter__digit">
        <strong>{hours}</strong><br />
        <small>hours</small>
      </div>
      <div className="counter__digit">
        <strong>{minutes}</strong><br />
        <small>min</small>
      </div>
      {months <= 0 &&
        <div className="counter__digit">
          <strong>{seconds}</strong><br />
          <small>sec</small>
        </div>
      }
    </div>
  );
};
