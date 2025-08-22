import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ userRole = 'Support Agent', className = '' }) => {
  const navigate = useNavigate();

  const getActionsForRole = (role) => {
    const actions = {
      'End User': [
        {
          title: 'Create New Ticket',
          description: 'Submit a support request',
          icon: 'Plus',
          color: 'primary',
          path: '/create-ticket',
          primary: true
        },
        {
          title: 'Browse Knowledge Base',
          description: 'Find answers to common questions',
          icon: 'BookOpen',
          color: 'secondary',
          path: '/knowledge-base-management'
        },
        {
          title: 'View My Tickets',
          description: 'Track your support requests',
          icon: 'Ticket',
          color: 'secondary',
          path: '/ticket-management'
        }
      ],
      'Support Agent': [
        {
          title: 'Review Ticket Queue',
          description: 'Process pending tickets',
          icon: 'ClipboardList',
          color: 'primary',
          path: '/ticket-management',
          primary: true
        },
        {
          title: 'AI Suggestions',
          description: 'Review automated responses',
          icon: 'Bot',
          color: 'accent',
          path: '/ticket-management?filter=ai_suggestions'
        },
        {
          title: 'Knowledge Base',
          description: 'Manage support articles',
          icon: 'BookOpen',
          color: 'secondary',
          path: '/knowledge-base-management'
        },
        {
          title: 'Create Ticket',
          description: 'Create ticket on behalf of user',
          icon: 'Plus',
          color: 'secondary',
          path: '/create-ticket'
        }
      ],
      'Administrator': [
        {
          title: 'System Overview',
          description: 'Monitor system performance',
          icon: 'BarChart3',
          color: 'primary',
          path: '/dashboard',
          primary: true
        },
        {
          title: 'Manage Tickets',
          description: 'Oversee all support tickets',
          icon: 'Ticket',
          color: 'secondary',
          path: '/ticket-management'
        },
        {
          title: 'Knowledge Base',
          description: 'Manage content and articles',
          icon: 'BookOpen',
          color: 'secondary',
          path: '/knowledge-base-management'
        },
        {
          title: 'User Management',
          description: 'Manage users and permissions',
          icon: 'Users',
          color: 'secondary',
          path: '/dashboard'
        }
      ]
    };
    return actions?.[role] || actions?.['Support Agent'];
  };

  const actions = getActionsForRole(userRole);

  const handleActionClick = (path) => {
    navigate(path);
  };

  const getColorClasses = (color, isPrimary = false) => {
    if (isPrimary) {
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
    
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      success: 'bg-success/10 text-success hover:bg-success/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Common tasks for {userRole?.toLowerCase()}s
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action?.path)}
              className={`p-4 rounded-lg border border-border text-left transition-all duration-200 hover:elevation-1 ${
                action?.primary ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getColorClasses(action?.color, action?.primary)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {action?.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;