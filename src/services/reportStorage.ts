
import { ComplianceReport } from './systemComplianceApi';

const REPORTS_STORAGE_KEY = 'system-compliance-reports';

export class ReportStorage {
  static saveReport(report: ComplianceReport): void {
    try {
      const existingReports = this.getAllReports();
      const updatedReports = [report, ...existingReports.filter(r => r.id !== report.id)];
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Error saving report:', error);
    }
  }

  static getAllReports(): ComplianceReport[] {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) {
        const reports = JSON.parse(saved);
        return reports.map((report: any) => ({
          ...report,
          createdDate: new Date(report.createdDate)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading reports:', error);
      return [];
    }
  }

  static getReportById(id: string): ComplianceReport | null {
    const reports = this.getAllReports();
    return reports.find(report => report.id === id) || null;
  }

  static deleteReport(id: string): void {
    try {
      const reports = this.getAllReports().filter(report => report.id !== id);
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  }
}
