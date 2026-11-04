import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("lume_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // REGISTER
  const register = (name, email, password) => {
    const users = JSON.parse(
      localStorage.getItem("lume_users") || "[]"
    );

    // Check if email already exists
    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "lume_users",
      JSON.stringify(users)
    );

    // Automatically login after registration
    setUser(newUser);

    localStorage.setItem(
      "lume_user",
      JSON.stringify(newUser)
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem("lume_users") || "[]"
    );

    const existingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setUser(existingUser);

    localStorage.setItem(
      "lume_user",
      JSON.stringify(existingUser)
    );

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("lume_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}