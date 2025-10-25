import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import AddNote from './components/AddNote';
import ArchivedNotes from './components/ArchivedNotes';
import APITest from './components/APITest';
import './styles/App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <div className="app">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  <Route path="/notes" element={
                    <ProtectedRoute>
                      <NotesList />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/notes/:id" element={
                    <ProtectedRoute>
                      <NoteDetail />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/add" element={
                    <ProtectedRoute>
                      <AddNote />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/archived" element={
                    <ProtectedRoute>
                      <ArchivedNotes />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/api-test" element={<APITest />} />
                  
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
