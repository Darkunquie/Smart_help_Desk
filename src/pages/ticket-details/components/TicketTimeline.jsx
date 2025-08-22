import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketTimeline = ({ timeline, onAddNote }) => {
  const [showInternalNotes, setShowInternalNotes] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'status_change':
        return 'ArrowRight';
      case 'assignment':
        return 'User';
      case 'response':
        return 'MessageSquare';
      case 'note':
        return 'FileText';
      case 'ai_suggestion':
        return 'Brain';
      case 'escalation':
        return 'AlertTriangle';
      case 'resolution':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-primary bg-primary';
      case 'status_change':
        return 'text-accent bg-accent';
      case 'assignment':
        return 'text-secondary bg-secondary';
      case 'response':
        return 'text-success bg-success';
      case 'note':
        return 'text-muted-foreground bg-muted-foreground';
      case 'ai_suggestion':
        return 'text-primary bg-primary';
      case 'escalation':
        return 'text-warning bg-warning';
      case 'resolution':
        return 'text-success bg-success';
      default:
        return 'text-muted-foreground bg-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(newNote?.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const filteredTimeline = showInternalNotes 
    ? timeline 
    : timeline?.filter(item => !item?.internal);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
          <span className="text-sm text-muted-foreground">({timeline?.length} events)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showInternalNotes ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowInternalNotes(!showInternalNotes)}
          >
            <Icon name="Eye" size={16} />
            Internal Notes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNote(true)}
          >
            <Icon name="Plus" size={16} />
            Add Note
          </Button>
        </div>
      </div>
      {/* Add Note Form */}
      {isAddingNote && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              placeholder="Add an internal note..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote?.trim()}
              >
                <Icon name="Check" size={16} />
                Add Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                <Icon name="X" size={16} />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Timeline Items */}
      <div className="space-y-4">
        {filteredTimeline?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No timeline events</p>
          </div>
        ) : (
          filteredTimeline?.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTimelineColor(item?.type)}`}>
                  <Icon name={getTimelineIcon(item?.type)} size={16} color="white" />
                </div>
                {index < filteredTimeline?.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2" />
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{item?.title}</span>
                      {item?.internal && (
                        <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full">
                          Internal
                        </span>
                      )}
                    </div>
                    
                    {item?.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item?.description}
                      </p>
                    )}

                    {/* Additional Content */}
                    {item?.content && (
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {item?.content}
                        </p>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={12} />
                        <span>{item?.actor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimeAgo(item?.timestamp)}</span>
                      </div>
                      {item?.traceId && (
                        <div className="flex items-center gap-1">
                          <Icon name="Hash" size={12} />
                          <span className="font-mono">{item?.traceId?.substring(0, 8)}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Changes */}
                    {item?.changes && (
                      <div className="mt-2 space-y-1">
                        {item?.changes?.map((change, changeIndex) => (
                          <div key={changeIndex} className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">{change?.field}:</span>
                            <span className="px-2 py-0.5 bg-error/10 text-error rounded">
                              {change?.from}
                            </span>
                            <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                            <span className="px-2 py-0.5 bg-success/10 text-success rounded">
                              {change?.to}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.timestamp)?.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Timeline Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {timeline?.filter(item => item?.type === 'response')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Responses</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {timeline?.filter(item => item?.type === 'status_change')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Status Changes</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {timeline?.filter(item => item?.type === 'ai_suggestion')?.length}
            </p>
            <p className="text-xs text-muted-foreground">AI Suggestions</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {timeline?.filter(item => item?.internal)?.length}
            </p>
            <p className="text-xs text-muted-foreground">Internal Notes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTimeline;