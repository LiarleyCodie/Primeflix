import axios from "axios";
// API_BASE: https://api.themoviedb.org/3/
// API_KEY: 5007166ecf27872bbdf768abb07e7214

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const API_KEY: string = "5007166ecf27872bbdf768abb07e7214";
