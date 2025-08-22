import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TopHeader = ({ 
  user = { name: 'John Doe', role: 'Support Agent', avatar: null },
  onMenuToggle = () => {},
  notificationCount = 3,
  onNotificationClick = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
    onNotificationClick();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsProfileOpen(false);
  };

  const handleSettingsClick = () => {
    setIsProfileOpen(false);
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'New ticket assigned',
      message: 'Ticket #1234 has been assigned to you',
      time: '2 min ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'AI suggestion available',
      message: 'Smart resolution suggested for ticket #1235',
      time: '5 min ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Ticket escalated',
      message: 'Ticket #1236 requires immediate attention',
      time: '10 min ago',
      type: 'warning',
      unread: false
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1 ${className}`}>
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Headphones" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Smart Helpdesk</h1>
            </div>
          </button>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationToggle}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg elevation-2 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted cursor-pointer transition-colors duration-200 ${
                        notification?.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.type === 'info' ? 'bg-primary' :
                          notification?.type === 'success' ? 'bg-success' :
                          notification?.type === 'warning' ? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-popover-foreground">
                            {notification?.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileToggle}
              className="flex items-center gap-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg elevation-2 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-popover-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.role}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icon name="User" size={16} />
                    Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icon name="Settings" size={16} />
                    Settings
                  </button>
                  <button
                    onClick={() => navigate('/knowledge-base-management')}
                    className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icon name="HelpCircle" size={16} />
                    Help
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icon name="LogOut" size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default TopHeader;