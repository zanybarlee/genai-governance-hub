
export type AccessibleModule = "dashboard" | "policies" | "compliance" | "settings" | "cicd" | "agent" | "monitoring";
export type Role = "admin" | "developer" | "viewer" | "superuser";

export const roleAccess: Record<Role, AccessibleModule[]> = {
  superuser: ["dashboard", "policies", "compliance", "settings", "cicd", "agent", "monitoring"],
  admin: ["dashboard", "policies", "compliance", "settings", "cicd", "agent", "monitoring"],
  developer: ["dashboard", "policies", "compliance", "cicd", "agent", "monitoring"],
  viewer: ["dashboard", "policies", "compliance", "monitoring"]
};
