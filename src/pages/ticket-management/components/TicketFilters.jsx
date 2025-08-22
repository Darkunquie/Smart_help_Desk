import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TicketFilters = ({ 
  onFiltersChange = () => {},
  totalTickets = 0,
  filteredTickets = 0,
  onClearFilters = () => {},
  className = ''
}) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    confidenceRange: '',
    dateRange: '',
    assignedAgent: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'triaged', label: 'Triaged' },
    { value: 'waiting_human', label: 'Waiting Human' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'account', label: 'Account Management' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'general', label: 'General Inquiry' }
  ];

  const confidenceOptions = [
    { value: '', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (80-100%)' },
    { value: 'medium', label: 'Medium (50-79%)' },
    { value: 'low', label: 'Low (0-49%)' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const agentOptions = [
    { value: '', label: 'All Agents' },
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'sarah.johnson', label: 'Sarah Johnson' },
    { value: 'mike.chen', label: 'Mike Chen' },
    { value: 'emily.davis', label: 'Emily Davis' },
    { value: 'alex.rodriguez', label: 'Alex Rodriguez' },
    { value: 'lisa.wang', label: 'Lisa Wang' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      status: '',
      category: '',
      confidenceRange: '',
      dateRange: '',
      assignedAgent: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className={`bg-card border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Search and Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search tickets by ID, title, or description..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Filters
        </Button>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-4 border-t border-border">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Select status"
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Select category"
          />

          <Select
            label="Confidence"
            options={confidenceOptions}
            value={filters?.confidenceRange}
            onChange={(value) => handleFilterChange('confidenceRange', value)}
            placeholder="Select confidence"
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            placeholder="Select date range"
          />

          <Select
            label="Assigned Agent"
            options={agentOptions}
            value={filters?.assignedAgent}
            onChange={(value) => handleFilterChange('assignedAgent', value)}
            placeholder="Select agent"
          />
        </div>
      )}
      {/* Results Summary and Clear */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredTickets}</span> of{' '}
          <span className="font-medium text-foreground">{totalTickets}</span> tickets
          {hasActiveFilters && (
            <span className="ml-2 text-primary">
              (filtered)
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            iconName="X"
            iconPosition="left"
          >
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default TicketFilters;