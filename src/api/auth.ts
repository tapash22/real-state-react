import { demoUser, type User } from "../data";

export const getCurrentUser = async (): Promise<User | null> => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated !== "true") {
    return null;
  }

  return demoUser;
};

export const loginUser = async (): Promise<User> => {
  localStorage.setItem("isAuthenticated", "true");

  return demoUser;
};

export const logoutUser = async () => {
  localStorage.removeItem("isAuthenticated");

  return true;
};
