import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { Dashboard } from './components/Dashboard';
import { BookCatalog } from './components/BookCatalog';
import { BookDetails } from './components/BookDetails';
import { UserProfile } from './components/UserProfile';
import { BorrowedBooks } from './components/BorrowedBooks';

type Page = 'login' | 'register' | 'dashboard' | 'catalog' | 'bookDetails' | 'profile' | 'borrowed';

interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  coverUrl: string;
  description: string;
  publishedYear: number;
}

interface BorrowedBook extends Book {
  borrowedDate: string;
  dueDate: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would verify against backend
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      memberSince: '2024-01-15'
    };
    setCurrentUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration - in real app, this would create user in backend
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      memberSince: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setBorrowedBooks([]);
    setCurrentPage('login');
  };

  const handleBorrowBook = (book: Book) => {
    const borrowedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days borrowing period

    const borrowedBook: BorrowedBook = {
      ...book,
      borrowedDate: borrowedDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0]
    };

    setBorrowedBooks([...borrowedBooks, borrowedBook]);
  };

  const handleReturnBook = (bookId: string) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  const handleViewBookDetails = (bookId: string) => {
    setSelectedBookId(bookId);
    setCurrentPage('bookDetails');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <RegistrationPage
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser!}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            borrowedBooksCount={borrowedBooks.length}
          />
        );
      case 'catalog':
        return (
          <BookCatalog
            user={currentUser!}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            onViewBook={handleViewBookDetails}
            borrowedBookIds={borrowedBooks.map(b => b.id)}
          />
        );
      case 'bookDetails':
        return (
          <BookDetails
            bookId={selectedBookId!}
            user={currentUser!}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            onBorrowBook={handleBorrowBook}
            isBorrowed={borrowedBooks.some(b => b.id === selectedBookId)}
          />
        );
      case 'profile':
        return (
          <UserProfile
            user={currentUser!}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'borrowed':
        return (
          <BorrowedBooks
            user={currentUser!}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            borrowedBooks={borrowedBooks}
            onReturnBook={handleReturnBook}
            onViewBook={handleViewBookDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}
