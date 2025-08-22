import React from 'react';
import Icon from '../../../components/AppIcon';

const TicketStats = ({ 
  stats = {},
  className = ''
}) => {
  const defaultStats = {
    total: 0,
    open: 0,
    triaged: 0,
    waitingHuman: 0,
    resolved: 0,
    closed: 0,
    avgConfidence: 0,
    avgResponseTime: 0
  };

  const currentStats = { ...defaultStats, ...stats };

  const statCards = [
    {
      label: 'Total Tickets',
      value: currentStats?.total,
      icon: 'Ticket',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      label: 'Open',
      value: currentStats?.open,
      icon: 'Clock',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+5%',
      changeType: 'neutral'
    },
    {
      label: 'Triaged',
      value: currentStats?.triaged,
      icon: 'Zap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+18%',
      changeType: 'positive'
    },
    {
      label: 'Waiting Human',
      value: currentStats?.waitingHuman,
      icon: 'User',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '-8%',
      changeType: 'positive'
    },
    {
      label: 'Resolved',
      value: currentStats?.resolved,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+25%',
      changeType: 'positive'
    },
    {
      label: 'Avg Confidence',
      value: `${currentStats?.avgConfidence}%`,
      icon: 'TrendingUp',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+3%',
      changeType: 'positive'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ${className}`}>
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className={`flex items-center gap-1 text-xs ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={12} />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {typeof stat?.value === 'number' ? stat?.value?.toLocaleString() : stat?.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketStats;