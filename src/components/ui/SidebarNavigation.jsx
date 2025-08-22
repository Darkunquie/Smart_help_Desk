import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SidebarNavigation = ({ 
  isCollapsed = false,
  onToggle = () => {},
  userRole = 'Support Agent',
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['End User', 'Support Agent', 'Administrator'],
      badge: null
    },
    {
      label: 'Tickets',
      path: '/ticket-management',
      icon: 'Ticket',
      roles: ['Support Agent', 'Administrator'],
      badge: 12,
      subItems: [
        {
          label: 'All Tickets',
          path: '/ticket-management',
          icon: 'List'
        },
        {
          label: 'Create Ticket',
          path: '/create-ticket',
          icon: 'Plus'
        }
      ]
    },
    {
      label: 'Knowledge Base',
      path: '/knowledge-base-management',
      icon: 'BookOpen',
      roles: ['Support Agent', 'Administrator'],
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === path;
    }
    return location?.pathname?.startsWith(path);
  };

  const filteredItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ease-smooth ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden lg:block ${className}`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-full justify-center"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems?.map((item) => (
              <div key={item?.path}>
                <Button
                  variant={isActivePath(item?.path) ? "secondary" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-3'} h-10`}
                >
                  <Icon name={item?.icon} size={20} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item?.label}</span>
                      {item?.badge && (
                        <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                          {item?.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>

                {/* Sub Items */}
                {!isCollapsed && item?.subItems && isActivePath(item?.path) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item?.subItems?.map((subItem) => (
                      <Button
                        key={subItem?.path}
                        variant={location?.pathname === subItem?.path ? "secondary" : "ghost"}
                        onClick={() => handleNavigation(subItem?.path)}
                        size="sm"
                        className="w-full justify-start gap-2"
                      >
                        <Icon name={subItem?.icon} size={16} />
                        <span>{subItem?.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <p>Smart Helpdesk v2.1.0</p>
                <p className="mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {/* Backdrop */}
        {!isCollapsed && (
          <div 
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={onToggle}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-smooth ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Headphones" size={20} color="white" />
                </div>
                <h1 className="text-lg font-semibold text-foreground">Smart Helpdesk</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {filteredItems?.map((item) => (
                <div key={item?.path}>
                  <Button
                    variant={isActivePath(item?.path) ? "secondary" : "ghost"}
                    onClick={() => {
                      handleNavigation(item?.path);
                      onToggle();
                    }}
                    className="w-full justify-start gap-3 px-3 h-10"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="flex-1 text-left">{item?.label}</span>
                    {item?.badge && (
                      <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                        {item?.badge}
                      </span>
                    )}
                  </Button>

                  {/* Sub Items */}
                  {item?.subItems && isActivePath(item?.path) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item?.subItems?.map((subItem) => (
                        <Button
                          key={subItem?.path}
                          variant={location?.pathname === subItem?.path ? "secondary" : "ghost"}
                          onClick={() => {
                            handleNavigation(subItem?.path);
                            onToggle();
                          }}
                          size="sm"
                          className="w-full justify-start gap-2"
                        >
                          <Icon name={subItem?.icon} size={16} />
                          <span>{subItem?.label}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <p>Smart Helpdesk v2.1.0</p>
                <p className="mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarNavigation;