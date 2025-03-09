
import { createContext, useContext, useState, ReactNode } from "react";

// Updated Role type to include all available roles
export type Role = "superuser" | "admin" | "developer" | "auditor" | "manager" | "viewer";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // Initialize with developer role as default
  const [role, setRole] = useState<Role>("developer");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
