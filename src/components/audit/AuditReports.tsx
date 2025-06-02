
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { executionSessionStorage } from "./utils/executionSessionStorage";
import { AuditExecutionSession } from "./hooks/useAuditExecution";
import { ReportSummaryStats } from "./components/ReportSummaryStats";
import { ReportCard } from "./components/ReportCard";
import { ReportDetails } from "./components/ReportDetails";
import { mockReports, convertExecutionSessionsToReports, AuditReport } from "./utils/reportUtils";

export const AuditReports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [executionSessions, setExecutionSessions] = useState<AuditExecutionSession[]>([]);
  const [allReports, setAllReports] = useState<AuditReport[]>(mockReports);

  useEffect(() => {
    // Load execution sessions and convert them to reports
    const sessions = executionSessionStorage.loadSessions();
    setExecutionSessions(sessions);

    // Convert execution sessions to audit reports
    const executionReports = convertExecutionSessionsToReports(sessions);

    // Combine mock reports with execution reports
    setAllReports([...executionReports, ...mockReports]);
  }, []);

  const handleToggleReport = (reportId: string) => {
    setSelectedReport(reportId === selectedReport ? null : reportId);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <ReportSummaryStats reports={allReports} />

      {/* Reports List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-6">Audit Reports</h2>
        
        <div className="space-y-4">
          {allReports.map((report) => (
            <div key={report.id}>
              <ReportCard 
                report={report}
                isSelected={selectedReport === report.id}
                onToggleSelect={() => handleToggleReport(report.id)}
              />
              
              {/* Expanded Details */}
              {selectedReport === report.id && (
                <ReportDetails report={report} />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
