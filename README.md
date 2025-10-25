# Personal Notes Application

A comprehensive personal notes application built with React that meets all the specified criteria for the Dicoding SPA-API course.

## Features

### ✅ Kriteria Utama (Main Criteria)

1. **RESTful API Integration**
   - Uses https://notes-api.dicoding.dev/v1 as data source
   - Complete API integration for all note operations
   - Proper error handling and loading states

2. **User Registration and Authentication**
   - Registration page with name, email, password, and confirm password
   - Login page with email and password
   - Access token stored in localStorage
   - User authentication state management
   - Logout functionality

3. **Protected Note Features**
   - All note features require authentication
   - Users can only access their own notes
   - Automatic redirect to login for unauthenticated users

4. **Theme Switching**
   - Dark/Light theme toggle
   - Implemented using React Context
   - Theme preference persisted in localStorage

5. **Custom Hooks Implementation**
   - `useLogin` and `useRegister` hooks for authentication
   - `useNotes`, `useArchivedNotes`, and `useNoteDetail` hooks for note management
   - Proper state management and error handling

6. **Previous Submission Criteria**
   - Multiple pages (Home, Login, Register, Notes, Detail, Add, Archived)
   - Complete CRUD operations for notes
   - Note listing and detail views
   - Add and delete functionality

### ✅ Kriteria Opsional (Optional Criteria)

1. **Loading Indicators**
   - Loading spinners for all API operations
   - User-friendly loading states
   - Non-intrusive loading experience

2. **Language Switching**
   - Indonesian/English language toggle
   - Implemented using React Context
   - Language preference persisted in localStorage
   - Complete translation coverage

## Technical Implementation

### Project Structure
```
src/
├── components/          # React components
├── contexts/           # React Context providers
├── hooks/              # Custom hooks
├── styles/            # CSS styles
└── utils/              # API utilities
```

### Key Technologies
- **React 18** with functional components and hooks
- **React Router DOM** for navigation
- **React Context** for state management
- **Custom Hooks** for reusable logic
- **CSS Variables** for theme switching
- **Local Storage** for persistence

### API Integration
- Complete integration with Dicoding Notes API
- Proper authentication handling
- Error handling and loading states
- Token management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Registration**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Notes Management**: 
   - View all active notes
   - Add new notes
   - View note details
   - Archive/unarchive notes
   - Delete notes
4. **Theme**: Toggle between light and dark themes
5. **Language**: Switch between Indonesian and English

## Features Overview

- 🔐 **Authentication**: Secure login and registration
- 📝 **Notes Management**: Full CRUD operations
- 🎨 **Theme Switching**: Light/Dark mode
- 🌐 **Internationalization**: Indonesian/English support
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Loading States**: Smooth user experience
- 🔒 **Route Protection**: Secure access to features

## API Endpoints Used

- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /notes` - Get active notes
- `GET /notes/archived` - Get archived notes
- `GET /notes/:id` - Get note detail
- `POST /notes` - Create new note
- `POST /notes/:id/archive` - Archive note
- `POST /notes/:id/unarchive` - Unarchive note
- `DELETE /notes/:id` - Delete note

This application demonstrates mastery of React concepts including hooks, context, routing, and API integration while providing a complete user experience with modern UI/UX practices.
