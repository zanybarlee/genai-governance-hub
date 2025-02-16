
export const roleAccess = {
  superuser: ["dashboard", "policies", "compliance", "cicd", "settings", "agent"],
  admin: ["dashboard", "policies", "compliance", "settings", "agent"],
  developer: ["dashboard", "cicd", "agent"],
  auditor: ["dashboard", "compliance"],
  manager: ["dashboard", "policies"],
} as const;

export type Module = keyof typeof roleAccess;
