import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'SOC 2 Compliant',
      description: 'Enterprise security'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Ready',
      description: 'Data protection'
    }
  ];

  const trustBadges = [
    {
      name: 'ISO 27001',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop&crop=center',
      alt: 'ISO 27001 Certified'
    },
    {
      name: 'SOC 2',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=40&fit=crop&crop=center',
      alt: 'SOC 2 Type II'
    },
    {
      name: 'GDPR',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=40&fit=crop&crop=center',
      alt: 'GDPR Compliant'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Security Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Badges */}
      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground text-center mb-4">
          Trusted by 10,000+ businesses worldwide
        </p>
        <div className="flex items-center justify-center gap-6">
          {trustBadges?.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-16 h-8 bg-card border border-border rounded opacity-60 hover:opacity-100 transition-opacity duration-200"
              title={badge?.alt}
            >
              <img
                src={badge?.logo}
                alt={badge?.alt}
                className="max-w-full max-h-full object-contain filter grayscale"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-xs font-medium text-muted-foreground hidden">
                {badge?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Trust Signals */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Your data is protected with bank-level security</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} className="text-primary" />
          <span>99.9% uptime guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;