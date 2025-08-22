import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TicketTable = ({ 
  tickets = [],
  selectedTickets = [],
  onTicketSelect = () => {},
  onSelectAll = () => {},
  onTicketClick = () => {},
  onStatusChange = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleTicketRowClick = (ticket) => {
    navigate(`/ticket-details?id=${ticket?.id}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-blue-100 text-blue-800', label: 'Open' },
      triaged: { color: 'bg-purple-100 text-purple-800', label: 'Triaged' },
      waiting_human: { color: 'bg-amber-100 text-amber-800', label: 'Waiting Human' },
      resolved: { color: 'bg-green-100 text-green-800', label: 'Resolved' },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
    };

    const config = statusConfig?.[status] || statusConfig?.open;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getConfidenceBadge = (confidence) => {
    if (confidence === null || confidence === undefined) {
      return <span className="text-muted-foreground text-sm">-</span>;
    }

    let colorClass = 'bg-gray-100 text-gray-800';
    if (confidence >= 80) colorClass = 'bg-green-100 text-green-800';
    else if (confidence >= 50) colorClass = 'bg-amber-100 text-amber-800';
    else colorClass = 'bg-red-100 text-red-800';

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
        {confidence}%
      </span>
    );
  };

  const getPriorityIcon = (priority) => {
    const priorityConfig = {
      urgent: { icon: 'AlertTriangle', color: 'text-red-600' },
      high: { icon: 'ArrowUp', color: 'text-orange-600' },
      medium: { icon: 'Minus', color: 'text-blue-600' },
      low: { icon: 'ArrowDown', color: 'text-gray-600' }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return <Icon name={config?.icon} size={16} className={config?.color} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  const isAllSelected = tickets?.length > 0 && selectedTickets?.length === tickets?.length;
  const isIndeterminate = selectedTickets?.length > 0 && selectedTickets?.length < tickets?.length;

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Ticket ID
                  {getSortIcon('id')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Title
                  {getSortIcon('title')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Status
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('confidence')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Confidence
                  {getSortIcon('confidence')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">Assigned Agent</th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Created
                  {getSortIcon('createdAt')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Last Activity
                  {getSortIcon('lastActivity')}
                </button>
              </th>
              <th className="w-24 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <tr
                key={ticket?.id}
                className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => handleTicketRowClick(ticket)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <Checkbox
                    checked={selectedTickets?.includes(ticket?.id)}
                    onChange={() => onTicketSelect(ticket?.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(ticket?.priority)}
                    <span className="font-mono text-sm font-medium text-primary">
                      {ticket?.id}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="font-medium text-foreground truncate">{ticket?.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{ticket?.description}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(ticket?.status)}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground capitalize">{ticket?.category}</span>
                </td>
                <td className="px-4 py-3">
                  {getConfidenceBadge(ticket?.confidence)}
                </td>
                <td className="px-4 py-3">
                  {ticket?.assignedAgent ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <span className="text-sm text-foreground">{ticket?.assignedAgent}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{formatDate(ticket?.createdAt)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{formatDate(ticket?.lastActivity)}</span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTicketRowClick(ticket)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/create-ticket?edit=${ticket?.id}`)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {tickets?.map((ticket) => (
          <div
            key={ticket?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/30 cursor-pointer transition-colors"
            onClick={() => handleTicketRowClick(ticket)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedTickets?.includes(ticket?.id)}
                  onChange={() => onTicketSelect(ticket?.id)}
                  onClick={(e) => e?.stopPropagation()}
                />
                {getPriorityIcon(ticket?.priority)}
                <span className="font-mono text-sm font-medium text-primary">
                  {ticket?.id}
                </span>
              </div>
              {getStatusBadge(ticket?.status)}
            </div>
            
            <h3 className="font-medium text-foreground mb-2">{ticket?.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ticket?.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Category:</span>
                <span className="ml-2 text-foreground capitalize">{ticket?.category}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Confidence:</span>
                <span className="ml-2">{getConfidenceBadge(ticket?.confidence)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Agent:</span>
                <span className="ml-2 text-foreground">
                  {ticket?.assignedAgent || 'Unassigned'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2 text-foreground">{formatDate(ticket?.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Last activity: {formatDate(ticket?.lastActivity)}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    navigate(`/create-ticket?edit=${ticket?.id}`);
                  }}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {tickets?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search criteria
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/create-ticket')}
            iconName="Plus"
            iconPosition="left"
          >
            Create New Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketTable;