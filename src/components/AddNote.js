import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useLanguage } from '../contexts/LanguageContext';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { createNote, isLoading } = useNotes();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createNote(title, body);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">{t('addNote')}</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                {t('noteTitle')}
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="body">
                {t('noteBody')}
              </label>
              <textarea
                id="body"
                className="form-input form-textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    {t('loading')}
                  </>
                ) : (
                  t('save')
                )}
              </button>
              
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
