import axios from "axios";
const API = "http://localhost:8080/auth";

export const signupUser = async (data) =>
  axios.post(`${API}/signup`, data);

export const loginUser = async (data) =>
  axios.post(`${API}/login`, data);
