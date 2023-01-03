import { GET_COMEDY_MOVIES, GET_NOW_PLAYINGS, GET_POPULAR_MOVIES, GET_SEARCH_MOVIE, GET_TOP_RATED_MOVIES, GET_TRENDING_MOVIES, SET_MOVIE_DETAIL } from "../type";


const reducerMoviesInitialState = {
  PopularMovies: null,
  TopRatedMovies: null,
  TrendingMovies: null,
  ComdedyMovies: null,
  NetflixNowPlayings: null,
  SearchMovie: null,
  MovieDetail: null,
};

const reducerMovies = (state = reducerMoviesInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POPULAR_MOVIES:
      return { ...state, PopularMovies: payload };
    case SET_MOVIE_DETAIL:
      return { ...state, MovieDetail: payload };
    case GET_TOP_RATED_MOVIES:
      return { ...state, TopRatedMovies: payload };
    case GET_TRENDING_MOVIES:
      return { ...state, TrendingMovies: payload };
    case GET_COMEDY_MOVIES:
      return { ...state, ComdedyMovies: payload };
    case GET_NOW_PLAYINGS:
      return { ...state, NetflixNowPlayings: payload };
    case GET_SEARCH_MOVIE:
      return { ...state, SearchMovie: payload };
    default:
      return state;
  }
};

export default reducerMovies;