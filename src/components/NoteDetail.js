import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoteDetail } from '../hooks/useNotes';
import { useLanguage } from '../contexts/LanguageContext';

const NoteDetail = () => {
  const { id } = useParams();
  const { note, isLoading, error } = useNoteDetail(id);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h2>{t('language') === 'id' ? 'Terjadi Kesalahan' : 'Error Occurred'}</h2>
          <p className="text-muted">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            {t('language') === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h2>{t('language') === 'id' ? 'Catatan Tidak Ditemukan' : 'Note Not Found'}</h2>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            {t('language') === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="card-title">{note.title}</h1>
              <button
                onClick={() => navigate('/')}
                className="btn btn-secondary btn-sm"
              >
                {t('language') === 'id' ? 'Kembali' : 'Back'}
              </button>
            </div>
            <p className="text-muted">{formatDate(note.createdAt)}</p>
          </div>
          
          <div className="card-body">
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {note.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
