import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h1>📝 {t('notes')}</h1>
          <p className="text-muted mb-4">
            {t('language') === 'id' 
              ? 'Aplikasi catatan pribadi Anda' 
              : 'Your personal notes application'
            }
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/login" className="btn btn-primary">
              {t('login')}
            </Link>
            <Link to="/register" className="btn btn-secondary">
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1>👋 {t('language') === 'id' ? 'Selamat datang' : 'Welcome'}, {user?.name}!</h1>
        <p className="text-muted mb-4">
          {t('language') === 'id' 
            ? 'Kelola catatan pribadi Anda dengan mudah' 
            : 'Manage your personal notes easily'
          }
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/notes" className="btn btn-primary btn-lg">
            📝 {t('notes')}
          </Link>
          <Link to="/archived" className="btn btn-secondary btn-lg">
            📁 {t('archived')}
          </Link>
          <Link to="/add" className="btn btn-success btn-lg">
            ➕ {t('addNote')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
