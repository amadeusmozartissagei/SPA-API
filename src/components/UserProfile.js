import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserProfile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">👤 {t('language') === 'id' ? 'Profil Pengguna' : 'User Profile'}</h3>
      </div>
      
      <div className="card-body">
        <div style={{ marginBottom: '1rem' }}>
          <strong>{t('language') === 'id' ? 'Nama:' : 'Name:'}</strong>
          <p style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: '500' }}>
            {user.name}
          </p>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>{t('email')}:</strong>
          <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>
            {user.email}
          </p>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>{t('language') === 'id' ? 'ID Pengguna:' : 'User ID:'}</strong>
          <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            {user.id}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'var(--bg-tertiary)', 
          padding: '1rem', 
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {t('language') === 'id' 
              ? '✅ Anda telah berhasil masuk ke sistem' 
              : '✅ You are successfully logged in to the system'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
