export default class MoviesService {
  apiKey = '3948d9a57f99991d20df72892016a965';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500';

  createSearchMoviesURL = (query, page) => {
    const searchUrl = `${this.url}/search/movie?api_key=${this.apiKey}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `${searchUrl}&query=${encodedQuery}&page=${page}`;

    return url;
  };

  prepareMoviesJson = ({ results, total_pages: totalPages }) => {
    const movieBlocksData = results.map((el) => {
      const img = el.poster_path == null ? '' : this.urlImageDB + el.poster_path;

      const movieData = {
        id: el.id,
        title: el.title,
        overview: el.overview,
        date: el.release_date,
        img,
        vote: `${el.vote_average}`,
        rating: el.rating,
        genreIds: el.genre_ids,
      };

      return movieData;
    });

    return { movieBlocksData, totalPages };
  };

  getMovies = (query, page = 1) => {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      return fetch(this.createSearchMoviesURL(query, page))
        .then((responce) => responce.json())
        .then((json) => this.prepareMoviesJson(json));
    }
    return { movieBlocksData: [], totalPages: 0 };
  };

  createGuestSession = () => {
    return fetch(`${this.url}/authentication/guest_session/new?api_key=${this.apiKey}`)
      .then((response) => response.json())
      .then(({ guest_session_id: id }) => id);
  };

  rateMovie = (guestSessionId, id, vote) => {
    const rateUrl = `${this.url}/movie/${id}/rating?api_key=${this.apiKey}`;

    fetch(`${rateUrl}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: Number(vote),
      }),
    });
  };

  getRatedMovies = (guestSessionId) => {
    return fetch(`${this.url}/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}`)
      .then((response) => response.json())
      .then((json) => this.prepareMoviesJson(json));
  };

  getGenreList = () => {
    return fetch(`${this.url}/genre/movie/list?api_key=${this.apiKey}`).then((response) =>
      response.json()
    );
  };
}
