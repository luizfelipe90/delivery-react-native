import React, { createContext, ReactNode, useContext, useState } from "react";

export interface User {
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  address?: string;
  deliveryAddresses?: string[];
}

interface AuthContextType {
  user: User | null;
  registerUser: (user: User) => void;
  updateUser: (userUpdate: Partial<User>) => void;
  addDeliveryAddress: (address: string) => void;
  logout: () => void;
  isRegistered: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = (newUser: User) => {
    setUser({ ...newUser, deliveryAddresses: newUser.deliveryAddresses ?? [] });
  };

  const updateUser = (userUpdate: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userUpdate } : prev));
  };

  const addDeliveryAddress = (address: string) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            deliveryAddresses: [...(prev.deliveryAddresses ?? []), address],
          }
        : prev,
    );
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        updateUser,
        addDeliveryAddress,
        logout,
        isRegistered: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
