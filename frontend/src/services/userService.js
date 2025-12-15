// src/services/userService.js
import api from "./apiClient";

export const getUserProfile = () => {
  return api.get("/users/profile");
};

export const updateUserProfile = (data) => {
  return api.put("/users/profile", data);
};
