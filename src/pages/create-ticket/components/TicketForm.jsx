import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const TicketForm = ({ 
  onSubmit = () => {},
  onDraftSave = () => {},
  userRole = 'End User',
  className = ''
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    customerEmail: '',
    customerName: '',
    internalNotes: '',
    attachments: [],
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);

  const categoryOptions = [
    { value: 'technical', label: 'Technical Support', description: 'Software bugs, system errors, technical issues' },
    { value: 'account', label: 'Account Management', description: 'Login issues, password reset, account settings' },
    { value: 'billing', label: 'Billing & Payments', description: 'Payment issues, subscription questions, invoices' },
    { value: 'feature', label: 'Feature Request', description: 'New feature suggestions, enhancements' },
    { value: 'general', label: 'General Inquiry', description: 'Questions, information requests' },
    { value: 'other', label: 'Other', description: 'Issues not covered by other categories' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', description: 'Minor issues, general questions' },
    { value: 'medium', label: 'Medium', description: 'Standard support requests' },
    { value: 'high', label: 'High', description: 'Important issues affecting work' },
    { value: 'urgent', label: 'Urgent', description: 'Critical issues requiring immediate attention' }
  ];

  const tagOptions = [
    { value: 'bug', label: 'Bug Report' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'performance', label: 'Performance' },
    { value: 'security', label: 'Security' },
    { value: 'ui-ux', label: 'UI/UX' }
  ];

  // Auto-save draft functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData?.title || formData?.description) {
        handleDraftSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(timer);
  }, [formData]);

  // Character count for description
  useEffect(() => {
    setCharacterCount(formData?.description?.length);
  }, [formData?.description]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTagChange = (selectedTags) => {
    setFormData(prev => ({
      ...prev,
      tags: selectedTags
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Ticket title is required';
    } else if (formData?.title?.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Ticket description is required';
    } else if (formData?.description?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    // Additional validation for support agents
    if (userRole === 'Support Agent') {
      if (!formData?.customerEmail?.trim()) {
        newErrors.customerEmail = 'Customer email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.customerEmail)) {
        newErrors.customerEmail = 'Please enter a valid email address';
      }

      if (!formData?.customerName?.trim()) {
        newErrors.customerName = 'Customer name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleDraftSave = async () => {
    if (!formData?.title && !formData?.description) return;

    setIsDraftSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      onDraftSave(formData);
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const ticketData = {
        ...formData,
        id: `HD-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 1000))?.padStart(3, '0')}`,
        status: 'open',
        createdAt: new Date(),
        submittedBy: userRole === 'End User' ? 'current-user' : formData?.customerEmail
      };

      onSubmit(ticketData);
    } catch (error) {
      console.error('Failed to submit ticket:', error);
      setErrors({ submit: 'Failed to submit ticket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Draft Save Status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {isDraftSaving ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Saving draft...</span>
            </>
          ) : lastSaved ? (
            <>
              <Icon name="Check" size={16} className="text-success" />
              <span>Draft saved at {lastSaved?.toLocaleTimeString()}</span>
            </>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleDraftSave}
          disabled={isDraftSaving || (!formData?.title && !formData?.description)}
        >
          Save Draft
        </Button>
      </div>
      {/* Customer Information (Support Agents Only) */}
      {userRole === 'Support Agent' && (
        <div className="bg-muted/30 p-4 rounded-lg border border-border">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="User" size={18} />
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Customer Name"
              type="text"
              placeholder="Enter customer's full name"
              value={formData?.customerName}
              onChange={(e) => handleInputChange('customerName', e?.target?.value)}
              error={errors?.customerName}
              required
            />
            <Input
              label="Customer Email"
              type="email"
              placeholder="customer@example.com"
              value={formData?.customerEmail}
              onChange={(e) => handleInputChange('customerEmail', e?.target?.value)}
              error={errors?.customerEmail}
              required
            />
          </div>
        </div>
      )}
      {/* Ticket Title */}
      <Input
        label="Ticket Title"
        type="text"
        placeholder="Brief summary of your issue (minimum 10 characters)"
        description="Provide a clear, concise title that describes your issue"
        value={formData?.title}
        onChange={(e) => handleInputChange('title', e?.target?.value)}
        error={errors?.title}
        required
        minLength={10}
        maxLength={100}
      />
      {/* Category and Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          placeholder="Select issue category"
          description="Choose the category that best describes your issue"
          options={categoryOptions}
          value={formData?.category}
          onChange={(value) => handleInputChange('category', value)}
          error={errors?.category}
          required
          searchable
        />
        
        <Select
          label="Priority Level"
          placeholder="Select priority"
          description="How urgent is this issue?"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => handleInputChange('priority', value)}
          required
        />
      </div>
      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Detailed Description *
        </label>
        <textarea
          placeholder={`Please provide a detailed description of your issue including:\n• What you were trying to do\n• What happened instead\n• Steps to reproduce the problem\n• Any error messages you received`}
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          className="w-full min-h-32 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          minLength={20}
          maxLength={2000}
          required
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Minimum 20 characters required
          </span>
          <span className={`${characterCount > 2000 ? 'text-error' : 'text-muted-foreground'}`}>
            {characterCount}/2000
          </span>
        </div>
        {errors?.description && (
          <p className="text-sm text-error">{errors?.description}</p>
        )}
      </div>
      {/* Tags */}
      <Select
        label="Tags (Optional)"
        placeholder="Select relevant tags"
        description="Add tags to help categorize your ticket"
        options={tagOptions}
        value={formData?.tags}
        onChange={handleTagChange}
        multiple
        searchable
        clearable
      />
      {/* Internal Notes (Support Agents Only) */}
      {userRole === 'Support Agent' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Internal Notes (Optional)
          </label>
          <textarea
            placeholder="Add any internal notes or context for other agents..."
            value={formData?.internalNotes}
            onChange={(e) => handleInputChange('internalNotes', e?.target?.value)}
            className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            maxLength={500}
          />
          <p className="text-sm text-muted-foreground">
            These notes will only be visible to support agents
          </p>
        </div>
      )}
      {/* Priority Indicator */}
      <div className="bg-muted/30 p-4 rounded-lg border border-border">
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={18} className={getPriorityColor(formData?.priority)} />
          <div>
            <p className="font-medium text-foreground">
              Expected Response Time
            </p>
            <p className="text-sm text-muted-foreground">
              {formData?.priority === 'urgent' && 'Within 1 hour during business hours'}
              {formData?.priority === 'high' && 'Within 4 hours during business hours'}
              {formData?.priority === 'medium' && 'Within 24 hours'}
              {formData?.priority === 'low' && 'Within 48 hours'}
            </p>
          </div>
        </div>
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-error">
            <Icon name="AlertCircle" size={18} />
            <p className="font-medium">Submission Failed</p>
          </div>
          <p className="text-sm text-error mt-1">{errors?.submit}</p>
        </div>
      )}
      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          disabled={isSubmitting}
          iconName="Send"
          iconPosition="right"
          className="sm:order-2"
        >
          {isSubmitting ? 'Creating Ticket...' : 'Create Ticket'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleDraftSave}
          disabled={isDraftSaving || (!formData?.title && !formData?.description)}
          iconName="Save"
          iconPosition="left"
          className="sm:order-1"
        >
          {isDraftSaving ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
      {/* Help Text */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground mb-2">Tips for Better Support</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about what you were trying to accomplish</li>
              <li>• Include any error messages exactly as they appeared</li>
              <li>• Mention your browser, device, or software version if relevant</li>
              <li>• Attach screenshots or links to help explain the issue</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TicketForm;