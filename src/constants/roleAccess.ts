
export const roleAccess = {
  superuser: ["dashboard", "policies", "compliance", "cicd", "settings", "agent"],
  admin: ["dashboard", "policies", "compliance", "settings", "agent"],
  developer: ["dashboard", "cicd", "agent"],
  auditor: ["dashboard", "compliance"],
  manager: ["dashboard", "policies"],
} as const;

export type Role = keyof typeof roleAccess;
export type AccessibleModule = (typeof roleAccess)[Role][number];
