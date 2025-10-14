import jwtDecode from "jwt-decode";

export const saveAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const u = localStorage.getItem("user");
  if (!u) return null;
  try { return JSON.parse(u); } catch (e) { return null; }
};

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const user = getCurrentUser();
  return user?.role;
};
