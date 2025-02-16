
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Report {
  id: string;
  name: string;
  date: string;
  size: string;
  status: "completed" | "failed";
}

const monthlyReports: Report[] = [
  {
    id: "1",
    name: "January 2024 Compliance Report",
    date: "Jan 31, 2024",
    size: "2.4 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "December 2023 Compliance Report",
    date: "Dec 31, 2023",
    size: "2.1 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "November 2023 Compliance Report",
    date: "Nov 30, 2023",
    size: "2.3 MB",
    status: "completed",
  },
];

const auditLogs: Report[] = [
  {
    id: "1",
    name: "Q1 2024 Audit Log",
    date: "Mar 31, 2024",
    size: "1.8 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "Q4 2023 Audit Log",
    date: "Dec 31, 2023",
    size: "1.6 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "Q3 2023 Audit Log",
    date: "Sep 30, 2023",
    size: "1.7 MB",
    status: "completed",
  },
];

export const ReportHistoryTables = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Monthly Reports</h3>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Audit Logs</h3>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log Name</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.name}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.size}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
