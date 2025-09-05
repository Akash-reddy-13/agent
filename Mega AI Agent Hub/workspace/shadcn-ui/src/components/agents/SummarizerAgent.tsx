import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Link } from 'lucide-react';
import { SummarizerConfig } from '@/types/agents';

interface SummarizerAgentProps {
  config: SummarizerConfig;
  onConfigChange: (config: SummarizerConfig) => void;
}

export default function SummarizerAgent({ config, onConfigChange }: SummarizerAgentProps) {
  const [inputType, setInputType] = useState<'text' | 'file' | 'url'>('text');

  const handleInputTypeChange = (type: 'text' | 'file' | 'url') => {
    setInputType(type);
    onConfigChange({ ...config, inputType: type });
  };

  const handleTextChange = (text: string) => {
    onConfigChange({ ...config, text, inputType });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onConfigChange({ ...config, file: file.name, inputType: 'file' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${inputType === 'text' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
          onClick={() => handleInputTypeChange('text')}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">Text Input</h3>
            <p className="text-sm text-muted-foreground text-center">Paste or type text directly</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${inputType === 'file' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
          onClick={() => handleInputTypeChange('file')}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Upload className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">File Upload</h3>
            <p className="text-sm text-muted-foreground text-center">Upload PDF or document</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${inputType === 'url' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
          onClick={() => handleInputTypeChange('url')}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Link className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">URL Input</h3>
            <p className="text-sm text-muted-foreground text-center">Summarize from web URL</p>
          </CardContent>
        </Card>
      </div>

      {inputType === 'text' && (
        <div className="space-y-2">
          <Label htmlFor="text-input">Text to Summarize</Label>
          <Textarea
            id="text-input"
            placeholder="Paste your text, research paper, or document content here..."
            className="min-h-32"
            value={config.text || ''}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
      )}

      {inputType === 'file' && (
        <div className="space-y-2">
          <Label htmlFor="file-input">Upload Document</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-muted-foreground mb-4">
              Drop your PDF or document here, or click to browse
            </p>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('file-input')?.click()}
            >
              Choose File
            </Button>
            {config.file && (
              <p className="text-sm text-green-600 mt-2">Selected: {config.file}</p>
            )}
          </div>
        </div>
      )}

      {inputType === 'url' && (
        <div className="space-y-2">
          <Label htmlFor="url-input">Document URL</Label>
          <input
            id="url-input"
            type="url"
            placeholder="https://example.com/document.pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={config.url || ''}
            onChange={(e) => onConfigChange({ ...config, url: e.target.value, inputType })}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="summary-length">Summary Length</Label>
          <Select value={config.summaryLength || 'medium'} onValueChange={(value: 'brief' | 'medium' | 'detailed') => onConfigChange({ ...config, summaryLength: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brief">Brief (2-3 sentences)</SelectItem>
              <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
              <SelectItem value="detailed">Detailed (Multiple paragraphs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="focus-area">Focus Area</Label>
          <Select value={config.focusArea || 'general'} onValueChange={(value: 'general' | 'technical' | 'business' | 'research') => onConfigChange({ ...config, focusArea: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select focus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Summary</SelectItem>
              <SelectItem value="technical">Technical Details</SelectItem>
              <SelectItem value="business">Business Insights</SelectItem>
              <SelectItem value="research">Research Findings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}