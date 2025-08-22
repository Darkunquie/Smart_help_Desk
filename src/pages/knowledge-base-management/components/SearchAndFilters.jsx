import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const SearchAndFilters = ({
  searchQuery = '',
  onSearchChange = () => {},
  selectedTags = [],
  onTagsChange = () => {},
  statusFilter = 'all',
  onStatusFilterChange = () => {},
  categoryFilter = 'all',
  onCategoryFilterChange = () => {},
  availableTags = [],
  categories = [],
  onBulkAction = () => {},
  selectedArticles = [],
  className = ''
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.id, label: cat?.name }))
  ];

  const tagOptions = availableTags?.map(tag => ({
    value: tag,
    label: tag
  }));

  const bulkActions = [
    { value: 'publish', label: 'Publish Selected', icon: 'Upload' },
    { value: 'archive', label: 'Archive Selected', icon: 'Archive' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { value: 'change-category', label: 'Change Category', icon: 'FolderOpen' },
    { value: 'add-tags', label: 'Add Tags', icon: 'Tag' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedArticles);
  };

  const clearFilters = () => {
    onSearchChange('');
    onTagsChange([]);
    onStatusFilterChange('all');
    onCategoryFilterChange('all');
  };

  const hasActiveFilters = searchQuery || selectedTags?.length > 0 || statusFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="p-4 space-y-4">
        {/* Main Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search articles, content, and tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
          >
            Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            <Select
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={onCategoryFilterChange}
            />
            
            <Select
              label="Tags"
              options={tagOptions}
              value={selectedTags}
              onChange={onTagsChange}
              multiple
              searchable
              placeholder="Select tags"
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                fullWidth
                iconName="RotateCcw"
                onClick={clearFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedArticles?.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedArticles?.length} article{selectedArticles?.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {bulkActions?.map((action) => (
                <Button
                  key={action?.value}
                  variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleBulkAction(action?.value)}
                  iconName={action?.icon}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Search: "{searchQuery}"
                <button onClick={() => onSearchChange('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-sm">
                Status: {statusOptions?.find(s => s?.value === statusFilter)?.label}
                <button onClick={() => onStatusFilterChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-sm">
                Category: {categories?.find(c => c?.id === categoryFilter)?.name}
                <button onClick={() => onCategoryFilterChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedTags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-md text-sm"
              >
                Tag: {tag}
                <button onClick={() => onTagsChange(selectedTags?.filter(t => t !== tag))}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;