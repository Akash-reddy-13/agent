import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Zap, Clock, Webhook, Mail, Settings } from 'lucide-react';
import { AutomationConfig } from '@/types/agents';

interface AutomationAgentProps {
  config: AutomationConfig;
  onConfigChange: (config: AutomationConfig) => void;
}

export default function AutomationAgent({ config, onConfigChange }: AutomationAgentProps) {
  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');

  const triggerTypes = [
    { value: 'webhook', label: 'Webhook', icon: Webhook },
    { value: 'schedule', label: 'Schedule', icon: Clock },
    { value: 'email', label: 'Email Received', icon: Mail },
    { value: 'api', label: 'API Call', icon: Zap }
  ];

  const actionTypes = [
    { value: 'send_email', label: 'Send Email', icon: Mail },
    { value: 'webhook_post', label: 'POST to Webhook', icon: Webhook },
    { value: 'update_database', label: 'Update Database', icon: Zap },
    { value: 'send_notification', label: 'Send Notification', icon: Zap }
  ];

  const addTrigger = () => {
    if (newTrigger) {
      const triggers = config.triggers || [];
      onConfigChange({ ...config, triggers: [...triggers, newTrigger] });
      setNewTrigger('');
    }
  };

  const removeTrigger = (index: number) => {
    const triggers = config.triggers || [];
    onConfigChange({ ...config, triggers: triggers.filter((_, i: number) => i !== index) });
  };

  const addAction = () => {
    if (newAction) {
      const actions = config.actions || [];
      onConfigChange({ ...config, actions: [...actions, newAction] });
      setNewAction('');
    }
  };

  const removeAction = (index: number) => {
    const actions = config.actions || [];
    onConfigChange({ ...config, actions: actions.filter((_, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workflow-name">Workflow Name</Label>
        <Input
          id="workflow-name"
          placeholder="My Automation Workflow"
          value={config.workflowName || ''}
          onChange={(e) => onConfigChange({ ...config, workflowName: e.target.value })}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Triggers
          </CardTitle>
          <CardDescription>
            Define what events will start this workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={newTrigger} onValueChange={setNewTrigger}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a trigger type" />
              </SelectTrigger>
              <SelectContent>
                {triggerTypes.map((trigger) => (
                  <SelectItem key={trigger.value} value={trigger.value}>
                    <div className="flex items-center gap-2">
                      <trigger.icon className="w-4 h-4" />
                      {trigger.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addTrigger} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {config.triggers && config.triggers.length > 0 && (
            <div className="space-y-2">
              <Label>Active Triggers:</Label>
              <div className="flex flex-wrap gap-2">
                {config.triggers.map((trigger: string, index: number) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-2">
                    {triggerTypes.find(t => t.value === trigger)?.label || trigger}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTrigger(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Actions
          </CardTitle>
          <CardDescription>
            Define what happens when the workflow is triggered
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={newAction} onValueChange={setNewAction}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select an action type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    <div className="flex items-center gap-2">
                      <action.icon className="w-4 h-4" />
                      {action.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addAction} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {config.actions && config.actions.length > 0 && (
            <div className="space-y-2">
              <Label>Configured Actions:</Label>
              <div className="flex flex-wrap gap-2">
                {config.actions.map((action: string, index: number) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-2">
                    {actionTypes.find(a => a.value === action)?.label || action}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeAction(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retry-attempts">Retry Attempts</Label>
              <Select 
                value={config.retryAttempts || '3'} 
                onValueChange={(value) => onConfigChange({ ...config, retryAttempts: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select retry attempts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                placeholder="30"
                value={config.timeout || ''}
                onChange={(e) => onConfigChange({ ...config, timeout: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}