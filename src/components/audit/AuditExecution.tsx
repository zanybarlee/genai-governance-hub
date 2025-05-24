
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  Bot,
  User,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuditQuestion {
  id: string;
  domain: string;
  question: string;
  policyReference: string;
  status: "pending" | "answered" | "flagged";
  evidence?: string[];
  response?: string;
  systemCheck?: "passed" | "failed" | "pending";
}

interface AuditExecutionProps {
  auditId: string | null;
}

const mockQuestions: AuditQuestion[] = [
  {
    id: "1",
    domain: "Access Control",
    question: "Are user access rights reviewed and updated at least quarterly per IAM-001 policy requirements?",
    policyReference: "IAM-001",
    status: "answered",
    response: "Yes, access reviews are conducted quarterly through automated reports and manual verification.",
    evidence: ["access_review_q3.pdf", "access_matrix.xlsx"],
    systemCheck: "passed"
  },
  {
    id: "2", 
    domain: "Access Control",
    question: "Is multi-factor authentication enforced for all privileged accounts as required by IAM-002?",
    policyReference: "IAM-002",
    status: "flagged",
    response: "MFA is enabled for most accounts but we found 3 service accounts without MFA.",
    evidence: ["mfa_report.pdf"],
    systemCheck: "failed"
  },
  {
    id: "3",
    domain: "Data Security", 
    question: "Are all databases encrypted at rest according to DS-001 encryption standards?",
    policyReference: "DS-001",
    status: "pending",
    systemCheck: "pending"
  }
];

export const AuditExecution = ({ auditId }: AuditExecutionProps) => {
  const [questions, setQuestions] = useState<AuditQuestion[]>(mockQuestions);
  const [activeQuestion, setActiveQuestion] = useState<string | null>("3");
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const handleAnswerSubmit = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, status: "answered" as const, response, systemCheck: "passed" as const }
        : q
    ));
    setResponse("");
    toast({
      title: "Response Saved",
      description: "Answer recorded and evidence collected",
    });
  };

  const handleSystemCheck = (questionId: string) => {
    toast({
      title: "System Check Initiated",
      description: "AI agent is performing automated verification...",
    });
    
    // Simulate system check
    setTimeout(() => {
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, systemCheck: "passed" as const }
          : q
      ));
      toast({
        title: "System Check Complete",
        description: "Automated verification passed",
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "flagged": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "pending": return <MessageSquare className="h-4 w-4 text-gray-400" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered": return "bg-green-100 text-green-800";
      case "flagged": return "bg-red-100 text-red-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const completedQuestions = questions.filter(q => q.status !== "pending").length;
  const totalQuestions = questions.length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  if (!auditId) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Audit Selected</h3>
        <p className="text-gray-600">Please select an audit from the dashboard to begin execution.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-900">Audit Progress</h2>
          <Badge className="bg-blue-100 text-blue-800">
            {completedQuestions}/{totalQuestions} Questions
          </Badge>
        </div>
        <Progress value={progressPercentage} className="mb-2" />
        <p className="text-sm text-gray-600">
          {progressPercentage.toFixed(0)}% complete • {totalQuestions - completedQuestions} questions remaining
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-primary-900 mb-4">Audit Questions</h3>
            <div className="space-y-3">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                    activeQuestion === question.id 
                      ? "border-primary-500 bg-primary-50" 
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveQuestion(question.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{question.domain}</span>
                    <Badge className={getStatusColor(question.status)}>
                      {getStatusIcon(question.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{question.question}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{question.policyReference}</Badge>
                    {question.systemCheck && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          question.systemCheck === "passed" ? "text-green-600" : 
                          question.systemCheck === "failed" ? "text-red-600" : "text-yellow-600"
                        }`}
                      >
                        {question.systemCheck}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Question */}
        <div className="lg:col-span-2">
          {activeQuestion && (() => {
            const question = questions.find(q => q.id === activeQuestion);
            if (!question) return null;

            return (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-5 w-5 text-primary-500" />
                      <span className="font-medium text-primary-900">{question.domain}</span>
                      <Badge variant="outline">{question.policyReference}</Badge>
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">{question.question}</p>
                  </div>
                </div>

                {question.status === "pending" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Response
                      </label>
                      <Textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Provide your response to this audit question..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleAnswerSubmit(question.id)}
                        disabled={!response.trim()}
                        className="gap-2"
                      >
                        <User className="h-4 w-4" />
                        Submit Response
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleSystemCheck(question.id)}
                        className="gap-2"
                      >
                        <Bot className="h-4 w-4" />
                        Run System Check
                      </Button>
                      
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Evidence
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Auditor Response</span>
                      </div>
                      <p className="text-gray-800">{question.response}</p>
                    </div>

                    {question.evidence && question.evidence.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Evidence Files</h4>
                        <div className="flex gap-2">
                          {question.evidence.map((file, index) => (
                            <Badge key={index} variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {file}
                              <ExternalLink className="h-3 w-3" />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.systemCheck && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">
                            System Check: {question.systemCheck === "passed" ? "Passed" : "Failed"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
