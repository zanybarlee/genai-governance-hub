
export type Role = "superuser" | "admin" | "developer" | "auditor" | "manager" | "viewer";

export type AccessibleModule = 
  | "dashboard" 
  | "policies" 
  | "compliance" 
  | "cicd" 
  | "agent" 
  | "audit"
  | "settings";

export const roleAccess: Record<Role, AccessibleModule[]> = {
  superuser: ["dashboard", "policies", "compliance", "cicd", "agent", "audit", "settings"],
  admin: ["dashboard", "policies", "compliance", "cicd", "agent", "audit", "settings"],
  developer: ["dashboard", "policies", "cicd", "agent"],
  auditor: ["dashboard", "policies", "compliance", "audit"],
  manager: ["dashboard", "policies", "compliance", "audit"],
  viewer: ["dashboard"],
};
