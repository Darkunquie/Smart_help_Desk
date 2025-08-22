import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ 
  user = { name: 'John Doe', role: 'Support Agent' },
  className = '' 
}) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleIcon = (role) => {
    const icons = {
      'End User': 'User',
      'Support Agent': 'Headphones',
      'Administrator': 'Shield'
    };
    return icons?.[role] || icons?.['Support Agent'];
  };

  const getRoleColor = (role) => {
    const colors = {
      'End User': 'text-primary bg-primary/10',
      'Support Agent': 'text-accent bg-accent/10',
      'Administrator': 'text-error bg-error/10'
    };
    return colors?.[role] || colors?.['Support Agent'];
  };

  const getCurrentDate = () => {
    return new Date()?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${getRoleColor(user?.role)}`}>
            <Icon name={getRoleIcon(user?.role)} size={24} />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {getCurrentDate()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(user?.role)}`}>
                {user?.role}
              </span>
              <span className="text-xs text-muted-foreground">
                Smart Helpdesk Dashboard
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-right">
          <div>
            <p className="text-sm text-muted-foreground">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;