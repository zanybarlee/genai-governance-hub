
export type AccessibleModule = "dashboard" | "policies" | "compliance" | "settings" | "cicd" | "agent" | "monitoring";
export type Role = "superuser" | "admin" | "developer" | "auditor" | "manager" | "viewer";

export const roleAccess: Record<Role, AccessibleModule[]> = {
  superuser: ["dashboard", "policies", "compliance", "settings", "cicd", "agent", "monitoring"],
  admin: ["dashboard", "policies", "compliance", "settings", "cicd", "agent", "monitoring"],
  developer: ["dashboard", "policies", "compliance", "cicd", "agent", "monitoring"],
  auditor: ["dashboard", "policies", "compliance", "monitoring"],
  manager: ["dashboard", "policies", "compliance", "settings", "monitoring"],
  viewer: ["dashboard", "policies", "compliance", "monitoring"]
};
