import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({
  article = null,
  versions = [],
  onVersionSelect = () => {},
  onVersionRestore = () => {},
  onVersionCompare = () => {},
  selectedVersion = null,
  className = ''
}) => {
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState([]);

  const mockVersions = [
    {
      id: 'v1.5',
      version: '1.5',
      author: 'Sarah Johnson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      timestamp: '2025-01-21 09:30:00',
      changes: 'Updated troubleshooting steps and added new FAQ section',
      changeType: 'major',
      wordCount: 1247,
      isCurrent: true
    },
    {
      id: 'v1.4',
      version: '1.4',
      author: 'Mike Chen',
      authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      timestamp: '2025-01-20 14:15:00',
      changes: 'Fixed typos and improved formatting',
      changeType: 'minor',
      wordCount: 1198,
      isCurrent: false
    },
    {
      id: 'v1.3',
      version: '1.3',
      author: 'Sarah Johnson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      timestamp: '2025-01-19 11:45:00',
      changes: 'Added code examples and updated screenshots',
      changeType: 'major',
      wordCount: 1156,
      isCurrent: false
    },
    {
      id: 'v1.2',
      version: '1.2',
      author: 'Alex Rodriguez',
      authorAvatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      timestamp: '2025-01-18 16:20:00',
      changes: 'Initial content creation and structure',
      changeType: 'major',
      wordCount: 892,
      isCurrent: false
    }
  ];

  const activeVersions = versions?.length > 0 ? versions : mockVersions;

  const getChangeTypeIcon = (changeType) => {
    switch (changeType) {
      case 'major':
        return { icon: 'GitCommit', color: 'text-primary' };
      case 'minor':
        return { icon: 'Edit', color: 'text-warning' };
      case 'patch':
        return { icon: 'Bug', color: 'text-success' };
      default:
        return { icon: 'FileText', color: 'text-muted-foreground' };
    }
  };

  const getChangeTypeBadge = (changeType) => {
    switch (changeType) {
      case 'major':
        return 'bg-primary/10 text-primary';
      case 'minor':
        return 'bg-warning/10 text-warning';
      case 'patch':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleVersionSelect = (version) => {
    if (compareMode) {
      if (compareVersions?.length < 2 && !compareVersions?.find(v => v?.id === version?.id)) {
        setCompareVersions([...compareVersions, version]);
      }
    } else {
      onVersionSelect(version);
    }
  };

  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
    setCompareVersions([]);
  };

  const handleCompareExecute = () => {
    if (compareVersions?.length === 2) {
      onVersionCompare(compareVersions?.[0], compareVersions?.[1]);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!article) {
    return (
      <div className={`h-full bg-card border-l border-border flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Icon name="History" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Select an article to view version history</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-card border-l border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Version History</h3>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={handleCompareToggle}
            iconName="GitCompare"
          >
            Compare
          </Button>
        </div>
        
        {compareMode && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-primary mb-2">
              Select 2 versions to compare ({compareVersions?.length}/2)
            </p>
            {compareVersions?.length === 2 && (
              <Button
                variant="default"
                size="sm"
                onClick={handleCompareExecute}
                iconName="Eye"
              >
                Compare Selected
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Version List */}
      <div className="flex-1 overflow-y-auto">
        {activeVersions?.map((version) => {
          const changeInfo = getChangeTypeIcon(version?.changeType);
          const isSelected = selectedVersion?.id === version?.id;
          const isInCompare = compareVersions?.find(v => v?.id === version?.id);
          
          return (
            <div
              key={version?.id}
              onClick={() => handleVersionSelect(version)}
              className={`p-4 border-b border-border cursor-pointer transition-all duration-200 ${
                isSelected ? 'bg-primary/10 border-l-4 border-l-primary' : isInCompare ?'bg-accent/10 border-l-4 border-l-accent': 'hover:bg-muted'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">v{version?.version}</span>
                    {version?.isCurrent && (
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getChangeTypeBadge(version?.changeType)}`}>
                      {version?.changeType}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {version?.changes}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>{version?.author}</span>
                      <span>•</span>
                      <span>{formatTimestamp(version?.timestamp)}</span>
                    </div>
                    <span>{version?.wordCount} words</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-1">
                  {compareMode ? (
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      isInCompare ? 'bg-accent border-accent' : 'border-muted-foreground'
                    }`}>
                      {isInCompare && <Icon name="Check" size={12} color="white" />}
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onVersionSelect(version);
                        }}
                        className="w-6 h-6"
                      >
                        <Icon name="Eye" size={12} />
                      </Button>
                      {!version?.isCurrent && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onVersionRestore(version);
                          }}
                          className="w-6 h-6"
                        >
                          <Icon name="RotateCcw" size={12} />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          {activeVersions?.length} version{activeVersions?.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;