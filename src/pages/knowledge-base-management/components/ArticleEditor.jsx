import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ArticleEditor = ({ 
  article = null,
  categories = [],
  availableTags = [],
  onSave = () => {},
  onPublish = () => {},
  onDelete = () => {},
  onPreview = () => {},
  isPreviewMode = false,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tags: [],
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    slug: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article?.title || '',
        content: article?.content || '',
        categoryId: article?.categoryId || '',
        tags: article?.tags || [],
        status: article?.status || 'draft',
        metaTitle: article?.metaTitle || '',
        metaDescription: article?.metaDescription || '',
        slug: article?.slug || ''
      });
      setIsEditing(true);
    } else {
      setFormData({
        title: '',
        content: '',
        categoryId: '',
        tags: [],
        status: 'draft',
        metaTitle: '',
        metaDescription: '',
        slug: ''
      });
      setIsEditing(false);
    }
  }, [article]);

  useEffect(() => {
    const words = formData?.content?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    setWordCount(words?.length);
  }, [formData?.content]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagAdd = (tag) => {
    if (!formData?.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handlePublish = () => {
    const publishData = { ...formData, status: 'published' };
    onPublish(publishData);
  };

  const insertTemplate = (templateType) => {
    let template = '';
    switch (templateType) {
      case 'troubleshooting':
        template = `## Problem Description\n\n[Describe the issue]\n\n## Solution Steps\n\n1. Step one\n2. Step two\n3. Step three\n\n## Additional Resources\n\n- [Link to related article]\n- [Link to documentation]`;
        break;
      case 'howto':
        template = `## Overview\n\n[Brief description of what this guide covers]\n\n## Prerequisites\n\n- Requirement 1\n- Requirement 2\n\n## Step-by-Step Instructions\n\n### Step 1: [Title]\n\n[Instructions]\n\n### Step 2: [Title]\n\n[Instructions]\n\n## Conclusion\n\n[Summary and next steps]`;
        break;
      case 'faq':
        template = `## Frequently Asked Questions\n\n### Q: [Question 1]\n\nA: [Answer 1]\n\n### Q: [Question 2]\n\nA: [Answer 2]\n\n### Q: [Question 3]\n\nA: [Answer 3]`;
        break;
      default:
        template = '';
    }
    
    handleInputChange('content', formData?.content + '\n\n' + template);
  };

  const categoryOptions = categories?.map(cat => ({
    value: cat?.id,
    label: cat?.name
  }));

  const tagOptions = availableTags?.map(tag => ({
    value: tag,
    label: tag
  }));

  if (!article && !isEditing) {
    return (
      <div className={`h-full bg-background flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Article Selected</h3>
          <p className="text-muted-foreground mb-4">Select an article from the tree or create a new one</p>
          <Button onClick={() => setIsEditing(true)} iconName="Plus">
            Create New Article
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-background flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            {isEditing && !article ? 'New Article' : article?.title || 'Edit Article'}
          </h2>
          {article && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              article?.status === 'published' ? 'bg-success/10 text-success' :
              article?.status === 'draft'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
            }`}>
              {article?.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMetadata(!showMetadata)}
            iconName="Settings"
          >
            Metadata
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreview}
            iconName={isPreviewMode ? "Edit" : "Eye"}
          >
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            iconName="Save"
          >
            Save Draft
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handlePublish}
            iconName="Upload"
          >
            Publish
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isPreviewMode ? (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-4">{formData?.title}</h1>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {formData?.content}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Article Form */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Input
                    label="Article Title"
                    type="text"
                    placeholder="Enter article title"
                    value={formData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    required
                  />
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={formData?.categoryId}
                    onChange={(value) => handleInputChange('categoryId', value)}
                    placeholder="Select category"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-secondary/20 text-secondary px-2 py-1 rounded-md text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-destructive"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Select
                    options={tagOptions}
                    value=""
                    onChange={(value) => handleTagAdd(value)}
                    placeholder="Add tags"
                    searchable
                  />
                </div>

                {/* Templates */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Insert Template
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => insertTemplate('troubleshooting')}
                      iconName="Wrench"
                    >
                      Troubleshooting
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => insertTemplate('howto')}
                      iconName="BookOpen"
                    >
                      How-to Guide
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => insertTemplate('faq')}
                      iconName="HelpCircle"
                    >
                      FAQ
                    </Button>
                  </div>
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      Content
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {wordCount} words
                    </span>
                  </div>
                  <textarea
                    value={formData?.content}
                    onChange={(e) => handleInputChange('content', e?.target?.value)}
                    placeholder="Write your article content here... (Markdown supported)"
                    className="w-full h-96 p-4 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                  />
                </div>

                {/* Metadata Section */}
                {showMetadata && (
                  <div className="border border-border rounded-lg p-4 space-y-4">
                    <h3 className="text-lg font-medium text-foreground">SEO Metadata</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Input
                        label="Meta Title"
                        type="text"
                        placeholder="SEO title"
                        value={formData?.metaTitle}
                        onChange={(e) => handleInputChange('metaTitle', e?.target?.value)}
                      />
                      <Input
                        label="URL Slug"
                        type="text"
                        placeholder="article-url-slug"
                        value={formData?.slug}
                        onChange={(e) => handleInputChange('slug', e?.target?.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData?.metaDescription}
                        onChange={(e) => handleInputChange('metaDescription', e?.target?.value)}
                        placeholder="Brief description for search engines"
                        className="w-full h-20 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        maxLength={160}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formData?.metaDescription?.length}/160 characters
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;