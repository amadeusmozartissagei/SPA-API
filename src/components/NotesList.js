import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useLanguage } from '../contexts/LanguageContext';
import NoteCard from './NoteCard';

const NotesList = () => {
  const { notes, isLoading, error, removeNote, archiveNoteById } = useNotes();
  const { t } = useLanguage();

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

  if (notes.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-text">{t('noNotes')}</h3>
          <p className="empty-state-subtext">
            {t('language') === 'id' 
              ? 'Mulai dengan menambahkan catatan pertama Anda' 
              : 'Start by adding your first note'
            }
          </p>
          <Link to="/add" className="btn btn-primary">
            {t('addNote')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('notes')}</h2>
        <Link to="/add" className="btn btn-primary">
          {t('addNote')}
        </Link>
      </div>
      
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={removeNote}
            onArchive={archiveNoteById}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
