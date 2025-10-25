import { useState, useEffect } from 'react';
import { 
  getActiveNotes, 
  getArchivedNotes, 
  getNote, 
  addNote, 
  deleteNote, 
  archiveNote, 
  unarchiveNote 
} from '../utils/api';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getActiveNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (title, body) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newNote = await addNote({ title, body });
      setNotes(prevNotes => [newNote, ...prevNotes]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeNote = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const archiveNoteById = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await archiveNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    createNote,
    removeNote,
    archiveNoteById,
  };
};

export const useArchivedNotes = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArchivedNotes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getArchivedNotes();
      setArchivedNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const unarchiveNoteById = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await unarchiveNote(id);
      setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeArchivedNote = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteNote(id);
      setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  return {
    archivedNotes,
    isLoading,
    error,
    fetchArchivedNotes,
    unarchiveNoteById,
    removeArchivedNote,
  };
};

export const useNoteDetail = (id) => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNote = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getNote(id);
      setNote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  return {
    note,
    isLoading,
    error,
    refetch: fetchNote,
  };
};
