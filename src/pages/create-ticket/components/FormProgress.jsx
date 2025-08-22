import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ 
  currentStep = 1,
  totalSteps = 3,
  steps = [],
  className = ''
}) => {
  const defaultSteps = [
    { id: 1, title: 'Basic Information', description: 'Title and description' },
    { id: 2, title: 'Details & Category', description: 'Priority and categorization' },
    { id: 3, title: 'Review & Submit', description: 'Final review' }
  ];

  const activeSteps = steps?.length > 0 ? steps : defaultSteps;

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (stepId, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'active') return 'Circle';
    return 'Circle';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'active':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between">
        {activeSteps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            {/* Step */}
            <div className="flex flex-col items-center text-center min-w-0 flex-1">
              {/* Step Icon */}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${getStepClasses(getStepStatus(step?.id))}`}>
                {getStepStatus(step?.id) === 'completed' ? (
                  <Icon name="Check" size={18} />
                ) : (
                  <span className="text-sm font-medium">{step?.id}</span>
                )}
              </div>
              
              {/* Step Content */}
              <div className="min-w-0">
                <p className={`text-sm font-medium ${
                  getStepStatus(step?.id) === 'active' ? 'text-foreground' : 
                  getStepStatus(step?.id) === 'completed' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step?.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < activeSteps?.length - 1 && (
              <div className="flex-1 mx-4 hidden sm:block">
                <div className={`h-0.5 ${
                  getStepStatus(step?.id) === 'completed' ? 'bg-success' : 'bg-border'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Progress Bar (Mobile) */}
      <div className="mt-4 sm:hidden">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-smooth"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProgress;