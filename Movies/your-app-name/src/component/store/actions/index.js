import axios from "axios";
import { GET_COMEDY_MOVIES, GET_NOW_PLAYINGS, GET_POPULAR_MOVIES, GET_SEARCH_MOVIE, GET_TOP_RATED_MOVIES, GET_TRENDING_MOVIES, SET_MOVIE_DETAIL } from "../type";

const API_KEY = "2adfa99338cf9ab6d2cbde485b3a52de";
const BASE_URL = "https://api.themoviedb.org/3";

const API_URL = "http://localhost:8181/movies";

//get popular movies

export const getPopularMovies = () => async (dispatch) => {
  try {
    const result = await axios.get(`${API_URL}/type/page=1`);
    dispatch({
      type: GET_POPULAR_MOVIES,
      payload: result.data.movies,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// get trenging movies

export const getTopRatedMovies = () => async (dispatch) => {
  try {
    const result = await axios.get(`${API_URL}/type/page=2`);
    dispatch({
      type: GET_TOP_RATED_MOVIES,
      payload: result.data.movies,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// get trending movies

export const getTrendingMovies = () => async (dispatch) => {
  try {
    const result = await axios.get(`${API_URL}/type/page=3`);
    dispatch({
      type: GET_TRENDING_MOVIES,
      payload: result.data.movies,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// get Comedy movies

export const getComedyMovies = () => async (dispatch) => {
  try {
    const result = await axios.get(`${API_URL}/type/page=4`);
    dispatch({
      type: GET_COMEDY_MOVIES,
      payload: result.data.movies,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// Now playing slider

export const getNowPlayingMovies = () => async (dispatch) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=4`
    );
    dispatch({
      type: GET_NOW_PLAYINGS,
      payload: result.data.results,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// search movie
// const searchMovieAPI = "http://localhost:8181/movies/search_movie";
export const getSearchMovie = (keywords) => async (dispatch) => {
  try {
    const result = await axios.get(
      `${API_URL}/search_movie/?keyword=${keywords}`
    );
    dispatch({ type: GET_SEARCH_MOVIE, payload: result.data });
  } catch (error) {
    console.log("Error", error);
  }
};

export const setMovieDetail = (movie) => (dispatch) => {
  dispatch({ type: SET_MOVIE_DETAIL, payload: movie });
};

// delete movie
export const deleteMovie = (id) => {
  return axios.delete(`${API_URL}/delete_movie/${id}`);
};