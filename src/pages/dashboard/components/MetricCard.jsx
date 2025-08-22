import React from 'react';
import Icon from '../../../components/AppIcon';


const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  onClick,
  loading = false,
  className = ''
}) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getTrendColor = (trendType) => {
    return trendType === 'up' ? 'text-success' : trendType === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  const getTrendIcon = (trendType) => {
    return trendType === 'up' ? 'TrendingUp' : trendType === 'down' ? 'TrendingDown' : 'Minus';
  };

  if (loading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 animate-pulse ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
        <div className="h-8 bg-muted rounded w-16 mb-2"></div>
        <div className="h-3 bg-muted rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200 ${
      onClick ? 'cursor-pointer' : ''
    } ${className}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        
        <div className="flex items-center justify-between">
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-xs ${getTrendColor(trend)}`}>
              <Icon name={getTrendIcon(trend)} size={12} />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;