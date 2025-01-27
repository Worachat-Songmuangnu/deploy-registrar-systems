// useAuth.js
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useCookie } from "./useCookie";
import conf from "../conf/main";
import ax, { axData } from "../conf/ax";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt, removeJwt] = useCookie("user", null);
  const [user, setUser] = useState(null);
  const [isLoginPending, setIsLoginPending] = useState(true);
  const navigate = useNavigate();

  const updateJwt = useCallback(
    (jwt) => {
      axData.jwt = jwt;
      if (!jwt) {
        removeJwt();
      }
    },
    [removeJwt]
  );

  const autoLogin = useCallback(async () => {
    try {
      setIsLoginPending(true);
      if (jwt) {
        updateJwt(jwt.jwt);
        const response = await ax.get(conf.jwtRoleEndpoint);
        const userData = response.data;
        const role = userData.role.name;
        setUser({ ...userData, role: role });
      }
    } catch (error) {
      console.error("Login failed:", error.message || "An error occurred");
    } finally {
      setIsLoginPending(false);
    }
  }, [jwt, updateJwt]);

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line
  }, []);

  const login = useCallback(
    async (formData) => {
      try {
        const response = await ax.post(conf.loginEndpoint, {
          identifier: formData.identifier,
          password: formData.password,
        });

        const { jwt, user: userData } = response.data;

        updateJwt(jwt);

        const roleResponse = await ax.get(conf.jwtRoleEndpoint);
        const role = roleResponse.data.role.name;

        const cookieOptions = formData.rememberMe
          ? {
              path: "/",
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            } // Persistent cookie (30 days)
          : { path: "/" }; // Session cookie

        setJwt({ jwt }, cookieOptions, formData.rememberMe);
        setUser({ ...userData, role });
        if (role === "student") {
          navigate("/student/dashboard", { replace: true });
        } else if (role === "teacher") {
          navigate("/teacher/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Login failed:", error.message || "An error occurred");
        alert("Login failed. Please check your credentials.");
      }
    },
    [navigate, setUser, setJwt, updateJwt]
  );

  const logout = useCallback(() => {
    removeJwt();
    setUser();
    navigate("/", { replace: true });
  }, [navigate, removeJwt]);

  const contextValue = useMemo(
    () => ({
      isLoginPending,
      user,
      login,
      logout,
    }),
    [isLoginPending, user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
