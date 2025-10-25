import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  id: {
    // Navigation
    home: 'Beranda',
    notes: 'Catatan',
    archived: 'Arsip',
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    
    // Auth
    email: 'Email',
    password: 'Kata Sandi',
    confirmPassword: 'Konfirmasi Kata Sandi',
    name: 'Nama',
    loginTitle: 'Masuk ke Akun',
    registerTitle: 'Buat Akun Baru',
    loginButton: 'Masuk',
    registerButton: 'Daftar',
    
    // Notes
    addNote: 'Tambah Catatan',
    noteTitle: 'Judul Catatan',
    noteBody: 'Isi Catatan',
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    archive: 'Arsipkan',
    unarchive: 'Batalkan Arsip',
    edit: 'Edit',
    noNotes: 'Tidak ada catatan',
    noArchivedNotes: 'Tidak ada catatan terarsip',
    
    // Theme
    lightTheme: 'Tema Terang',
    darkTheme: 'Tema Gelap',
    
    // Language
    language: 'Bahasa',
    indonesian: 'Indonesia',
    english: 'English',
    
    // Loading
    loading: 'Memuat...',
    
    // Messages
    noteAdded: 'Catatan berhasil ditambahkan',
    noteDeleted: 'Catatan berhasil dihapus',
    noteArchived: 'Catatan berhasil diarsipkan',
    noteUnarchived: 'Catatan berhasil dibatalkan arsip',
    loginSuccess: 'Berhasil masuk',
    registerSuccess: 'Berhasil mendaftar',
    logoutSuccess: 'Berhasil keluar',
  },
  en: {
    // Navigation
    home: 'Home',
    notes: 'Notes',
    archived: 'Archived',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    loginTitle: 'Login to Account',
    registerTitle: 'Create New Account',
    loginButton: 'Login',
    registerButton: 'Register',
    
    // Notes
    addNote: 'Add Note',
    noteTitle: 'Note Title',
    noteBody: 'Note Body',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    archive: 'Archive',
    unarchive: 'Unarchive',
    edit: 'Edit',
    noNotes: 'No notes available',
    noArchivedNotes: 'No archived notes available',
    
    // Theme
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    
    // Language
    language: 'Language',
    indonesian: 'Indonesia',
    english: 'English',
    
    // Loading
    loading: 'Loading...',
    
    // Messages
    noteAdded: 'Note added successfully',
    noteDeleted: 'Note deleted successfully',
    noteArchived: 'Note archived successfully',
    noteUnarchived: 'Note unarchived successfully',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    logoutSuccess: 'Logout successful',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'id' ? 'en' : 'id');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isIndonesian: language === 'id',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
