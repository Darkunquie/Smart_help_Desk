import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';


const ArticleTree = ({ 
  articles = [],
  categories = [],
  selectedArticle = null,
  onArticleSelect = () => {},
  searchQuery = '',
  selectedTags = [],
  statusFilter = 'all',
  onDragStart = () => {},
  onDrop = () => {},
  className = ''
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['general', 'technical']));
  const [draggedItem, setDraggedItem] = useState(null);

  const filteredArticles = useMemo(() => {
    return articles?.filter(article => {
      const matchesSearch = !searchQuery || 
        article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      
      const matchesTags = selectedTags?.length === 0 || 
        selectedTags?.some(tag => article?.tags?.includes(tag));
      
      const matchesStatus = statusFilter === 'all' || article?.status === statusFilter;
      
      return matchesSearch && matchesTags && matchesStatus;
    });
  }, [articles, searchQuery, selectedTags, statusFilter]);

  const groupedArticles = useMemo(() => {
    const grouped = {};
    categories?.forEach(category => {
      grouped[category.id] = {
        ...category,
        articles: filteredArticles?.filter(article => article?.categoryId === category?.id)
      };
    });
    return grouped;
  }, [filteredArticles, categories]);

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded?.has(categoryId)) {
      newExpanded?.delete(categoryId);
    } else {
      newExpanded?.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDragStart = (e, article) => {
    setDraggedItem(article);
    onDragStart(article);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCategory) => {
    e?.preventDefault();
    if (draggedItem && draggedItem?.categoryId !== targetCategory?.id) {
      onDrop(draggedItem, targetCategory);
    }
    setDraggedItem(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'draft':
        return { icon: 'Edit', color: 'text-warning' };
      case 'archived':
        return { icon: 'Archive', color: 'text-muted-foreground' };
      default:
        return { icon: 'FileText', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success';
      case 'draft':
        return 'bg-warning/10 text-warning';
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`h-full bg-card border-r border-border overflow-hidden ${className}`}>
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Knowledge Base</h2>
        <div className="text-sm text-muted-foreground">
          {filteredArticles?.length} articles
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Object.values(groupedArticles)?.map((category) => (
          <div key={category?.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleCategory(category?.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors duration-200 text-left"
            >
              <div className="flex items-center gap-2">
                <Icon 
                  name={expandedCategories?.has(category?.id) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                />
                <Icon name={category?.icon} size={16} className="text-primary" />
                <span className="font-medium text-foreground">{category?.name}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  {category?.articles?.length}
                </span>
              </div>
            </button>

            {expandedCategories?.has(category?.id) && (
              <div className="pb-2">
                {category?.articles?.length === 0 ? (
                  <div className="px-6 py-4 text-sm text-muted-foreground text-center">
                    No articles in this category
                  </div>
                ) : (
                  category?.articles?.map((article) => {
                    const statusInfo = getStatusIcon(article?.status);
                    const isSelected = selectedArticle?.id === article?.id;
                    
                    return (
                      <div
                        key={article?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, article)}
                        onClick={() => onArticleSelect(article)}
                        className={`mx-3 mb-1 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-primary/10 border-primary text-primary' :'hover:bg-muted border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Icon 
                            name={statusInfo?.icon} 
                            size={14} 
                            className={`mt-0.5 ${statusInfo?.color}`} 
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate ${
                              isSelected ? 'text-primary' : 'text-foreground'
                            }`}>
                              {article?.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(article?.status)}`}>
                                {article?.status}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {article?.updatedAt}
                              </span>
                            </div>
                            {article?.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {article?.tags?.slice(0, 2)?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs bg-secondary/20 text-secondary px-1.5 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {article?.tags?.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{article?.tags?.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleTree;