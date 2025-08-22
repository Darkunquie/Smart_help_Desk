import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import TicketMetadata from './components/TicketMetadata';
import TicketContent from './components/TicketContent';
import AISuggestions from './components/AISuggestions';
import TicketTimeline from './components/TicketTimeline';
import ResponseEditor from './components/ResponseEditor';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TicketDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketId = searchParams?.get('id') || 'HD-2025-001';
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userRole] = useState('Support Agent');
  const [activeTab, setActiveTab] = useState('timeline');

  // Mock ticket data
  const [ticket, setTicket] = useState({
    id: ticketId,
    title: 'Unable to access company email after password reset',
    description: `I recently reset my password following the company security policy, but now I'm unable to access my email account. I've tried logging in multiple times with the new password, but I keep getting an "authentication failed" error.\n\nI need urgent access to my email as I have important client communications pending. This issue started this morning around 9:00 AM EST.\n\nSteps I've already tried:\n1. Cleared browser cache and cookies\n2. Tried different browsers (Chrome, Firefox, Edge)\n3. Attempted login from different devices\n4. Verified caps lock is off\n\nThe error message I'm seeing is: "Authentication failed. Please check your credentials and try again."\n\nPlease help resolve this as soon as possible.`,
    status: 'triaged',
    priority: 'high',
    category: 'Email & Communication',
    aiConfidence: 87,
    assignedAgent: 'sarah.johnson',
    createdAt: '2025-01-21T08:30:00Z',
    updatedAt: '2025-01-21T10:15:00Z',
    slaBreachAt: '2025-01-21T16:30:00Z',
    traceId: 'trace_abc123def456',
    source: 'Web Portal',
    channel: 'Email',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    language: 'en-US',
    customer: {
      id: 'CUST-001',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      department: 'Marketing'
    },
    attachments: [
      {
        type: 'url',
        name: 'Error Screenshot',
        url: 'https://example.com/screenshot.png',
        extractedText: 'Error message displayed: "Authentication failed. Please check your credentials and try again."\n\nBrowser: Chrome Version 120.0.6099.109\nTimestamp: 2025-01-21 09:15:32\nURL: https://mail.techcorp.com/login'
      },
      {
        type: 'url',
        name: 'System Configuration',
        url: 'https://example.com/config.txt',
        extractedText: 'Operating System: Windows 11 Pro\nBrowser: Google Chrome 120.0.6099.109\nEmail Client: Web-based (Outlook Web App)\nNetwork: Corporate WiFi\nVPN: Not connected\nFirewall: Windows Defender\nAntivirus: Corporate McAfee'
      }
    ]
  });

  // Mock AI suggestions
  const [aiSuggestions] = useState([
    {
      confidence: 87,
      type: 'Automated Response',
      draftResponse: `Hello Emily,\n\nThank you for contacting our support team regarding your email access issue.\n\nI understand you're unable to access your company email after resetting your password. This is typically caused by a synchronization delay between our password system and the email servers.\n\nI've initiated a manual sync for your account and reset your email authentication tokens. Please wait 10-15 minutes and then try the following:\n\n1. Clear your browser's cache and cookies completely\n2. Close all browser windows\n3. Open a new browser window and navigate to https://mail.techcorp.com\n4. Log in with your new password\n\nIf you continue to experience issues, please try accessing your email from the Outlook desktop application or mobile app, as these sometimes sync faster than the web interface.\n\nI'll monitor your account for the next hour to ensure the sync completes successfully. You should receive a confirmation email once your access is restored.\n\nPlease let me know if you need any further assistance.\n\nBest regards,\nSarah Johnson\nIT Support Team`,
      reasoning: 'Based on the symptoms described (authentication failed after password reset) and the customer\'s troubleshooting steps, this appears to be a common synchronization issue between the password management system and email servers. The suggested solution addresses the most likely cause.',
      citedArticles: [
        {
          title: 'Email Access Issues After Password Reset',
          excerpt: 'When users reset their passwords, there can be a delay of up to 30 minutes for the changes to propagate to all email servers. Manual synchronization can resolve this faster.',
          relevanceScore: 95,
          tags: ['email', 'password-reset', 'authentication']
        },
        {
          title: 'Troubleshooting Authentication Failures',
          excerpt: 'Authentication failed errors are commonly caused by cached credentials, synchronization delays, or account lockouts. Clearing cache and waiting for sync usually resolves the issue.',
          relevanceScore: 89,
          tags: ['authentication', 'troubleshooting', 'email']
        }
      ]
    },
    {
      confidence: 72,
      type: 'Alternative Solution',
      draftResponse: `Hello Emily,\n\nI see you're having trouble accessing your email after a password reset. Let me help you resolve this quickly.\n\nThis issue often occurs when the new password hasn't fully synchronized across all our systems. Here's what I recommend:\n\n1. First, let's verify your account isn't locked. I'll check this on my end.\n2. Try accessing your email using the Outlook mobile app with your new password\n3. If that works, the web interface should sync within the next 15-30 minutes\n\nI'm also going to send you a temporary access link that will allow you to check your urgent emails while we resolve the main login issue.\n\nI'll follow up with you in 30 minutes to confirm everything is working properly.\n\nBest regards,\nSupport Team`,
      reasoning: 'Alternative approach focusing on immediate access through mobile app and temporary solutions while the main issue resolves.',
      citedArticles: [
        {
          title: 'Account Lockout Procedures',
          excerpt: 'Multiple failed login attempts can trigger automatic account lockouts. Check account status before troubleshooting other authentication issues.',
          relevanceScore: 78,
          tags: ['account-lockout', 'security', 'authentication']
        }
      ]
    }
  ]);

  // Mock timeline data
  const [timeline, setTimeline] = useState([
    {
      type: 'created',
      title: 'Ticket Created',
      description: 'Customer reported email access issue after password reset',
      actor: 'Emily Rodriguez',
      timestamp: '2025-01-21T08:30:00Z',
      traceId: 'trace_abc123def456',
      internal: false
    },
    {
      type: 'ai_suggestion',
      title: 'AI Analysis Complete',
      description: 'AI system analyzed the ticket and generated response suggestions',
      content: 'Confidence: 87% - Identified as password synchronization issue',
      actor: 'AI System',
      timestamp: '2025-01-21T08:32:00Z',
      traceId: 'trace_abc123def456',
      internal: true
    },
    {
      type: 'assignment',
      title: 'Ticket Assigned',
      description: 'Ticket automatically assigned based on category and workload',
      actor: 'System',
      timestamp: '2025-01-21T08:35:00Z',
      traceId: 'trace_abc123def456',
      internal: true,
      changes: [
        { field: 'Assigned Agent', from: 'Unassigned', to: 'Sarah Johnson' }
      ]
    },
    {
      type: 'status_change',
      title: 'Status Updated',
      description: 'Ticket status changed from Open to Triaged',
      actor: 'Sarah Johnson',
      timestamp: '2025-01-21T09:15:00Z',
      traceId: 'trace_abc123def456',
      internal: false,
      changes: [
        { field: 'Status', from: 'Open', to: 'Triaged' }
      ]
    },
    {
      type: 'note',
      title: 'Internal Note Added',
      description: 'Agent added investigation notes',
      content: 'Checked user account - no lockouts detected. Password was reset 2 hours ago. Likely sync delay issue. Will initiate manual sync and monitor.',
      actor: 'Sarah Johnson',
      timestamp: '2025-01-21T09:45:00Z',
      traceId: 'trace_abc123def456',
      internal: true
    },
    {
      type: 'response',
      title: 'Response Sent',
      description: 'Agent sent response to customer with resolution steps',
      content: 'Provided troubleshooting steps and initiated manual account sync. Estimated resolution time: 15-30 minutes.',
      actor: 'Sarah Johnson',
      timestamp: '2025-01-21T10:15:00Z',
      traceId: 'trace_abc123def456',
      internal: false
    }
  ]);

  const handleTicketUpdate = (field, value) => {
    setTicket(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date()?.toISOString()
    }));

    // Add timeline entry for the update
    const newTimelineEntry = {
      type: 'status_change',
      title: `${field?.charAt(0)?.toUpperCase() + field?.slice(1)} Updated`,
      description: `${field} changed by agent`,
      actor: 'Sarah Johnson',
      timestamp: new Date()?.toISOString(),
      traceId: ticket?.traceId,
      internal: false,
      changes: [
        { field: field?.charAt(0)?.toUpperCase() + field?.slice(1), from: ticket?.[field], to: value }
      ]
    };

    setTimeline(prev => [newTimelineEntry, ...prev]);
  };

  const handleAcceptSuggestion = (suggestion, editMode = false) => {
    if (editMode) {
      // Open response editor with suggestion pre-filled
      setActiveTab('response');
    } else {
      // Auto-send the suggestion
      handleSendResponse({
        content: suggestion?.draftResponse,
        statusUpdate: 'waiting_human',
        isInternal: false,
        template: ''
      });
    }
  };

  const handleRejectSuggestion = (suggestion) => {
    // Add feedback to timeline
    const newTimelineEntry = {
      type: 'note',
      title: 'AI Suggestion Rejected',
      description: 'Agent rejected AI-generated response suggestion',
      content: `Rejected suggestion with ${suggestion?.confidence}% confidence. Reason: Agent chose different approach.`,
      actor: 'Sarah Johnson',
      timestamp: new Date()?.toISOString(),
      traceId: ticket?.traceId,
      internal: true
    };

    setTimeline(prev => [newTimelineEntry, ...prev]);
  };

  const handleSendResponse = (responseData) => {
    // Add response to timeline
    const newTimelineEntry = {
      type: 'response',
      title: responseData?.isInternal ? 'Internal Note Added' : 'Response Sent',
      description: responseData?.isInternal ? 'Agent added internal note' : 'Agent sent response to customer',
      content: responseData?.content,
      actor: 'Sarah Johnson',
      timestamp: new Date()?.toISOString(),
      traceId: ticket?.traceId,
      internal: responseData?.isInternal
    };

    setTimeline(prev => [newTimelineEntry, ...prev]);

    // Update ticket status if specified
    if (responseData?.statusUpdate) {
      handleTicketUpdate('status', responseData?.statusUpdate);
    }

    // Update ticket timestamp
    setTicket(prev => ({
      ...prev,
      updatedAt: new Date()?.toISOString()
    }));
  };

  const handleAddNote = (noteContent) => {
    const newTimelineEntry = {
      type: 'note',
      title: 'Internal Note Added',
      description: 'Agent added investigation notes',
      content: noteContent,
      actor: 'Sarah Johnson',
      timestamp: new Date()?.toISOString(),
      traceId: ticket?.traceId,
      internal: true
    };

    setTimeline(prev => [newTimelineEntry, ...prev]);
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Tickets', path: '/ticket-management', icon: 'Ticket' },
    { label: `Ticket ${ticket?.id}`, path: `/ticket-details?id=${ticket?.id}`, icon: 'FileText', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopHeader
        user={{ name: 'Sarah Johnson', role: userRole }}
        onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        notificationCount={3}
      />
      <SidebarNavigation
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={userRole}
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <NavigationBreadcrumbs customBreadcrumbs={customBreadcrumbs} />
            
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ticket Details</h1>
                <p className="text-muted-foreground">
                  Manage and respond to customer support tickets
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/ticket-management')}
                >
                  <Icon name="ArrowLeft" size={16} />
                  Back to Tickets
                </Button>
                <Button variant="outline">
                  <Icon name="Share" size={16} />
                  Share
                </Button>
                <Button variant="outline">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Panel - Ticket Metadata */}
            <div className="xl:col-span-3 order-3 xl:order-1">
              <TicketMetadata
                ticket={ticket}
                onUpdate={handleTicketUpdate}
                userRole={userRole}
              />
            </div>

            {/* Center Panel - Ticket Content and Timeline */}
            <div className="xl:col-span-6 order-1 xl:order-2 space-y-6">
              <TicketContent ticket={ticket} />
              
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'timeline' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name="Clock" size={16} className="inline mr-2" />
                      Timeline ({timeline?.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('response')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'response' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name="MessageSquare" size={16} className="inline mr-2" />
                      Response
                    </button>
                  </nav>
                </div>
                
                <div className="p-0">
                  {activeTab === 'timeline' ? (
                    <div className="p-6">
                      <TicketTimeline
                        timeline={timeline}
                        onAddNote={handleAddNote}
                      />
                    </div>
                  ) : (
                    <div className="p-6">
                      <ResponseEditor
                        onSendResponse={handleSendResponse}
                        aiSuggestion={aiSuggestions?.[0]}
                        userRole={userRole}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - AI Suggestions */}
            <div className="xl:col-span-3 order-2 xl:order-3">
              <AISuggestions
                suggestions={aiSuggestions}
                onAcceptSuggestion={handleAcceptSuggestion}
                onRejectSuggestion={handleRejectSuggestion}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;