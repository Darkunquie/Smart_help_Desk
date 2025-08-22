import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const QuickActions = ({ 
  onRefresh = () => {},
  onExport = () => {},
  className = ''
}) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Create Ticket',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/create-ticket')
    },
    {
      label: 'Refresh',
      icon: 'RefreshCw',
      variant: 'outline',
      onClick: onRefresh
    },
    {
      label: 'Export',
      icon: 'Download',
      variant: 'outline',
      onClick: onExport
    },
    {
      label: 'Settings',
      icon: 'Settings',
      variant: 'ghost',
      onClick: () => console.log('Settings clicked')
    }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {quickActions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant}
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          className="hidden sm:flex"
        >
          {action?.label}
        </Button>
      ))}
      {/* Mobile Menu */}
      <div className="sm:hidden">
        <Button
          variant="outline"
          iconName="MoreHorizontal"
          onClick={() => console.log('Mobile menu clicked')}
        />
      </div>
    </div>
  );
};

export default QuickActions;