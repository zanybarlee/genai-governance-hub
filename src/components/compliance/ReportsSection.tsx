
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, FileText, Loader2 } from "lucide-react";

interface ReportsSectionProps {
  isGenerating: string | null;
  onGenerateReport: (type: 'monthly' | 'audit') => void;
}

export const ReportsSection = ({
  isGenerating,
  onGenerateReport,
}: ReportsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Reports</CardTitle>
        <CardDescription>
          Generate and download compliance reports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => onGenerateReport('monthly')}
          className="w-full flex items-center gap-2"
          disabled={isGenerating !== null}
        >
          {isGenerating === 'monthly' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {isGenerating === 'monthly' ? 'Generating...' : 'Generate Monthly Report'}
        </Button>
        <Button 
          variant="outline"
          onClick={() => onGenerateReport('audit')}
          className="w-full flex items-center gap-2"
          disabled={isGenerating !== null}
        >
          {isGenerating === 'audit' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Activity className="h-4 w-4" />
          )}
          {isGenerating === 'audit' ? 'Generating...' : 'Generate Audit Log'}
        </Button>
      </CardContent>
    </Card>
  );
};
