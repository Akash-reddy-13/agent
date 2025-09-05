import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { Agent, TaskResult, AgentConfig } from '@/types/agents';
import { executeTask } from '@/lib/agents';
import SummarizerAgent from './agents/SummarizerAgent';
import DevOpsAgent from './agents/DevOpsAgent';
import AutomationAgent from './agents/AutomationAgent';
import DataFetchAgent from './agents/DataFetchAgent';

interface TaskRunnerProps {
  agent: Agent;
  onBack: () => void;
}

export default function TaskRunner({ agent, onBack }: TaskRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<TaskResult | null>(null);
  const [config, setConfig] = useState<AgentConfig>({});

  const handleExecute = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const taskResult = await executeTask(agent.id, config);
      setResult(taskResult);
      setProgress(100);
    } catch (error) {
      setResult({
        success: false,
        error: 'Task execution failed',
        executionTime: 0
      });
      setProgress(100);
    } finally {
      clearInterval(progressInterval);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setConfig({});
  };

  const renderAgentInterface = () => {
    switch (agent.id) {
      case 'summarizer':
        return <SummarizerAgent config={config} onConfigChange={setConfig} />;
      case 'devops':
        return <DevOpsAgent config={config} onConfigChange={setConfig} />;
      case 'automation':
        return <AutomationAgent config={config} onConfigChange={setConfig} />;
      case 'datafetch':
        return <DataFetchAgent config={config} onConfigChange={setConfig} />;
      default:
        return <div>Agent interface not implemented</div>;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Task Result
              <Badge variant={result.success ? "default" : "destructive"}>
                {result.success ? "Success" : "Failed"}
              </Badge>
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Executed in {result.executionTime}ms
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-4">
            <pre className="text-sm">
              {JSON.stringify(result.data || result.error, null, 2)}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.icon}</span>
          <div>
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Configuration</CardTitle>
          <CardDescription>
            Configure the parameters for your task execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderAgentInterface()}
        </CardContent>
      </Card>

      {isRunning && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
              Executing Task...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Progress: {Math.round(progress)}%
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={handleExecute} 
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Executing...' : 'Execute Task'}
        </Button>
        
        {result && (
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {renderResult()}
    </div>
  );
}