import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">{t('loginTitle')}</h2>
            {successMessage && (
              <div style={{ 
                backgroundColor: 'var(--success-color)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}>
                ✅ {successMessage}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  {t('loading')}
                </>
              ) : (
                t('loginButton')
              )}
            </button>
          </form>
          
          <div className="text-center mt-3">
            <p className="text-muted">
              {t('language') === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
              <Link to="/register" className="btn btn-secondary btn-sm">
                {t('register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
