import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ 
  isOpen = false,
  onClose = () => {},
  ticketData = null,
  className = ''
}) => {
  const navigate = useNavigate();

  if (!isOpen || !ticketData) return null;

  const handleViewTicket = () => {
    navigate(`/ticket-details?id=${ticketData?.id}`);
    onClose();
  };

  const handleCreateAnother = () => {
    onClose();
    // Form will reset automatically
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

  const getEstimatedResponseTime = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'within 1 hour';
      case 'high':
        return 'within 4 hours';
      case 'medium':
        return 'within 24 hours';
      default:
        return 'within 48 hours';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in" onClick={onClose} />
      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}>
        <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full animate-scale-in">
          {/* Header */}
          <div className="p-6 text-center border-b border-border">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ticket Created Successfully!
            </h2>
            <p className="text-muted-foreground">
              Your support request has been submitted and assigned a ticket ID
            </p>
          </div>

          {/* Ticket Details */}
          <div className="p-6 space-y-4">
            {/* Ticket ID */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Ticket ID</p>
              <p className="text-lg font-mono font-semibold text-primary">
                {ticketData?.id}
              </p>
            </div>

            {/* Ticket Summary */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Title</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ticketData?.title}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Priority</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticketData?.priority)}`}>
                    <Icon name="Flag" size={12} />
                    {ticketData?.priority?.charAt(0)?.toUpperCase() + ticketData?.priority?.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Category</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                    <Icon name="Tag" size={12} />
                    {ticketData?.category?.charAt(0)?.toUpperCase() + ticketData?.category?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">Expected Response</p>
                  <p className="text-sm text-muted-foreground">
                    You should receive a response {getEstimatedResponseTime(ticketData?.priority)} during business hours
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-2">What happens next?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Our AI system will analyze your ticket</li>
                    <li>• You'll receive email updates on progress</li>
                    <li>• A support agent will review and respond</li>
                    <li>• You can track status in your dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-border space-y-3">
            <Button
              variant="default"
              onClick={handleViewTicket}
              iconName="Eye"
              iconPosition="left"
              fullWidth
            >
              View Ticket Details
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCreateAnother}
                iconName="Plus"
                iconPosition="left"
                size="sm"
              >
                Create Another
              </Button>
              <Button
                variant="ghost"
                onClick={handleGoToDashboard}
                iconName="LayoutDashboard"
                iconPosition="left"
                size="sm"
              >
                Dashboard
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;