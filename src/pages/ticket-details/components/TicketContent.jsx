import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TicketContent = ({ ticket }) => {
  const [expandedAttachment, setExpandedAttachment] = useState(null);

  const handleAttachmentToggle = (index) => {
    setExpandedAttachment(expandedAttachment === index ? null : index);
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case 'url':
        return 'Link';
      case 'image':
        return 'Image';
      case 'document':
        return 'FileText';
      default:
        return 'Paperclip';
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">{ticket?.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} />
                <span>{ticket?.customer?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>{ticket?.customer?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Building" size={16} />
                <span>{ticket?.customer?.company}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Share" size={16} />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Printer" size={16} />
              Print
            </Button>
          </div>
        </div>
      </div>
      {/* Ticket Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Description</h2>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {ticket?.description}
          </p>
        </div>
      </div>
      {/* Customer Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="User" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Customer Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-foreground">{ticket?.customer?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">{ticket?.customer?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-foreground">{ticket?.customer?.phone || 'Not provided'}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Company</label>
              <p className="text-foreground">{ticket?.customer?.company}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <p className="text-foreground">{ticket?.customer?.department || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
              <p className="text-foreground font-mono">{ticket?.customer?.id}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Attachments */}
      {ticket?.attachments && ticket?.attachments?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Paperclip" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Attachments</h2>
            <span className="text-sm text-muted-foreground">({ticket?.attachments?.length})</span>
          </div>
          <div className="space-y-3">
            {ticket?.attachments?.map((attachment, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={getAttachmentIcon(attachment?.type)} size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{attachment?.name}</p>
                      <p className="text-sm text-muted-foreground">{attachment?.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {attachment?.extractedText && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAttachmentToggle(index)}
                      >
                        <Icon name={expandedAttachment === index ? "ChevronUp" : "ChevronDown"} size={16} />
                        {expandedAttachment === index ? 'Hide' : 'Show'} Content
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={16} />
                      Open
                    </Button>
                  </div>
                </div>
                
                {/* Extracted Text Preview */}
                {attachment?.extractedText && expandedAttachment === index && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Extracted Content:</h4>
                    <div className="bg-muted rounded-lg p-3 max-h-48 overflow-y-auto">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {attachment?.extractedText}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* System Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">System Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trace ID:</span>
              <span className="font-mono text-foreground">{ticket?.traceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source:</span>
              <span className="text-foreground">{ticket?.source || 'Web Portal'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Channel:</span>
              <span className="text-foreground">{ticket?.channel || 'Email'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">IP Address:</span>
              <span className="font-mono text-foreground">{ticket?.ipAddress || '192.168.1.100'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Agent:</span>
              <span className="text-foreground truncate" title={ticket?.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}>
                {ticket?.userAgent ? ticket?.userAgent?.substring(0, 30) + '...' : 'Chrome 120.0.0.0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="text-foreground">{ticket?.language || 'en-US'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketContent;