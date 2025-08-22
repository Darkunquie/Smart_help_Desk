import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import LoginBackground from './components/LoginBackground';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (formData, userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store user data
      localStorage.setItem('user', JSON.stringify(userCredentials));
      localStorage.setItem('isAuthenticated', 'true');
      
      if (formData?.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Navigate based on user role
      switch (userCredentials?.role) {
        case 'Administrator': navigate('/dashboard');
          break;
        case 'Support Agent': navigate('/ticket-management');
          break;
        case 'End User': navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Smart Helpdesk</title>
        <meta name="description" content="Sign in to Smart Helpdesk - AI-powered customer support system for enterprise teams" />
        <meta name="keywords" content="login, helpdesk, customer support, AI, enterprise" />
      </Helmet>
      <LoginBackground>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <LoginHeader showLanguageSelector={true} />

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to your Smart Helpdesk account to access AI-powered customer support tools
                </p>
              </div>

              {/* Login Form Card */}
              <div className="bg-card border border-border rounded-xl p-8 elevation-2">
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />
              </div>

              {/* Demo Credentials Info */}
              <div className="mt-6 p-4 bg-muted/30 border border-border/50 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials:</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Admin:</strong> admin@smarthelpdesk.com / Admin@123</p>
                  <p><strong>Agent:</strong> agent@smarthelpdesk.com / Agent@123</p>
                  <p><strong>User:</strong> user@smarthelpdesk.com / User@123</p>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-8">
                <SecurityBadges />
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card/50">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} Smart Helpdesk. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Terms of Service
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </LoginBackground>
    </>
  );
};

export default LoginPage;