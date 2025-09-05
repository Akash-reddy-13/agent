import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cloud, TrendingUp, Newspaper, Globe } from 'lucide-react';
import { DataFetchConfig } from '@/types/agents';

interface DataFetchAgentProps {
  config: DataFetchConfig;
  onConfigChange: (config: DataFetchConfig) => void;
}

export default function DataFetchAgent({ config, onConfigChange }: DataFetchAgentProps) {
  const dataTypes = [
    {
      id: 'weather' as const,
      name: 'Weather Data',
      description: 'Current weather and forecasts',
      icon: Cloud,
      fields: ['location']
    },
    {
      id: 'stocks' as const,
      name: 'Stock Prices',
      description: 'Real-time stock market data',
      icon: TrendingUp,
      fields: ['symbol']
    },
    {
      id: 'news' as const,
      name: 'News Feed',
      description: 'Latest news articles',
      icon: Newspaper,
      fields: ['category', 'country']
    },
    {
      id: 'custom' as const,
      name: 'Custom API',
      description: 'Connect to any REST API',
      icon: Globe,
      fields: ['url', 'method', 'headers']
    }
  ];

  const selectedDataType = dataTypes.find(dt => dt.id === config.dataType);

  const renderDataTypeFields = () => {
    if (!selectedDataType) return null;

    switch (selectedDataType.id) {
      case 'weather':
        return (
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={config.location || ''}
              onChange={(e) => onConfigChange({ ...config, location: e.target.value })}
            />
          </div>
        );

      case 'stocks':
        return (
          <div className="space-y-2">
            <Label htmlFor="symbol">Stock Symbol</Label>
            <Input
              id="symbol"
              placeholder="AAPL"
              value={config.symbol || ''}
              onChange={(e) => onConfigChange({ ...config, symbol: e.target.value.toUpperCase() })}
            />
          </div>
        );

      case 'news':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={config.category || 'general'} onValueChange={(value) => onConfigChange({ ...config, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={config.country || 'us'} onValueChange={(value) => onConfigChange({ ...config, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">API URL</Label>
              <Input
                id="api-url"
                placeholder="https://api.example.com/data"
                value={config.url || ''}
                onChange={(e) => onConfigChange({ ...config, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select value={config.method || 'GET'} onValueChange={(value: 'GET' | 'POST' | 'PUT' | 'DELETE') => onConfigChange({ ...config, method: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headers">Headers (JSON)</Label>
              <textarea
                id="headers"
                placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-20"
                value={config.headers || ''}
                onChange={(e) => onConfigChange({ ...config, headers: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Data Source</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataTypes.map((dataType) => {
            const Icon = dataType.icon;
            const isSelected = config.dataType === dataType.id;
            return (
              <Card 
                key={dataType.id}
                className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}
                onClick={() => onConfigChange({ ...config, dataType: dataType.id })}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <Icon className="w-8 h-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">{dataType.name}</h3>
                    <p className="text-sm text-muted-foreground">{dataType.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedDataType && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <selectedDataType.icon className="w-5 h-5" />
              {selectedDataType.name} Configuration
            </CardTitle>
            <CardDescription>
              Configure the parameters for {selectedDataType.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderDataTypeFields()}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Output Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={config.format || 'json'} onValueChange={(value: 'json' | 'csv' | 'xml' | 'text') => onConfigChange({ ...config, format: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Refresh Interval</Label>
              <Select value={config.refreshInterval || '60'} onValueChange={(value) => onConfigChange({ ...config, refreshInterval: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="900">15 minutes</SelectItem>
                  <SelectItem value="3600">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}