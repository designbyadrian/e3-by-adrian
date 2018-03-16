import React from 'react';
import 'whatwg-fetch';
import moment from 'moment';

import Show from './Show';

export default class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.sortShows = this.sortShows.bind(this);
    this.groupShows = this.groupShows.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);

    this.state = { days: [] };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch('/data.json')
      .then(data => data.json())
      .then(this.modifyData)
      .then(this.sortShows)
      .then(this.groupShows)
      .then(days => {
        this.setState({ days }, this.startTimer);
      })
      .catch(e => console.warn(e));
  }

  modifyData(data) {
    return new Promise(resolve => {
      const shows = data.shows.map(show => {
        show.id = show.name.replace(/\s/g, '-').toLowerCase();
        show.startTimeFromNow = this.getTimeLeft(show.startTime);
        show.endTimeFromNow = this.getTimeLeft(show.endTime);
        show.timeFromNowRelative = this.getTimeLeftRelative(show.startTime);
        show.lastUpdated = moment();
        return show;
      });
      resolve(shows);
    });
  }

  sortShows(shows) {
    return new Promise(resolve => {
      shows.sort((a, b) => {
        if (moment(a.startTime).isAfter(b.startTime)) {
          return 1;
        } else if (moment(a.startTime).isBefore(b.startTime)) {
          return -1;
        }
        return 0;
      });

      resolve(shows);
    });
  }

  groupShows(shows) {
    return new Promise(resolve => {
      const days = [];

      shows.forEach(show => {
        const currentDay = days[days.length - 1];
        const day = moment(show.startTime).format('YYYY-MM-DD')
        if (currentDay && currentDay.day === day) {
          currentDay.shows.push(show);
        } else {
          days.push( { day: moment(show.startTime).format('YYYY-MM-DD'), shows: [show] } );
        }
      });

      resolve(days);
    });
  }

  startTimer() {
    setInterval(this.tick, 1000);
  }

  tick() {
    const days = this.state.days.slice().map(day => {
      day.shows = day.shows.map(show => {
        const startTimeFromNow = this.getTimeLeft(show.startTime);
        const endTimeFromNow = this.getTimeLeft(show.endTime);
        const timeFromNowRelative = this.getTimeLeftRelative(show.startTime);

        if (startTimeFromNow >= -2000) {
          show.startTimeFromNow = startTimeFromNow;
          show.lastUpdated = moment();
        }

        if (
          timeFromNowRelative !== show.timeFromNowRelative ||
          show.lastUpdated - moment() < -60000
        ) {
          show.startTimeFromNow = startTimeFromNow;
          show.endTimeFromNow = endTimeFromNow;
          show.timeFromNowRelative = endTimeFromNow <= 0
            ? this.getTimeLeftRelative(show.endTime)
            : timeFromNowRelative;
          show.lastUpdated = moment();
        }

        return show;
      });
      return day;
    });

    this.setState({ days });
  }

  getTimeLeft(time) {
    const now = moment.now();
    const diff = moment(time).diff(now);
    return diff;
  }

  getTimeLeftRelative(time) {
    return moment(time).fromNow();
  }

  render() {
    return (
      <div className="show-days">
        {this.state.days.map(day =>
          <div data-day={day.day} key={day.day} className="day">
            {day.shows.map(show =>
              <Show key={show.id} {...show} />
            )}
          </div>
        )}
      </div>
    )
  }
}
