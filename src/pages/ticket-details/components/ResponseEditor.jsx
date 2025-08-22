import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ResponseEditor = ({ onSendResponse, aiSuggestion, userRole }) => {
  const [response, setResponse] = useState(aiSuggestion?.draftResponse || '');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'No status change' },
    { value: 'triaged', label: 'Mark as Triaged' },
    { value: 'waiting_human', label: 'Needs Human Review' },
    { value: 'resolved', label: 'Mark as Resolved' },
    { value: 'closed', label: 'Close Ticket' }
  ];

  const templateOptions = [
    { value: '', label: 'Select template...' },
    { value: 'password_reset', label: 'Password Reset Instructions' },
    { value: 'account_locked', label: 'Account Locked Resolution' },
    { value: 'software_issue', label: 'Software Troubleshooting' },
    { value: 'escalation', label: 'Escalation Notice' },
    { value: 'resolution', label: 'Issue Resolution' }
  ];

  const templates = {
    password_reset: `Hello,\n\nTo reset your password, please follow these steps:\n\n1. Go to the login page\n2. Click "Forgot Password"\n3. Enter your email address\n4. Check your email for reset instructions\n\nIf you continue to experience issues, please don't hesitate to contact us.\n\nBest regards,\nSupport Team`,account_locked: `Hello,\n\nI've reviewed your account and can confirm it was temporarily locked due to multiple failed login attempts.\n\nI've now unlocked your account. You should be able to log in normally.\n\nFor security purposes, please ensure you're using the correct credentials and consider updating your password.\n\nBest regards,\nSupport Team`,
    software_issue: `Hello,\n\nThank you for reporting this software issue. I've investigated the problem and here's what I found:\n\n[Describe the issue and resolution steps]\n\nPlease try the suggested solution and let me know if the issue persists.\n\nBest regards,\nSupport Team`,
    escalation: `Hello,\n\nI'm escalating your ticket to our specialized team for further investigation. They will review your case and provide a detailed response within 24 hours.\n\nYour ticket reference number is: [TICKET_ID]\n\nThank you for your patience.\n\nBest regards,\nSupport Team`,
    resolution: `Hello,\n\nI'm pleased to inform you that your issue has been resolved. The solution has been implemented and tested.\n\nIf you experience any further issues or have questions, please don't hesitate to contact us.\n\nThank you for choosing our service.\n\nBest regards,\nSupport Team`
  };

  const handleTemplateSelect = (templateId) => {
    if (templateId && templates?.[templateId]) {
      setResponse(templates?.[templateId]);
      setSelectedTemplate(templateId);
    }
  };

  const handleSend = () => {
    if (response?.trim()) {
      onSendResponse({
        content: response?.trim(),
        statusUpdate,
        isInternal,
        template: selectedTemplate
      });
      
      // Reset form
      setResponse('');
      setStatusUpdate('');
      setIsInternal(false);
      setSelectedTemplate('');
      setIsExpanded(false);
    }
  };

  const formatText = (type) => {
    const textarea = document.getElementById('response-textarea');
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = response?.substring(start, end);
    
    let formattedText = selectedText;
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'list':
        formattedText = selectedText?.split('\n')?.map(line => `• ${line}`)?.join('\n');
        break;
    }
    
    const newResponse = response?.substring(0, start) + formattedText + response?.substring(end);
    setResponse(newResponse);
  };

  const canSendResponse = userRole === 'Support Agent' || userRole === 'Administrator';

  if (!canSendResponse) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Lock" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">You don't have permission to send responses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="MessageSquare" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Response</h2>
            {aiSuggestion && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                AI Assisted
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Template Selection */}
        <div className="flex items-center gap-2">
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={handleTemplateSelect}
            placeholder="Quick templates"
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            <Icon name="Save" size={16} />
            Save Template
          </Button>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-muted rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <Icon name="Bold" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <Icon name="Italic" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('code')}
            title="Code"
          >
            <Icon name="Code" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('list')}
            title="List"
          >
            <Icon name="List" size={16} />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="sm" title="Attach File">
            <Icon name="Paperclip" size={16} />
          </Button>
          <Button variant="ghost" size="sm" title="Insert Link">
            <Icon name="Link" size={16} />
          </Button>
        </div>

        {/* Response Textarea */}
        <div className="space-y-2">
          <textarea
            id="response-textarea"
            value={response}
            onChange={(e) => setResponse(e?.target?.value)}
            placeholder="Type your response here..."
            className={`w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
              isExpanded ? 'h-64' : 'h-32'
            }`}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{response?.length} characters</span>
            <span>Shift + Enter for new line</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Status Update"
            options={statusOptions}
            value={statusUpdate}
            onChange={setStatusUpdate}
          />
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="internal-note"
              checked={isInternal}
              onChange={(e) => setIsInternal(e?.target?.checked)}
              className="rounded border-border"
            />
            <label htmlFor="internal-note" className="text-sm text-foreground">
              Internal note (not visible to customer)
            </label>
          </div>
        </div>

        {/* AI Confidence Display */}
        {aiSuggestion && (
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Brain" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">AI Suggestion</span>
              <span className="text-xs text-primary">
                {aiSuggestion?.confidence}% confidence
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              This response was generated based on similar tickets and knowledge base articles.
              Please review and modify as needed before sending.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="Save" size={16} />
              Save Draft
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Eye" size={16} />
              Preview
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setResponse('');
                setStatusUpdate('');
                setIsInternal(false);
                setSelectedTemplate('');
              }}
            >
              Clear
            </Button>
            <Button
              variant="default"
              onClick={handleSend}
              disabled={!response?.trim()}
            >
              <Icon name="Send" size={16} />
              Send Response
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseEditor;