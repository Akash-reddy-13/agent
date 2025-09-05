import { Agent, Task, TaskResult, AgentConfig } from '@/types/agents';

export const agents: Agent[] = [
  {
    id: 'summarizer',
    name: 'AI Summarizer',
    description: 'Summarize PDFs, research papers, and long texts using advanced NLP',
    icon: '🤖',
    category: 'ai',
    capabilities: ['PDF Processing', 'Text Analysis', 'Key Insights', 'Multi-language'],
    status: 'active'
  },
  {
    id: 'devops',
    name: 'DevOps Agent',
    description: 'Automate deployments, manage CI/CD pipelines, and infrastructure',
    icon: '🚀',
    category: 'devops',
    capabilities: ['Docker Deploy', 'K8s Management', 'CI/CD Setup', 'Cloud Deploy'],
    status: 'active'
  },
  {
    id: 'automation',
    name: 'Automation Agent',
    description: 'Create and trigger workflows like Zapier, but free and open-source',
    icon: '⚡',
    category: 'automation',
    capabilities: ['Workflow Builder', 'API Integration', 'Event Triggers', 'Data Sync'],
    status: 'active'
  },
  {
    id: 'datafetch',
    name: 'Data Fetch Agent',
    description: 'Fetch real-time data from APIs - weather, stocks, news, and more',
    icon: '📊',
    category: 'data',
    capabilities: ['Weather API', 'Stock Prices', 'News Feed', 'Custom APIs'],
    status: 'active'
  }
];

// Mock implementations for MVP
export const executeTask = async (agentId: string, config: AgentConfig): Promise<TaskResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  switch (agentId) {
    case 'summarizer': {
      const summarizerData = {
        summary: "This document discusses advanced AI techniques for natural language processing. Key findings include improved accuracy in sentiment analysis (95.2%) and enhanced context understanding through transformer architectures. The research demonstrates significant improvements in multilingual processing capabilities.",
        keyPoints: [
          "95.2% accuracy in sentiment analysis",
          "Enhanced transformer architectures",
          "Multilingual processing improvements",
          "Real-world application scenarios"
        ],
        wordCount: (config.text as string)?.length || 1247,
        readingTime: "5 minutes"
      };
      return {
        success: true,
        data: summarizerData,
        executionTime: 3200
      };
    }
      
    case 'devops': {
      const devopsData = {
        deploymentId: `deploy-${Date.now()}`,
        status: "Successfully deployed to production",
        url: "https://your-app.vercel.app",
        buildTime: "2m 34s",
        services: ["Frontend", "API", "Database"],
        logs: [
          "✅ Building application...",
          "✅ Running tests...",
          "✅ Deploying to cloud...",
          "✅ Health checks passed",
          "🚀 Deployment complete!"
        ]
      };
      return {
        success: true,
        data: devopsData,
        executionTime: 4100
      };
    }
      
    case 'automation': {
      const automationData = {
        workflowId: `workflow-${Date.now()}`,
        name: (config.workflowName as string) || "Custom Workflow",
        status: "Active",
        triggers: (config.triggers as string[]) || ["API Webhook", "Schedule"],
        actions: (config.actions as string[]) || ["Send Email", "Update Database"],
        executions: Math.floor(Math.random() * 100) + 1,
        lastRun: new Date().toISOString()
      };
      return {
        success: true,
        data: automationData,
        executionTime: 1800
      };
    }
      
    case 'datafetch': {
      const dataType = (config.dataType as string) || 'weather';
      const mockData = {
        weather: {
          location: "San Francisco, CA",
          temperature: "22°C",
          condition: "Partly Cloudy",
          humidity: "65%",
          windSpeed: "12 km/h",
          forecast: [
            { day: "Today", high: 24, low: 18, condition: "Partly Cloudy" },
            { day: "Tomorrow", high: 26, low: 19, condition: "Sunny" },
            { day: "Friday", high: 23, low: 17, condition: "Cloudy" }
          ]
        },
        stocks: {
          symbol: (config.symbol as string) || "AAPL",
          price: "$173.45",
          change: "+2.34 (+1.37%)",
          volume: "52.3M",
          marketCap: "$2.78T",
          pe: "28.9"
        },
        news: [
          {
            title: "AI Breakthrough in Natural Language Processing",
            source: "Tech News",
            publishedAt: "2 hours ago",
            summary: "Researchers achieve new milestone in AI understanding..."
          },
          {
            title: "Cloud Computing Trends for 2024",
            source: "Cloud Weekly",
            publishedAt: "4 hours ago",
            summary: "Industry experts predict major shifts in cloud adoption..."
          }
        ]
      };
      
      return {
        success: true,
        data: mockData[dataType as keyof typeof mockData] || mockData.weather,
        executionTime: 1200
      };
    }
      
    default:
      return {
        success: false,
        error: "Unknown agent",
        executionTime: 0
      };
  }
};

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};