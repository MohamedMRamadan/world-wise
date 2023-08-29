import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext({
  isAuthanticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  isAuthanticated: false,
  user: null,
};
const reducerFucn = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthanticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthanticated: false, user: null };
    default:
      throw new Error("Bad Request");
  }
};
export const AuthProvider = ({ children }) => {
  const [{ isAuthanticated, user }, dispatch] = useReducer(
    reducerFucn,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ isAuthanticated, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined)
    throw new Error("AuthContext has used outside AuthProvider");
  return auth;
};
// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
