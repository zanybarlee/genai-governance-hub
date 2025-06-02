
import { AuditExecutionSession } from "../hooks/useAuditExecution";

export interface AuditReport {
  id: string;
  name: string;
  framework: string;
  auditor: string;
  completedDate: string;
  status: "draft" | "review" | "final";
  findings: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  controls: {
    total: number;
    passed: number;
    failed: number;
  };
  executionResults?: any[];
  aiResponse?: string;
}

export const mockReports: AuditReport[] = [
  {
    id: "1",
    name: "Q3 SOC 2 Type II Audit Report",
    framework: "SOC 2",
    auditor: "David Lim",
    completedDate: "2024-10-15",
    status: "final",
    findings: { total: 5, critical: 1, high: 2, medium: 2, low: 0 },
    controls: { total: 24, passed: 19, failed: 5 }
  },
  {
    id: "2",
    name: "NIST Cybersecurity Framework Assessment",
    framework: "NIST CSF",
    auditor: "Mike Johnson",
    completedDate: "2024-11-20",
    status: "review",
    findings: { total: 7, critical: 2, high: 3, medium: 2, low: 0 },
    controls: { total: 23, passed: 16, failed: 7 }
  },
  {
    id: "3",
    name: "ISO 27001 Quarterly Review",
    framework: "ISO 27001",
    auditor: "Sarah Wilson",
    completedDate: "2024-11-25",
    status: "draft",
    findings: { total: 12, critical: 0, high: 4, medium: 6, low: 2 },
    controls: { total: 45, passed: 33, failed: 12 }
  }
];

export const convertExecutionSessionsToReports = (sessions: AuditExecutionSession[]): AuditReport[] => {
  return sessions
    .filter(session => session.executionResults && session.executionResults.length > 0)
    .map(session => {
      const findings = session.executionResults.reduce((acc, result) => {
        acc.total += result.findings.length;
        switch (result.riskLevel) {
          case 'critical': acc.critical += result.findings.length; break;
          case 'high': acc.high += result.findings.length; break;
          case 'medium': acc.medium += result.findings.length; break;
          case 'low': acc.low += result.findings.length; break;
        }
        return acc;
      }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });

      return {
        id: `execution-${session.id}`,
        name: session.name,
        framework: "AI Audit Execution",
        auditor: "AI Agent",
        completedDate: session.lastUpdated.toLocaleDateString(),
        status: "final" as const,
        findings,
        controls: {
          total: session.selectedDomains.length,
          passed: session.executionResults.filter(r => r.status === 'completed').length,
          failed: session.executionResults.filter(r => r.status === 'failed').length
        },
        executionResults: session.executionResults,
        aiResponse: session.aiResponse
      };
    });
};
