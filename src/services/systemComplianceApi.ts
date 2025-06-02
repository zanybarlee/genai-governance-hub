
export interface ComplianceApiRequest {
  question: string;
  overrideConfig?: {
    sessionId?: string;
    supervisorName?: string;
    supervisorPrompt?: string;
    summarization?: boolean;
    recursionLimit?: number;
  };
}

export interface ComplianceReport {
  id: string;
  title: string;
  type: string;
  status: 'completed' | 'generating' | 'failed';
  score: number;
  createdDate: Date;
  artifactsCount: number;
  trend: 'up' | 'down' | 'stable';
  content: string;
  findings: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export class SystemComplianceApi {
  private static readonly API_ENDPOINT = "http://127.0.0.1:3000/api/v1/prediction/37842267-0956-4f81-95d0-ba1aa4540225";

  static async query(data: ComplianceApiRequest): Promise<string> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('System Compliance API Error:', error);
      throw error;
    }
  }

  static async generateComplianceReport(auditType: string, artifacts: string[] = []): Promise<string> {
    const question = `Please generate a comprehensive system compliance audit report for ${auditType}. 
    
    Analyze the following aspects:
    - Security configurations and policies
    - Data protection and privacy compliance
    - Access controls and authentication
    - System vulnerabilities and risks
    - Compliance with industry standards
    
    ${artifacts.length > 0 ? `Consider these system artifacts: ${artifacts.join(', ')}` : ''}
    
    Provide detailed findings, risk assessments, and actionable recommendations in a structured format.`;

    return await this.query({
      question,
      overrideConfig: {
        sessionId: `compliance-${Date.now()}`,
        supervisorName: "System Compliance Auditor",
        supervisorPrompt: "You are an expert system compliance auditor. Generate comprehensive audit reports with detailed findings, risk assessments, and actionable recommendations.",
        summarization: true,
        recursionLimit: 1,
      }
    });
  }
}
