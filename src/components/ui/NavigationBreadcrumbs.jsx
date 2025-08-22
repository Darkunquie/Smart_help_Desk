import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBreadcrumbs = ({ 
  customBreadcrumbs = null,
  className = ''
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/ticket-management': { label: 'Ticket Management', icon: 'Ticket' },
    '/ticket-details': { label: 'Ticket Details', icon: 'FileText' },
    '/create-ticket': { label: 'Create Ticket', icon: 'Plus' },
    '/knowledge-base-management': { label: 'Knowledge Base', icon: 'BookOpen' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];

    if (location?.pathname === '/dashboard') {
      return breadcrumbs;
    }

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const route = routeMap?.[currentPath];
      
      if (route) {
        breadcrumbs?.push({
          label: route?.label,
          path: currentPath,
          icon: route?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {crumb?.isLast ? (
              <span className="flex items-center gap-2 text-foreground font-medium">
                <Icon name={crumb?.icon} size={16} />
                <span className="hidden sm:inline">{crumb?.label}</span>
                <span className="sm:hidden">{crumb?.label?.split(' ')?.[0]}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(crumb?.path)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-2 py-1 h-auto"
              >
                <Icon name={crumb?.icon} size={16} />
                <span className="hidden sm:inline">{crumb?.label}</span>
                <span className="sm:hidden">{crumb?.label?.split(' ')?.[0]}</span>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;