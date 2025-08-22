import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AISuggestions = ({ suggestions, onAcceptSuggestion, onRejectSuggestion }) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState(0);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState({});

  const handleToggleExpansion = (index) => {
    setExpandedSuggestion(expandedSuggestion === index ? -1 : index);
  };

  const handleToggleKnowledgeBase = (suggestionIndex, articleIndex) => {
    const key = `${suggestionIndex}-${articleIndex}`;
    setShowKnowledgeBase({
      ...showKnowledgeBase,
      [key]: !showKnowledgeBase?.[key]
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success bg-success/10 border-success/20';
    if (confidence >= 70) return 'text-accent bg-accent/10 border-accent/20';
    if (confidence >= 50) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 90) return 'CheckCircle';
    if (confidence >= 70) return 'AlertCircle';
    if (confidence >= 50) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Suggestions</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Powered by AI</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
      </div>
      {suggestions?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Brain" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No AI suggestions available</p>
          <p className="text-sm text-muted-foreground mt-1">
            The AI is still processing this ticket
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions?.map((suggestion, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              {/* Suggestion Header */}
              <div className="p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={getConfidenceIcon(suggestion?.confidence)} size={20} className={getConfidenceColor(suggestion?.confidence)?.split(' ')?.[0]} />
                    <div>
                      <h3 className="font-medium text-foreground">
                        Suggestion #{index + 1}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {suggestion?.type || 'Automated Response'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(suggestion?.confidence)}`}>
                      {suggestion?.confidence}% confidence
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpansion(index)}
                    >
                      <Icon name={expandedSuggestion === index ? "ChevronUp" : "ChevronDown"} size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Suggestion Content */}
              {expandedSuggestion === index && (
                <div className="p-4 space-y-4">
                  {/* Draft Response */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Suggested Response:</h4>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {suggestion?.draftResponse}
                      </p>
                    </div>
                  </div>

                  {/* Reasoning */}
                  {suggestion?.reasoning && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">AI Reasoning:</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion?.reasoning}
                      </p>
                    </div>
                  )}

                  {/* Cited Knowledge Base Articles */}
                  {suggestion?.citedArticles && suggestion?.citedArticles?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Referenced Articles ({suggestion?.citedArticles?.length}):
                      </h4>
                      <div className="space-y-2">
                        {suggestion?.citedArticles?.map((article, articleIndex) => (
                          <div key={articleIndex} className="border border-border rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Icon name="BookOpen" size={16} className="text-primary" />
                                <span className="text-sm font-medium text-foreground">
                                  {article?.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Relevance: {article?.relevanceScore}%
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleKnowledgeBase(index, articleIndex)}
                              >
                                <Icon name={showKnowledgeBase?.[`${index}-${articleIndex}`] ? "ChevronUp" : "ChevronDown"} size={14} />
                              </Button>
                            </div>
                            
                            {showKnowledgeBase?.[`${index}-${articleIndex}`] && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <p className="text-sm text-muted-foreground mb-2">
                                  {article?.excerpt}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Icon name="ExternalLink" size={14} />
                                    View Full Article
                                  </Button>
                                  {article?.tags && (
                                    <div className="flex gap-1">
                                      {article?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAcceptSuggestion(suggestion)}
                    >
                      <Icon name="Check" size={16} />
                      Use This Response
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcceptSuggestion(suggestion, true)}
                    >
                      <Icon name="Edit" size={16} />
                      Edit & Use
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRejectSuggestion(suggestion)}
                    >
                      <Icon name="X" size={16} />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Feedback Section */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Feedback</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Help improve AI suggestions by rating their quality
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Icon name="ThumbsUp" size={14} />
                Helpful
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="ThumbsDown" size={14} />
                Not Helpful
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Flag" size={14} />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;