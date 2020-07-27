import React from 'react';
import PropTypes from 'prop-types';
import './movie-page.css';
import { Tabs } from 'antd';
import MoviePageSearch from '../movie-page-search';
import MoviePageRated from '../movie-page-rated';
import MoviesService from '../../services/movies-service';

const { TabPane } = Tabs;

export default class MoviePage extends React.Component {
  state = {
    switchKeys: ['search'],
  };

  m = new MoviesService();

  callback(key) {
    console.log(key);
  }

  render() {
    const { guestSessionId } = this.props;

    return (
      <div className="movie-page">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Search" key="1">
            <MoviePageSearch
              getMovies={this.m.getMovies}
              rateMovie={(id, vote) => this.m.rateMovie(guestSessionId, id, vote)}
            />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <MoviePageRated
              rateMovie={(id, vote) => this.m.rateMovie(guestSessionId, id, vote)}
              getRatedMovies={() => this.m.getRatedMovies(guestSessionId)}
            />
          </TabPane>
          <TabPane tab="Zagotovka" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

MoviePage.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
};
