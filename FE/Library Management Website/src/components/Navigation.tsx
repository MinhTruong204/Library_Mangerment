import React from 'react';
import { Button } from './ui/button';
import { BookOpen, Home, Library, BookMarked, User, LogOut } from 'lucide-react';

type Page = 'dashboard' | 'catalog' | 'borrowed' | 'profile';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userName: string;
}

export function Navigation({ currentPage, onNavigate, onLogout, userName }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-indigo-900">LibraryHub</span>
            </div>

            <div className="hidden md:flex space-x-4">
              <Button
                variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onNavigate('dashboard')}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={currentPage === 'catalog' ? 'default' : 'ghost'}
                onClick={() => onNavigate('catalog')}
              >
                <Library className="w-4 h-4 mr-2" />
                Catalog
              </Button>
              <Button
                variant={currentPage === 'borrowed' ? 'default' : 'ghost'}
                onClick={() => onNavigate('borrowed')}
              >
                <BookMarked className="w-4 h-4 mr-2" />
                My Books
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              onClick={() => onNavigate('profile')}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">{userName}</span>
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
