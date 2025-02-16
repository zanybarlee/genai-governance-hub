
export interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}

export interface Policy {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Under Review";
  lastUpdated: string;
  category: string;
  description?: string;
  content?: string;
}

export interface PolicyFormValues {
  name: string;
  description: string;
  template: string;
  content: string;
}
