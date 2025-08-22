import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = ({ showLanguageSelector = true }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
    setIsLanguageOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center elevation-1">
              <Icon name="Headphones" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">Smart Helpdesk</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Support System</p>
            </div>
          </button>

          {/* Language Selector */}
          {showLanguageSelector && (
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3"
              >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">
                  {currentLang?.name}
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 z-50">
                    <div className="py-2">
                      {languages?.map((language) => (
                        <button
                          key={language?.code}
                          onClick={() => handleLanguageChange(language?.code)}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-200 flex items-center gap-3 ${
                            currentLanguage === language?.code ? 'bg-muted text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          <span className="text-lg">{language?.flag}</span>
                          <span>{language?.name}</span>
                          {currentLanguage === language?.code && (
                            <Icon name="Check" size={16} className="ml-auto text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageOpen(false)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;