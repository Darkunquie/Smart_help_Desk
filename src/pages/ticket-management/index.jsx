import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import TicketFilters from './components/TicketFilters';
import TicketTable from './components/TicketTable';
import BulkActions from './components/BulkActions';
import TicketStats from './components/TicketStats';
import QuickActions from './components/QuickActions';

const TicketManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock ticket data
  const mockTickets = [
    {
      id: 'HD-2025-001',
      title: 'Unable to reset password',
      description: 'User cannot reset password using the forgot password link. The email is not being received.',
      status: 'open',
      category: 'account',
      priority: 'high',
      confidence: 85,
      assignedAgent: 'Sarah Johnson',
      createdAt: '2025-01-21T08:30:00Z',
      lastActivity: '2025-01-21T09:15:00Z',
      customer: 'John Smith',
      customerEmail: 'john.smith@example.com'
    },
    {
      id: 'HD-2025-002',
      title: 'Payment processing error',
      description: 'Credit card payment fails during checkout with error code 4001. Customer tried multiple cards.',
      status: 'triaged',
      category: 'billing',
      priority: 'urgent',
      confidence: 92,
      assignedAgent: 'Mike Chen',
      createdAt: '2025-01-21T07:45:00Z',
      lastActivity: '2025-01-21T10:20:00Z',
      customer: 'Emily Davis',
      customerEmail: 'emily.davis@example.com'
    },
    {
      id: 'HD-2025-003',
      title: 'Feature request: Dark mode',
      description: 'Customer requesting dark mode theme option for better accessibility and user experience.',
      status: 'waiting_human',
      category: 'feature',
      priority: 'low',
      confidence: 45,
      assignedAgent: null,
      createdAt: '2025-01-20T16:20:00Z',
      lastActivity: '2025-01-21T08:45:00Z',
      customer: 'Alex Rodriguez',
      customerEmail: 'alex.rodriguez@example.com'
    },
    {
      id: 'HD-2025-004',
      title: 'Application crashes on startup',
      description: 'Mobile app crashes immediately after opening. Occurs on both iOS and Android devices.',
      status: 'resolved',
      category: 'technical',
      priority: 'high',
      confidence: 88,
      assignedAgent: 'Lisa Wang',
      createdAt: '2025-01-20T14:10:00Z',
      lastActivity: '2025-01-21T09:30:00Z',
      customer: 'Maria Garcia',
      customerEmail: 'maria.garcia@example.com'
    },
    {
      id: 'HD-2025-005',
      title: 'Slow loading times',
      description: 'Dashboard takes over 30 seconds to load. Performance issues reported by multiple users.',
      status: 'open',
      category: 'technical',
      priority: 'medium',
      confidence: 76,
      assignedAgent: 'Sarah Johnson',
      createdAt: '2025-01-20T11:30:00Z',
      lastActivity: '2025-01-21T07:20:00Z',
      customer: 'David Wilson',
      customerEmail: 'david.wilson@example.com'
    },
    {
      id: 'HD-2025-006',
      title: 'Invoice not received',
      description: 'Customer has not received invoice for last month subscription. Payment was processed successfully.',
      status: 'closed',
      category: 'billing',
      priority: 'medium',
      confidence: 94,
      assignedAgent: 'Emily Davis',
      createdAt: '2025-01-19T13:45:00Z',
      lastActivity: '2025-01-20T16:10:00Z',
      customer: 'Robert Brown',
      customerEmail: 'robert.brown@example.com'
    },
    {
      id: 'HD-2025-007',
      title: 'API rate limit exceeded',
      description: 'Third-party integration failing due to API rate limits. Need to increase quota or implement caching.',
      status: 'triaged',
      category: 'technical',
      priority: 'high',
      confidence: 82,
      assignedAgent: 'Alex Rodriguez',
      createdAt: '2025-01-19T09:20:00Z',
      lastActivity: '2025-01-21T08:00:00Z',
      customer: 'Jennifer Lee',
      customerEmail: 'jennifer.lee@example.com'
    },
    {
      id: 'HD-2025-008',
      title: 'Account deletion request',
      description: 'Customer wants to permanently delete their account and all associated data per GDPR requirements.',
      status: 'waiting_human',
      category: 'account',
      priority: 'medium',
      confidence: 67,
      assignedAgent: null,
      createdAt: '2025-01-18T15:30:00Z',
      lastActivity: '2025-01-21T09:45:00Z',
      customer: 'Thomas Anderson',
      customerEmail: 'thomas.anderson@example.com'
    }
  ];

  // Mock stats data
  const mockStats = {
    total: mockTickets?.length,
    open: mockTickets?.filter(t => t?.status === 'open')?.length,
    triaged: mockTickets?.filter(t => t?.status === 'triaged')?.length,
    waitingHuman: mockTickets?.filter(t => t?.status === 'waiting_human')?.length,
    resolved: mockTickets?.filter(t => t?.status === 'resolved')?.length,
    closed: mockTickets?.filter(t => t?.status === 'closed')?.length,
    avgConfidence: Math.round(
      mockTickets?.reduce((sum, ticket) => sum + (ticket?.confidence || 0), 0) / mockTickets?.length
    ),
    avgResponseTime: 2.4
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFilteredTickets(mockTickets);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...mockTickets];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(ticket =>
        ticket?.id?.toLowerCase()?.includes(searchTerm) ||
        ticket?.title?.toLowerCase()?.includes(searchTerm) ||
        ticket?.description?.toLowerCase()?.includes(searchTerm) ||
        ticket?.customer?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(ticket => ticket?.status === filters?.status);
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(ticket => ticket?.category === filters?.category);
    }

    // Apply confidence filter
    if (filters?.confidenceRange) {
      filtered = filtered?.filter(ticket => {
        if (!ticket?.confidence) return false;
        switch (filters?.confidenceRange) {
          case 'high':
            return ticket?.confidence >= 80;
          case 'medium':
            return ticket?.confidence >= 50 && ticket?.confidence < 80;
          case 'low':
            return ticket?.confidence < 50;
          default:
            return true;
        }
      });
    }

    // Apply assigned agent filter
    if (filters?.assignedAgent) {
      if (filters?.assignedAgent === 'unassigned') {
        filtered = filtered?.filter(ticket => !ticket?.assignedAgent);
      } else {
        filtered = filtered?.filter(ticket => ticket?.assignedAgent === filters?.assignedAgent);
      }
    }

    setFilteredTickets(filtered);
  };

  const handleClearFilters = () => {
    setFilteredTickets(mockTickets);
  };

  const handleTicketSelect = (ticketId) => {
    setSelectedTickets(prev => 
      prev?.includes(ticketId)
        ? prev?.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTickets?.length === filteredTickets?.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets?.map(ticket => ticket?.id));
    }
  };

  const handleBulkAction = async (action) => {
    console.log(`Applying bulk action: ${action} to tickets:`, selectedTickets);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSelectedTickets([]);
  };

  const handleClearSelection = () => {
    setSelectedTickets([]);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredTickets(mockTickets);
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('Exporting tickets...');
    // Simulate export functionality
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader onMenuToggle={handleSidebarToggle} />
        <SidebarNavigation 
          isCollapsed={isSidebarCollapsed} 
          onToggle={handleSidebarToggle}
          userRole="Support Agent"
        />
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}>
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-16 bg-muted rounded-lg"></div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader onMenuToggle={handleSidebarToggle} />
      <SidebarNavigation 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        userRole="Support Agent"
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <NavigationBreadcrumbs />
              <h1 className="text-2xl font-bold text-foreground mt-2">Ticket Management</h1>
              <p className="text-muted-foreground">
                Manage and track customer support tickets with AI-powered triage
              </p>
            </div>
            <QuickActions onRefresh={handleRefresh} onExport={handleExport} />
          </div>

          {/* Stats */}
          <TicketStats stats={mockStats} />

          {/* Filters */}
          <TicketFilters
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            totalTickets={mockTickets?.length}
            filteredTickets={filteredTickets?.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedTickets?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
          />

          {/* Tickets Table */}
          <TicketTable
            tickets={filteredTickets}
            selectedTickets={selectedTickets}
            onTicketSelect={handleTicketSelect}
            onSelectAll={handleSelectAll}
          />
        </div>
      </main>
    </div>
  );
};

export default TicketManagement;