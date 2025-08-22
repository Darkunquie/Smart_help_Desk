import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationBell = ({ 
  notifications = [],
  onNotificationClick = () => {},
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demo
  const mockNotifications = [
    {
      id: 1,
      title: 'New ticket assigned',
      message: 'Ticket #HD-2025-001 has been assigned to you by Sarah Johnson',
      time: '2 minutes ago',
      type: 'info',
      unread: true,
      priority: 'high',
      ticketId: 'HD-2025-001'
    },
    {
      id: 2,
      title: 'AI suggestion available',
      message: 'Smart resolution suggested for ticket #HD-2025-002 with 95% confidence',
      time: '5 minutes ago',
      type: 'success',
      unread: true,
      priority: 'medium',
      confidence: 95
    },
    {
      id: 3,
      title: 'Ticket escalated',
      message: 'Ticket #HD-2025-003 has been escalated and requires immediate attention',
      time: '10 minutes ago',
      type: 'warning',
      unread: true,
      priority: 'urgent',
      ticketId: 'HD-2025-003'
    },
    {
      id: 4,
      title: 'Knowledge base updated',
      message: 'New article "Password Reset Procedures" has been published',
      time: '1 hour ago',
      type: 'info',
      unread: false,
      priority: 'low'
    },
    {
      id: 5,
      title: 'Ticket resolved',
      message: 'Ticket #HD-2025-004 has been successfully resolved by AI automation',
      time: '2 hours ago',
      type: 'success',
      unread: false,
      priority: 'low',
      ticketId: 'HD-2025-004'
    }
  ];

  const activeNotifications = notifications?.length > 0 ? notifications : mockNotifications;

  useEffect(() => {
    const count = activeNotifications?.filter(n => n?.unread)?.length;
    setUnreadCount(count);
  }, [activeNotifications]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onNotificationClick();
  };

  const handleNotificationClick = (notification) => {
    if (notification?.unread) {
      onMarkAsRead(notification?.id);
    }
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error';
      case 'high':
        return 'bg-warning';
      case 'medium':
        return 'bg-accent';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg elevation-2 animate-fade-in z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {activeNotifications?.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                activeNotifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-border last:border-b-0 hover:bg-muted cursor-pointer transition-colors duration-200 ${
                      notification?.unread ? 'bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Priority Indicator */}
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getPriorityIndicator(notification?.priority)}`} />
                      
                      {/* Notification Icon */}
                      <div className={`mt-1 flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={16} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-medium text-sm ${notification?.unread ? 'text-popover-foreground' : 'text-muted-foreground'}`}>
                            {notification?.title}
                          </p>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">
                            {notification?.time}
                          </p>
                          
                          {/* Additional Info */}
                          <div className="flex items-center gap-2">
                            {notification?.confidence && (
                              <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                                {notification?.confidence}% confidence
                              </span>
                            )}
                            {notification?.ticketId && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
                                {notification?.ticketId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {activeNotifications?.length > 0 && (
              <div className="p-3 border-t border-border">
                <Button variant="ghost" size="sm" fullWidth>
                  View all notifications
                </Button>
              </div>
            )}
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default NotificationBell;