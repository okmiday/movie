import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-rated.css';
import Movies from '../movies';

export default class MoviePageRated extends React.Component {
  state = {
    movieBlocksData: [],
    loading: true,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.props.getRatedMovies()
      .then(({ movieBlocksData }) =>
        this.setState({
          loading: false,
          error: false,
          movieBlocksData,
        })
      )
      .catch((error) =>
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { getRatedMovies } = this.props;
    const { moviesBlocksData } = this.state;


    if (prevState.moviesBlocksData === moviesBlocksData) {
      getRatedMovies()
        .then(({ movieBlocksData }) =>
          this.setState({
            loading: false,
            error: false,
            movieBlocksData,
          })
        )
        .catch((error) =>
          this.setState({
            error: true,
            errorMessage: error.message,
          })
        );
    }
  }


  render() {
    const { className, rateMovie } = this.props;
    const { movieBlocksData, loading, error, errorMessage } = this.state;

    return (
      <div className={`movie-page-rated ${className}`}>
        <Movies
          movieBlocksData={movieBlocksData}
          loading={loading}
          error={error}
          errorMessage={errorMessage}
          rateMovie={rateMovie}
        />
      </div>
    );
  }
}

MoviePageRated.propTypes = {
  getRatedMovies: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
};
