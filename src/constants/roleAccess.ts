
export type Role = "superuser" | "admin" | "developer" | "auditor" | "manager" | "viewer" | "system-engineer" | "audit-manager" | "it-manager" | "senior-management";

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
  "system-engineer": ["dashboard", "cicd", "agent", "audit"], // Can access systems and respond to audit requests
  "audit-manager": ["dashboard", "policies", "compliance", "audit", "settings"], // Manages audit processes and teams
  "it-manager": ["dashboard", "policies", "compliance", "cicd", "settings"], // IT leadership with broad access except direct auditing
  "senior-management": ["dashboard", "compliance"], // Executive view focused on compliance and high-level dashboards
};
