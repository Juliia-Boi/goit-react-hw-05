import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTAzODIzYjU2ODJjNjQxNmE2NGEyNzk2NDFlOTM4ZiIsIm5iZiI6MTcyNzM4Mjg4MS4xMjIzNDksInN1YiI6IjY2ZjVjM2MyNzczZjBhN2FhNWQ1ZGI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DfsM54WJp77LgqX6OUcfuRACSjjy7_TM0tjjlcj0cBI";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
