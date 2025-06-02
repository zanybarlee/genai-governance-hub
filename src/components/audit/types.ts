
export interface AuditScopeSession {
  id: string;
  name: string;
  createdAt: Date;
  lastUpdated: Date;
  auditType: string;
  customAuditName?: string;
  selectedFrameworks: string[];
  scopeText: string;
  controlDomains: ControlDomain[];
  aiResponse?: string;
}

export interface ControlDomain {
  id: string;
  name: string;
  description: string;
  policyReferences: string[];
  status: "identified" | "processing" | "ready";
}
