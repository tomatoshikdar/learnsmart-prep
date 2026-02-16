import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<UserRole, User> = {
  student: { id: "s1", name: "Rahim Ahmed", email: "student@exam.pro", role: "student" },
  teacher: { id: "t1", name: "Dr. Karim Hasan", email: "teacher@exam.pro", role: "teacher" },
  admin: { id: "a1", name: "Admin User", email: "admin@exam.pro", role: "admin" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("exampro_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (_email: string, _password: string, role: UserRole) => {
    const u = MOCK_USERS[role];
    setUser(u);
    localStorage.setItem("exampro_user", JSON.stringify(u));
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    const u = { ...MOCK_USERS[role], name, email };
    setUser(u);
    localStorage.setItem("exampro_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("exampro_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
