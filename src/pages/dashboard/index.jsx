import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import WelcomeHeader from './components/WelcomeHeader';
import MetricCard from './components/MetricCard';
import ActivityTimeline from './components/ActivityTimeline';
import QuickActions from './components/QuickActions';
import PerformanceChart from './components/PerformanceChart';
import StatusOverview from './components/StatusOverview';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user] = useState({
    name: 'Sarah Johnson',
    role: 'Support Agent',
    avatar: null
  });

  // Mock data for different user roles
  const mockData = {
    'End User': {
      metrics: [
        {
          title: 'My Open Tickets',
          value: '3',
          subtitle: 'Active requests',
          icon: 'Ticket',
          color: 'primary',
          onClick: () => navigate('/ticket-management')
        },
        {
          title: 'Resolved This Month',
          value: '12',
          subtitle: 'Successfully closed',
          icon: 'CheckCircle',
          color: 'success'
        },
        {
          title: 'Avg Response Time',
          value: '2.4h',
          subtitle: 'Average wait time',
          icon: 'Clock',
          color: 'secondary'
        },
        {
          title: 'Satisfaction Score',
          value: '4.8/5',
          subtitle: 'Your ratings',
          icon: 'Star',
          color: 'warning'
        }
      ],
      activities: [
        {
          id: 1,
          type: 'ticket_created',
          title: 'New ticket created',
          description: 'Login issues with company portal - Ticket #HD-2025-015',
          timestamp: new Date(Date.now() - 300000),
          metadata: { ticketId: 'HD-2025-015' }
        },
        {
          id: 2,
          type: 'ticket_resolved',
          title: 'Ticket resolved',
          description: 'Email configuration issue has been resolved',
          timestamp: new Date(Date.now() - 3600000),
          metadata: { ticketId: 'HD-2025-012' }
        },
        {
          id: 3,
          type: 'ai_suggestion',
          title: 'AI suggestion received',
          description: 'Automated solution suggested for password reset',
          timestamp: new Date(Date.now() - 7200000),
          metadata: { confidence: 92 }
        }
      ]
    },
    'Support Agent': {
      metrics: [
        {
          title: 'Open Tickets',
          value: '24',
          subtitle: 'Awaiting response',
          icon: 'Ticket',
          color: 'primary',
          trend: 'down',
          trendValue: '12%',
          onClick: () => navigate('/ticket-management')
        },
        {
          title: 'Triaged Today',
          value: '18',
          subtitle: 'AI processed',
          icon: 'Bot',
          color: 'accent',
          trend: 'up',
          trendValue: '23%'
        },
        {
          title: 'Avg Resolution Time',
          value: '4.2h',
          subtitle: 'This week',
          icon: 'Clock',
          color: 'secondary',
          trend: 'down',
          trendValue: '8%'
        },
        {
          title: 'Auto-Resolved',
          value: '67%',
          subtitle: 'Success rate',
          icon: 'CheckCircle',
          color: 'success',
          trend: 'up',
          trendValue: '5%'
        }
      ],
      activities: [
        {
          id: 1,
          type: 'ticket_assigned',
          title: 'Ticket assigned to you',
          description: 'High priority ticket #HD-2025-016 requires immediate attention',
          timestamp: new Date(Date.now() - 180000),
          metadata: { ticketId: 'HD-2025-016' }
        },
        {
          id: 2,
          type: 'ai_suggestion',
          title: 'AI suggestion available',
          description: 'Smart resolution suggested for network connectivity issue',
          timestamp: new Date(Date.now() - 900000),
          metadata: { confidence: 89, ticketId: 'HD-2025-017' }
        },
        {
          id: 3,
          type: 'ticket_escalated',
          title: 'Ticket escalated',
          description: 'Security incident escalated to senior team',
          timestamp: new Date(Date.now() - 1800000),
          metadata: { ticketId: 'HD-2025-018' }
        },
        {
          id: 4,
          type: 'ticket_resolved',
          title: 'Ticket resolved',
          description: 'Software installation issue successfully resolved',
          timestamp: new Date(Date.now() - 3600000),
          metadata: { ticketId: 'HD-2025-019' }
        }
      ]
    },
    'Administrator': {
      metrics: [
        {
          title: 'Total Tickets',
          value: '1,247',
          subtitle: 'This month',
          icon: 'BarChart3',
          color: 'primary',
          trend: 'up',
          trendValue: '15%'
        },
        {
          title: 'AI Efficiency',
          value: '89%',
          subtitle: 'Auto-resolution rate',
          icon: 'Bot',
          color: 'accent',
          trend: 'up',
          trendValue: '7%'
        },
        {
          title: 'SLA Compliance',
          value: '94.2%',
          subtitle: 'Within targets',
          icon: 'Target',
          color: 'success',
          trend: 'up',
          trendValue: '2%'
        },
        {
          title: 'Active Agents',
          value: '23',
          subtitle: 'Online now',
          icon: 'Users',
          color: 'secondary'
        }
      ],
      activities: [
        {
          id: 1,
          type: 'system_alert',
          title: 'System performance alert',
          description: 'High CPU usage detected on server cluster',
          timestamp: new Date(Date.now() - 600000)
        },
        {
          id: 2,
          type: 'knowledge_updated',
          title: 'Knowledge base updated',
          description: '5 new articles published by content team',
          timestamp: new Date(Date.now() - 1200000)
        },
        {
          id: 3,
          type: 'user_login',
          title: 'New agent onboarded',
          description: 'Michael Chen joined the support team',
          timestamp: new Date(Date.now() - 2400000)
        }
      ]
    }
  };

  const chartData = [
    { name: 'Mon', tickets: 45, resolved: 38 },
    { name: 'Tue', tickets: 52, resolved: 44 },
    { name: 'Wed', tickets: 38, resolved: 35 },
    { name: 'Thu', tickets: 61, resolved: 52 },
    { name: 'Fri', tickets: 48, resolved: 41 },
    { name: 'Sat', tickets: 23, resolved: 20 },
    { name: 'Sun', tickets: 18, resolved: 16 }
  ];

  const confidenceData = [
    { name: 'Week 1', confidence: 85 },
    { name: 'Week 2', confidence: 87 },
    { name: 'Week 3', confidence: 89 },
    { name: 'Week 4', confidence: 91 }
  ];

  const systemStatus = [
    {
      name: 'AI Triage Engine',
      status: 'operational',
      uptime: 99.9,
      description: 'Processing tickets normally'
    },
    {
      name: 'Knowledge Base API',
      status: 'operational',
      uptime: 99.8,
      description: 'All endpoints responding'
    },
    {
      name: 'Email Notifications',
      status: 'degraded',
      uptime: 97.2,
      description: 'Slight delays in delivery'
    },
    {
      name: 'WebSocket Connections',
      status: 'operational',
      uptime: 99.5,
      description: 'Real-time updates active'
    }
  ];

  const currentData = mockData?.[user?.role] || mockData?.['Support Agent'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMetricClick = (metric) => {
    if (metric?.onClick) {
      metric?.onClick();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopHeader 
        user={user}
        onMenuToggle={handleSidebarToggle}
        notificationCount={5}
      />
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={user?.role}
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6 space-y-6">
          {/* Breadcrumbs */}
          <NavigationBreadcrumbs />
          
          {/* Welcome Header */}
          <WelcomeHeader user={user} />
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData?.metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
                loading={loading}
                onClick={() => handleMetricClick(metric)}
              />
            ))}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts and Status */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <PerformanceChart
                  type="bar"
                  title="Weekly Ticket Volume"
                  data={chartData}
                  dataKey="tickets"
                  color="var(--color-primary)"
                />
                
                {user?.role === 'Support Agent' && (
                  <PerformanceChart
                    type="line"
                    title="AI Confidence Trend"
                    data={confidenceData}
                    dataKey="confidence"
                    color="var(--color-accent)"
                  />
                )}
                
                {user?.role === 'Administrator' && (
                  <StatusOverview
                    title="System Health"
                    items={systemStatus}
                  />
                )}
              </div>
              
              {/* Quick Actions */}
              <QuickActions userRole={user?.role} />
            </div>
            
            {/* Right Column - Activity Timeline */}
            <div className="space-y-6">
              <ActivityTimeline activities={currentData?.activities} />
              
              {/* Additional Status for Mobile */}
              {user?.role === 'Administrator' && (
                <div className="xl:hidden">
                  <StatusOverview
                    title="System Health"
                    items={systemStatus}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;