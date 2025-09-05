import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { agents } from '@/lib/agents';
import { Agent } from '@/types/agents';
import AgentCard from '@/components/AgentCard';
import TaskRunner from '@/components/TaskRunner';
import { Sparkles, Zap, Users, Activity } from 'lucide-react';

export default function Index() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [stats] = useState({
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    tasksCompleted: 1247,
    uptime: '99.9%'
  });

  if (selectedAgent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          <TaskRunner 
            agent={selectedAgent} 
            onBack={() => setSelectedAgent(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Mega AI Agent Orchestrator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Agents at Your Command
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Orchestrate powerful AI agents to automate your workflows. From document summarization to deployment automation, 
              unleash the power of specialized AI agents working in harmony.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge variant="outline" className="bg-white/50 border-blue-200 text-blue-800">
                🤖 AI-Powered
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-green-200 text-green-800">
                🚀 DevOps Ready
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-purple-200 text-purple-800">
                ⚡ Automation
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-orange-200 text-orange-800">
                📊 Data Insights
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Total Agents', value: stats.totalAgents, color: 'text-blue-600' },
            { icon: Activity, label: 'Active Agents', value: stats.activeAgents, color: 'text-green-600' },
            { icon: Zap, label: 'Tasks Completed', value: stats.tasksCompleted.toLocaleString(), color: 'text-purple-600' },
            { icon: Activity, label: 'Uptime', value: stats.uptime, color: 'text-orange-600' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-3 p-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-800">Choose Your AI Agent</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select from our collection of specialized AI agents, each designed to excel at specific tasks. 
              Configure, execute, and monitor your automated workflows with ease.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Agent Categories */}
          <div className="space-y-8">
            {[
              { category: 'ai', title: 'AI & NLP Agents', description: 'Intelligent text processing and analysis' },
              { category: 'devops', title: 'DevOps Agents', description: 'Deployment and infrastructure automation' },
              { category: 'automation', title: 'Workflow Agents', description: 'Process automation and integration' },
              { category: 'data', title: 'Data Agents', description: 'Real-time data fetching and processing' }
            ].map((section) => {
              const categoryAgents = agents.filter(agent => agent.category === section.category);
              
              return (
                <div key={section.category} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-slate-800">{section.title}</h3>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      {categoryAgents.length} agent{categoryAgents.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <p className="text-slate-600">{section.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryAgents.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        onSelect={setSelectedAgent}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Ready to Get Started?</h3>
            <p className="text-slate-600">
              Select an agent above to begin orchestrating your AI-powered workflows. 
              Each agent comes with pre-configured templates and customizable parameters.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="bg-white/80">
                View Documentation
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Explore Agents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}