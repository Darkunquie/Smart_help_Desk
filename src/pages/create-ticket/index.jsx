import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import TicketForm from './components/TicketForm';
import AttachmentUploader from './components/AttachmentUploader';
import SuccessModal from './components/SuccessModal';
import FormProgress from './components/FormProgress';
import Icon from '../../components/AppIcon';

const CreateTicketPage = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock user data - in real app, this would come from auth context
  const currentUser = {
    name: 'John Doe',
    role: 'End User', // Can be 'End User', 'Support Agent', or 'Administrator'
    avatar: null
  };

  const formSteps = [
    { id: 1, title: 'Ticket Details', description: 'Basic information and description' },
    { id: 2, title: 'Attachments', description: 'Add relevant links and files' },
    { id: 3, title: 'Review', description: 'Review and submit' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleTicketSubmit = (ticketData) => {
    // Add attachments to ticket data
    const completeTicketData = {
      ...ticketData,
      attachments: attachments,
      estimatedResponseTime: getEstimatedResponseTime(ticketData?.priority),
      queuePosition: Math.floor(Math.random() * 10) + 1
    };

    setCreatedTicket(completeTicketData);
    setIsSuccessModalOpen(true);
  };

  const handleDraftSave = (formData) => {
    // In real app, this would save to backend
    console.log('Draft saved:', formData);
    
    // Show temporary success message
    const event = new CustomEvent('showToast', {
      detail: {
        type: 'success',
        message: 'Draft saved successfully'
      }
    });
    window.dispatchEvent(event);
  };

  const handleAttachmentsChange = (newAttachments) => {
    setAttachments(newAttachments);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setCreatedTicket(null);
    // Reset form by refreshing the page or resetting state
    window.location?.reload();
  };

  const getEstimatedResponseTime = (priority) => {
    const times = {
      urgent: '1 hour',
      high: '4 hours', 
      medium: '24 hours',
      low: '48 hours'
    };
    return times?.[priority] || '48 hours';
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Create Ticket', path: '/create-ticket', icon: 'Plus', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader
        user={currentUser}
        onMenuToggle={handleSidebarToggle}
        notificationCount={3}
      />
      {/* Sidebar Navigation */}
      <SidebarNavigation
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={currentUser?.role}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ease-smooth ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <NavigationBreadcrumbs customBreadcrumbs={breadcrumbs} />
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <Icon name="Plus" size={28} className="text-primary" />
                  Create New Ticket
                </h1>
                <p className="text-muted-foreground mt-1">
                  Submit a support request and get help from our team
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Avg response: 2 hours</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Users" size={16} />
                  <span>12 agents online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Progress */}
          <div className="mb-8">
            <FormProgress
              currentStep={currentStep}
              totalSteps={3}
              steps={formSteps}
            />
          </div>

          {/* Main Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg elevation-1">
              {/* Form Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-foreground">
                      Ticket Information
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Provide detailed information about your issue to help us assist you better
                    </p>
                  </div>
                  
                  {/* Help Button */}
                  <button
                    onClick={() => navigate('/knowledge-base-management')}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span className="hidden sm:inline">Need Help?</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Form */}
                  <div className="lg:col-span-2">
                    <TicketForm
                      onSubmit={handleTicketSubmit}
                      onDraftSave={handleDraftSave}
                      userRole={currentUser?.role}
                    />
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Attachments */}
                    <AttachmentUploader
                      attachments={attachments}
                      onAttachmentsChange={handleAttachmentsChange}
                      maxAttachments={5}
                    />

                    {/* Support Tips */}
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Lightbulb" size={18} className="text-accent" />
                        <h3 className="font-medium text-foreground">Quick Tips</h3>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Search our knowledge base first for quick answers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Include error messages and screenshots when possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Be specific about steps to reproduce the issue</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Choose the right priority level for faster response</span>
                        </li>
                      </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Phone" size={18} className="text-primary" />
                        <h3 className="font-medium text-foreground">Need Immediate Help?</h3>
                      </div>
                      <div className="text-sm space-y-2">
                        <p className="text-muted-foreground">
                          For urgent issues, you can also contact us directly:
                        </p>
                        <div className="space-y-1">
                          <p className="text-foreground font-medium">📞 +1 (555) 123-4567</p>
                          <p className="text-foreground font-medium">✉️ support@smarthelpdesk.com</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Available 24/7 for urgent issues
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        ticketData={createdTicket}
      />
    </div>
  );
};

export default CreateTicketPage;