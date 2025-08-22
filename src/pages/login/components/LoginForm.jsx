import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading = false, error = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const mockCredentials = {
    admin: { email: 'admin@smarthelpdesk.com', password: 'Admin@123', role: 'Administrator' },
    agent: { email: 'agent@smarthelpdesk.com', password: 'Agent@123', role: 'Support Agent' },
    user: { email: 'user@smarthelpdesk.com', password: 'User@123', role: 'End User' }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check mock credentials
    const matchedUser = Object.values(mockCredentials)?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (!matchedUser) {
      setValidationErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
      return;
    }

    // Simulate API call
    if (onSubmit) {
      await onSubmit(formData, matchedUser);
    } else {
      // Default navigation based on role
      localStorage.setItem('user', JSON.stringify(matchedUser));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const handleCreateAccount = () => {
    // In a real app, this would navigate to registration page
    alert('Registration functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {(error || validationErrors?.general) && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-error font-medium text-sm">Authentication Failed</p>
              <p className="text-error text-sm mt-1">
                {error || validationErrors?.general}
              </p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={validationErrors?.email}
          required
          disabled={loading}
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={validationErrors?.password}
            required
            disabled={loading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            disabled={loading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={loading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
          className="mt-8"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Create Account Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              disabled={loading}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;