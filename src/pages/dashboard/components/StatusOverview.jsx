import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverview = ({ 
  title = "System Status",
  items = [],
  className = '' 
}) => {
  const getStatusColor = (status) => {
    const colors = {
      operational: 'text-success bg-success/10',
      degraded: 'text-warning bg-warning/10',
      outage: 'text-error bg-error/10',
      maintenance: 'text-secondary bg-secondary/10'
    };
    return colors?.[status] || colors?.operational;
  };

  const getStatusIcon = (status) => {
    const icons = {
      operational: 'CheckCircle',
      degraded: 'AlertTriangle',
      outage: 'XCircle',
      maintenance: 'Settings'
    };
    return icons?.[status] || icons?.operational;
  };

  const getStatusText = (status) => {
    const texts = {
      operational: 'Operational',
      degraded: 'Degraded Performance',
      outage: 'Service Outage',
      maintenance: 'Under Maintenance'
    };
    return texts?.[status] || texts?.operational;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full ${getStatusColor(item?.status)}`}>
                  <Icon name={getStatusIcon(item?.status)} size={14} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item?.name}</p>
                  {item?.description && (
                    <p className="text-sm text-muted-foreground">{item?.description}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-medium ${getStatusColor(item?.status)?.split(' ')?.[0]}`}>
                  {getStatusText(item?.status)}
                </span>
                {item?.uptime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item?.uptime}% uptime
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {items?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Server" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No status information available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusOverview;