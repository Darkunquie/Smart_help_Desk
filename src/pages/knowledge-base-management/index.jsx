import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';

import Button from '../../components/ui/Button';
import ArticleTree from './components/ArticleTree';
import ArticleEditor from './components/ArticleEditor';
import SearchAndFilters from './components/SearchAndFilters';
import VersionHistory from './components/VersionHistory';
import CollaborationPanel from './components/CollaborationPanel';

const KnowledgeBaseManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  // Mock data
  const mockCategories = [
    {
      id: 'general',
      name: 'General',
      icon: 'HelpCircle',
      description: 'General help and information'
    },
    {
      id: 'technical',
      name: 'Technical',
      icon: 'Settings',
      description: 'Technical documentation and guides'
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: 'CreditCard',
      description: 'Billing and payment related articles'
    },
    {
      id: 'account',
      name: 'Account',
      icon: 'User',
      description: 'Account management and settings'
    }
  ];

  const mockArticles = [
    {
      id: 1,
      title: 'How to Reset Your Password',
      content: `# Password Reset Guide\n\nThis comprehensive guide will walk you through the process of resetting your password safely and securely.\n\n## Prerequisites\n\n- Access to your registered email address\n- Valid account credentials\n\n## Step-by-Step Instructions\n\n### Step 1: Navigate to Login Page\n\nGo to the login page and click on the "Forgot Password" link below the login form.\n\n### Step 2: Enter Your Email\n\nEnter the email address associated with your account. Make sure it's the same email you used during registration.\n\n### Step 3: Check Your Email\n\nCheck your email inbox for a password reset link. If you don't see it in your inbox, check your spam folder.\n\n### Step 4: Create New Password\n\nClick the reset link and create a new strong password that meets our security requirements:\n\n- At least 8 characters long\n- Contains uppercase and lowercase letters\n- Includes at least one number\n- Contains at least one special character\n\n## Troubleshooting\n\nIf you're having trouble with password reset:\n\n1. Ensure you're using the correct email address\n2. Check spam/junk folders\n3. Try clearing your browser cache\n4. Contact support if the issue persists\n\n## Security Tips\n\n- Use a unique password for your account\n- Enable two-factor authentication\n- Don't share your password with others\n- Update your password regularly`,categoryId: 'account',
      tags: ['password', 'security', 'account'],
      status: 'published',author: 'Sarah Johnson',createdAt: '2025-01-15 10:30:00',updatedAt: '2025-01-21 09:15:00',metaTitle: 'Password Reset Guide - Step by Step Instructions',metaDescription: 'Learn how to reset your password quickly and securely with our comprehensive step-by-step guide.',slug: 'how-to-reset-password',
      views: 1247,
      helpful: 89,
      notHelpful: 12
    },
    {
      id: 2,
      title: 'API Integration Best Practices',
      content: `# API Integration Best Practices\n\nThis guide covers the essential best practices for integrating with our API effectively and securely.\n\n## Authentication\n\nAll API requests must be authenticated using API keys or OAuth tokens.\n\n### API Key Authentication\n\n\`\`\`javascript\nconst response = await fetch('https://api.example.com/data', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  }\n});\n\`\`\`\n\n## Rate Limiting\n\nOur API implements rate limiting to ensure fair usage:\n\n- 1000 requests per hour for free tier\n- 10000 requests per hour for premium tier\n- 100000 requests per hour for enterprise tier\n\n## Error Handling\n\nAlways implement proper error handling in your integration:\n\n\`\`\`javascript\ntry {\n  const response = await fetch('/api/endpoint');\n  if (!response.ok) {\n    throw new Error(\`HTTP error! status: \${response.status}\`);\n  }\n  const data = await response.json();\n  return data;\n} catch (error) {\n  console.error('API request failed:', error);\n  // Handle error appropriately\n}\n\`\`\`\n\n## Best Practices\n\n1. **Use HTTPS**: Always use HTTPS for API calls\n2. **Validate Input**: Validate all input data before sending\n3. **Handle Timeouts**: Implement proper timeout handling\n4. **Cache Responses**: Cache responses when appropriate\n5. **Monitor Usage**: Monitor your API usage and performance`,
      categoryId: 'technical',
      tags: ['api', 'integration', 'development', 'best-practices'],
      status: 'published',author: 'Mike Chen',createdAt: '2025-01-18 14:20:00',updatedAt: '2025-01-20 16:45:00',metaTitle: 'API Integration Best Practices - Developer Guide',metaDescription: 'Learn the best practices for integrating with our API, including authentication, rate limiting, and error handling.',slug: 'api-integration-best-practices',
      views: 892,
      helpful: 156,
      notHelpful: 8
    },
    {
      id: 3,
      title: 'Billing FAQ',
      content: `# Billing Frequently Asked Questions\n\nFind answers to common billing and payment questions.\n\n## General Billing Questions\n\n### Q: When will I be charged?\n\nA: You will be charged on the same date each month based on when you first subscribed. For example, if you subscribed on the 15th, you'll be charged on the 15th of each month.\n\n### Q: What payment methods do you accept?\n\nA: We accept the following payment methods:\n- Credit cards (Visa, MasterCard, American Express)\n- Debit cards\n- PayPal\n- Bank transfers (for enterprise customers)\n\n### Q: Can I change my billing cycle?\n\nA: Yes, you can switch between monthly and annual billing cycles. Annual billing offers a 20% discount compared to monthly billing.\n\n## Refunds and Cancellations\n\n### Q: What is your refund policy?\n\nA: We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.\n\n### Q: How do I cancel my subscription?\n\nA: You can cancel your subscription at any time from your account settings. Your service will continue until the end of your current billing period.\n\n## Invoices and Receipts\n\n### Q: Where can I find my invoices?\n\nA: All invoices are available in your account dashboard under the "Billing" section. You can download PDF copies for your records.\n\n### Q: Can I get a receipt for my payment?\n\nA: Yes, receipts are automatically sent to your registered email address after each successful payment.`,
      categoryId: 'billing',
      tags: ['billing', 'faq', 'payment', 'refund'],
      status: 'published',author: 'Alex Rodriguez',createdAt: '2025-01-10 11:15:00',updatedAt: '2025-01-19 13:30:00',metaTitle: 'Billing FAQ - Common Questions and Answers',metaDescription: 'Get answers to frequently asked questions about billing, payments, refunds, and subscription management.',slug: 'billing-faq',
      views: 2156,
      helpful: 198,
      notHelpful: 23
    },
    {
      id: 4,
      title: 'Getting Started Guide',
      content: `# Getting Started with Smart Helpdesk\n\nWelcome to Smart Helpdesk! This guide will help you get up and running quickly.\n\n## Account Setup\n\n### Step 1: Create Your Account\n\n1. Visit our signup page\n2. Enter your email address and create a password\n3. Verify your email address\n4. Complete your profile information\n\n### Step 2: Configure Your Settings\n\n1. Set your timezone and language preferences\n2. Configure notification settings\n3. Set up your profile picture and bio\n\n## First Steps\n\n### Creating Your First Ticket\n\n1. Click the "Create Ticket" button\n2. Fill in the ticket details\n3. Select the appropriate category\n4. Submit your ticket\n\n### Navigating the Dashboard\n\nThe dashboard provides an overview of:\n- Recent tickets\n- System status\n- Quick actions\n- Performance metrics\n\n## Tips for Success\n\n- **Be Descriptive**: Provide detailed descriptions in your tickets\n- **Use Categories**: Properly categorize your tickets for faster resolution\n- **Check Status**: Regularly check ticket status for updates\n- **Provide Feedback**: Rate resolved tickets to help improve our service\n\n## Need Help?\n\nIf you need assistance:\n- Check our knowledge base\n- Contact our support team\n- Join our community forum\n- Schedule a demo call`,
      categoryId: 'general',
      tags: ['getting-started', 'guide', 'setup', 'tutorial'],
      status: 'draft',author: 'Sarah Johnson',createdAt: '2025-01-21 08:00:00',updatedAt: '2025-01-21 10:30:00',metaTitle: 'Getting Started Guide - Smart Helpdesk',metaDescription: 'Learn how to get started with Smart Helpdesk, from account setup to creating your first ticket.',slug: 'getting-started-guide',
      views: 0,
      helpful: 0,
      notHelpful: 0
    }
  ];

  const mockAvailableTags = [
    'password', 'security', 'account', 'api', 'integration', 'development',
    'best-practices', 'billing', 'faq', 'payment', 'refund', 'getting-started',
    'guide', 'setup', 'tutorial', 'troubleshooting', 'authentication'
  ];

  const currentUser = {
    id: 1,
    name: 'John Doe',
    role: 'Support Agent',
    avatar: null
  };

  // Event handlers
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    setIsPreviewMode(false);
  };

  const handleArticleSave = (articleData) => {
    console.log('Saving article:', articleData);
    // In a real app, this would make an API call
  };

  const handleArticlePublish = (articleData) => {
    console.log('Publishing article:', articleData);
    // In a real app, this would make an API call
  };

  const handleArticleDelete = (articleId) => {
    console.log('Deleting article:', articleId);
    // In a real app, this would make an API call
  };

  const handlePreviewToggle = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDragStart = (article) => {
    console.log('Drag started:', article);
  };

  const handleDrop = (article, targetCategory) => {
    console.log('Article dropped:', article, 'to category:', targetCategory);
    // In a real app, this would update the article's category
  };

  const handleBulkAction = (action, articles) => {
    console.log('Bulk action:', action, 'on articles:', articles);
    // In a real app, this would perform the bulk action
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
    console.log('Version selected:', version);
  };

  const handleVersionRestore = (version) => {
    console.log('Restoring version:', version);
    // In a real app, this would restore the selected version
  };

  const handleVersionCompare = (version1, version2) => {
    console.log('Comparing versions:', version1, version2);
    // In a real app, this would show a diff view
  };

  const handleCommentAdd = (comment) => {
    console.log('Adding comment:', comment);
    // In a real app, this would add the comment to the article
  };

  const handleCommentReply = (commentId, reply) => {
    console.log('Replying to comment:', commentId, reply);
    // In a real app, this would add the reply to the comment
  };

  const handleCommentResolve = (commentId) => {
    console.log('Resolving comment:', commentId);
    // In a real app, this would mark the comment as resolved
  };

  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsPreviewMode(false);
  };

  // Calculate layout classes
  const sidebarWidth = sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64';
  const rightPanelVisible = showVersionHistory || showCollaboration;
  const mainContentWidth = rightPanelVisible ? 'lg:mr-80' : '';

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
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={currentUser?.role}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarWidth} ${mainContentWidth}`}>
        {/* Breadcrumbs */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <NavigationBreadcrumbs />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                iconName="History"
              >
                History
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollaboration(!showCollaboration)}
                iconName="Users"
              >
                Collaborate
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateNew}
                iconName="Plus"
              >
                New Article
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          availableTags={mockAvailableTags}
          categories={mockCategories}
          onBulkAction={handleBulkAction}
          selectedArticles={selectedArticles}
        />

        {/* Content Layout */}
        <div className="flex h-[calc(100vh-200px)]">
          {/* Article Tree - Left Panel */}
          <div className="w-80 flex-shrink-0">
            <ArticleTree
              articles={mockArticles}
              categories={mockCategories}
              selectedArticle={selectedArticle}
              onArticleSelect={handleArticleSelect}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              statusFilter={statusFilter}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          </div>

          {/* Article Editor - Main Panel */}
          <div className="flex-1">
            <ArticleEditor
              article={selectedArticle}
              categories={mockCategories}
              availableTags={mockAvailableTags}
              onSave={handleArticleSave}
              onPublish={handleArticlePublish}
              onDelete={handleArticleDelete}
              onPreview={handlePreviewToggle}
              isPreviewMode={isPreviewMode}
            />
          </div>

          {/* Right Panel - Version History or Collaboration */}
          {rightPanelVisible && (
            <div className="w-80 flex-shrink-0">
              {showVersionHistory && (
                <VersionHistory
                  article={selectedArticle}
                  versions={[]}
                  onVersionSelect={handleVersionSelect}
                  onVersionRestore={handleVersionRestore}
                  onVersionCompare={handleVersionCompare}
                  selectedVersion={selectedVersion}
                />
              )}
              {showCollaboration && (
                <CollaborationPanel
                  article={selectedArticle}
                  activeUsers={[]}
                  comments={[]}
                  onCommentAdd={handleCommentAdd}
                  onCommentReply={handleCommentReply}
                  onCommentResolve={handleCommentResolve}
                  currentUser={currentUser}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KnowledgeBaseManagement;