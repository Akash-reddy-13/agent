export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'ai' | 'devops' | 'automation' | 'data';
  capabilities: string[];
  status: 'active' | 'inactive' | 'running';
}

export interface Task {
  id: string;
  agentId: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
}

export interface TaskResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  executionTime: number;
}

export interface AgentConfig {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface SummarizerConfig extends AgentConfig {
  inputType?: 'text' | 'file' | 'url';
  text?: string;
  file?: string;
  url?: string;
  summaryLength?: 'brief' | 'medium' | 'detailed';
  focusArea?: 'general' | 'technical' | 'business' | 'research';
}

export interface DevOpsConfig extends AgentConfig {
  repoUrl?: string;
  branch?: string;
  deploymentType?: 'docker' | 'k8s' | 'cloud' | 'cicd';
  environment?: 'development' | 'staging' | 'production';
  cloudProvider?: 'aws' | 'gcp' | 'azure' | 'vercel' | 'netlify';
  services?: string[];
  buildCommand?: string;
  startCommand?: string;
}

export interface AutomationConfig extends AgentConfig {
  workflowName?: string;
  triggers?: string[];
  actions?: string[];
  retryAttempts?: string;
  timeout?: string;
}

export interface DataFetchConfig extends AgentConfig {
  dataType?: 'weather' | 'stocks' | 'news' | 'custom';
  location?: string;
  symbol?: string;
  category?: string;
  country?: string;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: string;
  format?: 'json' | 'csv' | 'xml' | 'text';
  refreshInterval?: string;
}