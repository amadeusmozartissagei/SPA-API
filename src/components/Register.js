import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, isLoading, error } = useRegister();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError(t('language') === 'id' ? 'Kata sandi tidak cocok' : 'Passwords do not match');
      return;
    }
    
    setPasswordError('');
    const result = await register(name, email, password);
    if (result.success) {
      // Registration successful, redirect to login
      navigate('/login', { 
        state: { 
          message: t('language') === 'id' 
            ? 'Registrasi berhasil! Silakan masuk dengan akun Anda.' 
            : 'Registration successful! Please login with your account.'
        } 
      });
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">{t('registerTitle')}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
            
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {(error || passwordError) && (
              <div className="form-error">
                {error || passwordError}
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
                t('registerButton')
              )}
            </button>
          </form>
          
          <div className="text-center mt-3">
            <p className="text-muted">
              {t('language') === 'id' ? 'Sudah punya akun?' : 'Already have an account?'}{' '}
              <Link to="/login" className="btn btn-secondary btn-sm">
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
