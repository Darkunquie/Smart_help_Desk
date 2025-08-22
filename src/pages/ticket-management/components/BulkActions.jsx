import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedCount = 0,
  onBulkAction = () => {},
  onClearSelection = () => {},
  className = ''
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'assign', label: 'Assign to Agent' },
    { value: 'status-open', label: 'Mark as Open' },
    { value: 'status-resolved', label: 'Mark as Resolved' },
    { value: 'status-closed', label: 'Mark as Closed' },
    { value: 'priority-high', label: 'Set Priority: High' },
    { value: 'priority-medium', label: 'Set Priority: Medium' },
    { value: 'priority-low', label: 'Set Priority: Low' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleApplyAction = async () => {
    if (!selectedAction || selectedCount === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    if (action?.startsWith('status-')) return 'CheckCircle';
    if (action?.startsWith('priority-')) return 'Flag';
    if (action === 'assign') return 'UserPlus';
    if (action === 'export') return 'Download';
    if (action === 'delete') return 'Trash2';
    return 'Settings';
  };

  const isDestructiveAction = selectedAction === 'delete';

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} ticket{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear selection
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center gap-3">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Select action..."
            className="min-w-48"
          />

          <Button
            variant={isDestructiveAction ? "destructive" : "default"}
            onClick={handleApplyAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName={selectedAction ? getActionIcon(selectedAction) : "Play"}
            iconPosition="left"
          >
            {isProcessing ? 'Processing...' : 'Apply'}
          </Button>
        </div>
      </div>
      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Icon 
              name={getActionIcon(selectedAction)} 
              size={16} 
              className={isDestructiveAction ? 'text-destructive' : 'text-primary'} 
            />
            <span className="text-muted-foreground">
              This will {selectedAction?.replace('-', ' ')} for {selectedCount} selected ticket{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
          
          {isDestructiveAction && (
            <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
              <Icon name="AlertTriangle" size={14} className="inline mr-1" />
              This action cannot be undone. Deleted tickets will be permanently removed.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkActions;