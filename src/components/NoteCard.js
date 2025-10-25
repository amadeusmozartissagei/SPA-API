import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NoteCard = ({ note, onDelete, onArchive }) => {
  const { t } = useLanguage();

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

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(t('language') === 'id' ? 'Yakin ingin menghapus catatan ini?' : 'Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const handleArchive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(note.id);
  };

  return (
    <Link to={`/notes/${note.id}`} className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-body">{note.body}</p>
      <p className="note-date">{formatDate(note.createdAt)}</p>
      
      <div className="note-actions">
        <button
          onClick={handleArchive}
          className="btn btn-success btn-sm"
        >
          {t('archive')}
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
        >
          {t('delete')}
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;
