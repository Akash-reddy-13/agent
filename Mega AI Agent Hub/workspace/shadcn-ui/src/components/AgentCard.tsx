import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types/agents';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export default function AgentCard({ agent, onSelect }: AgentCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'devops': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'automation': return 'bg-green-100 text-green-800 border-green-200';
      case 'data': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {agent.icon}
          </div>
          <Badge 
            variant="outline" 
            className={`${getCategoryColor(agent.category)} font-medium`}
          >
            {agent.category.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {agent.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Capabilities:</h4>
            <div className="flex flex-wrap gap-1">
              {agent.capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                agent.status === 'active' ? 'bg-green-500' : 
                agent.status === 'running' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
              <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
            </div>
            <Button 
              onClick={() => onSelect(agent)}
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              variant="outline"
              size="sm"
            >
              Launch Agent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}