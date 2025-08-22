import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AttachmentUploader = ({ 
  attachments = [],
  onAttachmentsChange = () => {},
  maxAttachments = 5,
  className = ''
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [urlError, setUrlError] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const extractTextPreview = async (url) => {
    // Mock text extraction - in real app, this would call an API
    const mockPreviews = {
      'github.com': 'GitHub repository containing source code and documentation...',
      'stackoverflow.com': 'Stack Overflow question with detailed error description and code samples...',
      'docs.google.com': 'Google Docs document with project specifications and requirements...',
      'drive.google.com': 'Google Drive file containing screenshots and error logs...',
      'dropbox.com': 'Dropbox shared folder with multiple diagnostic files...',
      'notion.so': 'Notion page with detailed bug report and reproduction steps...'
    };

    const domain = new URL(url)?.hostname?.replace('www.', '');
    const preview = Object.keys(mockPreviews)?.find(key => domain?.includes(key));
    
    return preview ? mockPreviews?.[preview] : 'External link - content preview not available';
  };

  const handleAddUrl = async () => {
    if (!urlInput?.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateUrl(urlInput)) {
      setUrlError('Please enter a valid URL');
      return;
    }

    if (attachments?.length >= maxAttachments) {
      setUrlError(`Maximum ${maxAttachments} attachments allowed`);
      return;
    }

    if (attachments?.some(att => att?.url === urlInput)) {
      setUrlError('This URL has already been added');
      return;
    }

    setIsValidating(true);
    setUrlError('');

    try {
      const preview = await extractTextPreview(urlInput);
      const newAttachment = {
        id: Date.now(),
        url: urlInput,
        type: 'url',
        preview: preview,
        title: new URL(urlInput)?.hostname,
        addedAt: new Date()
      };

      onAttachmentsChange([...attachments, newAttachment]);
      setUrlInput('');
    } catch (error) {
      setUrlError('Failed to process URL. Please check the link and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveAttachment = (id) => {
    onAttachmentsChange(attachments?.filter(att => att?.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleAddUrl();
    }
  };

  const getUrlIcon = (url) => {
    const domain = new URL(url)?.hostname?.toLowerCase();
    
    if (domain?.includes('github')) return 'Github';
    if (domain?.includes('google')) return 'FileText';
    if (domain?.includes('dropbox')) return 'Cloud';
    if (domain?.includes('notion')) return 'BookOpen';
    if (domain?.includes('stackoverflow')) return 'MessageSquare';
    return 'Link';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Paperclip" size={18} className="text-muted-foreground" />
        <h3 className="font-medium text-foreground">Attachments & Links</h3>
        <span className="text-sm text-muted-foreground">
          ({attachments?.length}/{maxAttachments})
        </span>
      </div>
      {/* URL Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://example.com/relevant-link"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e?.target?.value);
                if (urlError) setUrlError('');
              }}
              onKeyPress={handleKeyPress}
              error={urlError}
              disabled={isValidating || attachments?.length >= maxAttachments}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddUrl}
            disabled={!urlInput?.trim() || isValidating || attachments?.length >= maxAttachments}
            loading={isValidating}
            iconName="Plus"
          >
            Add
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Add links to relevant documentation, screenshots, error logs, or related resources
        </p>
      </div>
      {/* Attachments List */}
      {attachments?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Added Attachments</h4>
          
          {attachments?.map((attachment) => (
            <div
              key={attachment?.id}
              className="bg-muted/30 border border-border rounded-lg p-4 space-y-3"
            >
              {/* Attachment Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Icon 
                    name={getUrlIcon(attachment?.url)} 
                    size={18} 
                    className="text-primary flex-shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">
                      {attachment?.title}
                    </p>
                    <a
                      href={attachment?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline truncate block"
                    >
                      {attachment?.url}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(attachment?.url, '_blank')}
                    className="h-8 w-8"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAttachment(attachment?.id)}
                    className="h-8 w-8 text-error hover:text-error"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>

              {/* Preview */}
              {attachment?.preview && (
                <div className="bg-background/50 rounded-md p-3 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Eye" size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Content Preview
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {attachment?.preview}
                  </p>
                </div>
              )}

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Added {attachment?.addedAt?.toLocaleTimeString()}</span>
                <span className="flex items-center gap-1">
                  <Icon name="Check" size={12} className="text-success" />
                  Validated
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Help Text */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Supported Links</p>
            <p className="text-muted-foreground">
              GitHub repos, Google Docs/Drive, Dropbox, Stack Overflow, Notion pages, and other public URLs
            </p>
          </div>
        </div>
      </div>
      {/* Attachment Limit Warning */}
      {attachments?.length >= maxAttachments && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-warning">
            <Icon name="AlertTriangle" size={16} />
            <p className="text-sm font-medium">
              Maximum attachment limit reached ({maxAttachments})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentUploader;