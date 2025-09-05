import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Cloud, Container, GitBranch, Settings } from 'lucide-react';
import { DevOpsConfig } from '@/types/agents';

interface DevOpsAgentProps {
  config: DevOpsConfig;
  onConfigChange: (config: DevOpsConfig) => void;
}

export default function DevOpsAgent({ config, onConfigChange }: DevOpsAgentProps) {
  const deploymentOptions = [
    { id: 'docker', label: 'Docker Container', icon: Container },
    { id: 'k8s', label: 'Kubernetes', icon: Settings },
    { id: 'cloud', label: 'Cloud Deploy', icon: Cloud },
    { id: 'cicd', label: 'CI/CD Pipeline', icon: GitBranch }
  ];

  const handleServiceToggle = (service: string, checked: boolean) => {
    const services = config.services || [];
    if (checked) {
      onConfigChange({ ...config, services: [...services, service] });
    } else {
      onConfigChange({ ...config, services: services.filter((s: string) => s !== service) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="repo-url">Repository URL</Label>
          <Input
            id="repo-url"
            placeholder="https://github.com/username/repo"
            value={config.repoUrl || ''}
            onChange={(e) => onConfigChange({ ...config, repoUrl: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Input
            id="branch"
            placeholder="main"
            value={config.branch || 'main'}
            onChange={(e) => onConfigChange({ ...config, branch: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Deployment Type</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {deploymentOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = config.deploymentType === option.id;
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}
                onClick={() => onConfigChange({ ...config, deploymentType: option.id as 'docker' | 'k8s' | 'cloud' | 'cicd' })}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Icon className="w-6 h-6 mb-2 text-primary" />
                  <span className="text-sm font-medium text-center">{option.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <Select value={config.environment || 'production'} onValueChange={(value: 'development' | 'staging' | 'production') => onConfigChange({ ...config, environment: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cloud-provider">Cloud Provider</Label>
          <Select value={config.cloudProvider || 'aws'} onValueChange={(value: 'aws' | 'gcp' | 'azure' | 'vercel' | 'netlify') => onConfigChange({ ...config, cloudProvider: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aws">AWS</SelectItem>
              <SelectItem value="gcp">Google Cloud</SelectItem>
              <SelectItem value="azure">Microsoft Azure</SelectItem>
              <SelectItem value="vercel">Vercel</SelectItem>
              <SelectItem value="netlify">Netlify</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Services to Deploy</CardTitle>
          <CardDescription>Select which services to include in the deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Frontend', 'Backend API', 'Database', 'Redis Cache', 'File Storage', 'Message Queue'].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={(config.services || []).includes(service)}
                  onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                />
                <Label htmlFor={service} className="text-sm font-medium">
                  {service}
                </Label>
              </div>
            ))}
          </div>
          
          {config.services && config.services.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected services:</p>
              <div className="flex flex-wrap gap-2">
                {config.services.map((service: string) => (
                  <Badge key={service} variant="secondary">{service}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Build Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="build-command">Build Command</Label>
            <Input
              id="build-command"
              placeholder="npm run build"
              value={config.buildCommand || ''}
              onChange={(e) => onConfigChange({ ...config, buildCommand: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="start-command">Start Command</Label>
            <Input
              id="start-command"
              placeholder="npm start"
              value={config.startCommand || ''}
              onChange={(e) => onConfigChange({ ...config, startCommand: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}