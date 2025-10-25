import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            📝 {t('notes')}
          </Link>
          
          <nav className="nav">
            {isAuthenticated ? (
              <>
                <ul className="nav-links">
                  <li>
                    <Link to="/">{t('home')}</Link>
                  </li>
                  <li>
                    <Link to="/archived">{t('archived')}</Link>
                  </li>
                  <li>
                    <Link to="/api-test">API Test</Link>
                  </li>
                </ul>
                
                <div className="nav-controls">
                  <button
                    onClick={toggleTheme}
                    className="btn btn-secondary btn-sm"
                    title={theme === 'light' ? t('darkTheme') : t('lightTheme')}
                  >
                    {theme === 'light' ? '🌙' : '☀️'}
                  </button>
                  
                  <button
                    onClick={toggleLanguage}
                    className="btn btn-secondary btn-sm"
                    title={t('language')}
                  >
                    {language === 'id' ? '🇮🇩' : '🇺🇸'}
                  </button>
                  
                  <span className="text-muted">
                    👤 {user?.name}
                  </span>
                  
                  <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {user?.email}
                  </span>
                  
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm"
                  >
                    {t('logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="nav-controls">
                <Link to="/api-test" className="btn btn-secondary btn-sm">
                  API Test
                </Link>
                
                <button
                  onClick={toggleTheme}
                  className="btn btn-secondary btn-sm"
                  title={theme === 'light' ? t('darkTheme') : t('lightTheme')}
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="btn btn-secondary btn-sm"
                  title={t('language')}
                >
                  {language === 'id' ? '🇮🇩' : '🇺🇸'}
                </button>
                
                <Link to="/login" className="btn btn-primary btn-sm">
                  {t('login')}
                </Link>
                
                <Link to="/register" className="btn btn-secondary btn-sm">
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
