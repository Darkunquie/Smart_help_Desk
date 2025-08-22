import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TicketMetadata = ({ ticket, onUpdate, userRole }) => {
  const [isEditing, setIsEditing] = useState({});

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'triaged', label: 'Triaged' },
    { value: 'waiting_human', label: 'Waiting Human' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const agentOptions = [
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'sarah.johnson', label: 'Sarah Johnson' },
    { value: 'mike.chen', label: 'Mike Chen' },
    { value: 'alex.rodriguez', label: 'Alex Rodriguez' }
  ];

  const handleEdit = (field) => {
    if (userRole === 'Support Agent' || userRole === 'Administrator') {
      setIsEditing({ ...isEditing, [field]: true });
    }
  };

  const handleSave = (field, value) => {
    onUpdate(field, value);
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleCancel = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'triaged':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'waiting_human':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'medium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-accent';
    if (confidence >= 50) return 'text-warning';
    return 'text-error';
  };

  const canEdit = userRole === 'Support Agent' || userRole === 'Administrator';

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Ticket Information</h2>
        <div className="flex items-center gap-2">
          <Icon name="FileText" size={20} className="text-muted-foreground" />
          <span className="text-sm font-mono text-muted-foreground">{ticket?.id}</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          {isEditing?.status ? (
            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                value={ticket?.status}
                onChange={(value) => handleSave('status', value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCancel('status')}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket?.status)}`}>
                {ticket?.status?.replace('_', ' ')?.toUpperCase()}
              </span>
              {canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit('status')}
                >
                  <Icon name="Edit2" size={16} />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Priority</label>
          {isEditing?.priority ? (
            <div className="flex items-center gap-2">
              <Select
                options={priorityOptions}
                value={ticket?.priority}
                onChange={(value) => handleSave('priority', value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCancel('priority')}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket?.priority)}`}>
                {ticket?.priority?.toUpperCase()}
              </span>
              {canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit('priority')}
                >
                  <Icon name="Edit2" size={16} />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Category</label>
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{ticket?.category}</span>
          </div>
        </div>

        {/* AI Confidence Score */}
        {ticket?.aiConfidence && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">AI Confidence</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    ticket?.aiConfidence >= 90 ? 'bg-success' :
                    ticket?.aiConfidence >= 70 ? 'bg-accent' :
                    ticket?.aiConfidence >= 50 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${ticket?.aiConfidence}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getConfidenceColor(ticket?.aiConfidence)}`}>
                {ticket?.aiConfidence}%
              </span>
            </div>
          </div>
        )}

        {/* Assigned Agent */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Assigned Agent</label>
          {isEditing?.assignedAgent ? (
            <div className="flex items-center gap-2">
              <Select
                options={agentOptions}
                value={ticket?.assignedAgent || 'unassigned'}
                onChange={(value) => handleSave('assignedAgent', value === 'unassigned' ? null : value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCancel('assignedAgent')}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {ticket?.assignedAgent ? 
                    agentOptions?.find(a => a?.value === ticket?.assignedAgent)?.label || ticket?.assignedAgent :
                    'Unassigned'
                  }
                </span>
              </div>
              {canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit('assignedAgent')}
                >
                  <Icon name="Edit2" size={16} />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Creation Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Created</label>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {new Date(ticket.createdAt)?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Last Updated</label>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {new Date(ticket.updatedAt)?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* SLA Information */}
        {ticket?.slaBreachAt && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">SLA Breach</label>
            <div className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                {new Date(ticket.slaBreachAt) > new Date() ? 'Due' : 'Breached'} at{' '}
                {new Date(ticket.slaBreachAt)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketMetadata;