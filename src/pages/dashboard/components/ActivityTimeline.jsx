import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities = [], className = '' }) => {
  const getActivityIcon = (type) => {
    const icons = {
      ticket_created: 'Plus',
      ticket_assigned: 'UserCheck',
      ticket_resolved: 'CheckCircle',
      ticket_escalated: 'AlertTriangle',
      ai_suggestion: 'Bot',
      knowledge_updated: 'BookOpen',
      user_login: 'LogIn',
      system_alert: 'Bell'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      ticket_created: 'text-primary bg-primary/10',
      ticket_assigned: 'text-secondary bg-secondary/10',
      ticket_resolved: 'text-success bg-success/10',
      ticket_escalated: 'text-warning bg-warning/10',
      ai_suggestion: 'text-accent bg-accent/10',
      knowledge_updated: 'text-primary bg-primary/10',
      user_login: 'text-muted-foreground bg-muted',
      system_alert: 'text-error bg-error/10'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (activities?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getActivityColor(activity?.type)} flex-shrink-0`}>
                <Icon name={getActivityIcon(activity?.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity?.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity?.description}
                    </p>
                    {activity?.metadata && (
                      <div className="flex items-center gap-2 mt-2">
                        {activity?.metadata?.ticketId && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
                            {activity?.metadata?.ticketId}
                          </span>
                        )}
                        {activity?.metadata?.confidence && (
                          <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                            {activity?.metadata?.confidence}% confidence
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTime(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;