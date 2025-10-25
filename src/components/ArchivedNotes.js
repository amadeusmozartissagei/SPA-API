import React from 'react';
import { useArchivedNotes } from '../hooks/useNotes';
import { useLanguage } from '../contexts/LanguageContext';

const ArchivedNotes = () => {
  const { archivedNotes, isLoading, error, unarchiveNoteById, removeArchivedNote } = useArchivedNotes();
  const { t } = useLanguage();

  const handleUnarchive = async (id) => {
    await unarchiveNoteById(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('language') === 'id' ? 'Yakin ingin menghapus catatan ini?' : 'Are you sure you want to delete this note?')) {
      await removeArchivedNote(id);
    }
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
        </div>
      </div>
    );
  }

  if (archivedNotes.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h3 className="empty-state-text">{t('noArchivedNotes')}</h3>
          <p className="empty-state-subtext">
            {t('language') === 'id' 
              ? 'Catatan yang diarsipkan akan muncul di sini' 
              : 'Archived notes will appear here'
            }
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container">
      <h2 className="mb-4">{t('archived')}</h2>
      
      <div className="notes-grid">
        {archivedNotes.map((note) => (
          <div key={note.id} className="note-card">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-body">{note.body}</p>
            <p className="note-date">{formatDate(note.createdAt)}</p>
            
            <div className="note-actions">
              <button
                onClick={() => handleUnarchive(note.id)}
                className="btn btn-success btn-sm"
              >
                {t('unarchive')}
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="btn btn-danger btn-sm"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedNotes;
