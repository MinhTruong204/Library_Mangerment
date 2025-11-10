import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Page = 'dashboard' | 'catalog' | 'borrowed' | 'profile';

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

interface BookCatalogProps {
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onViewBook: (bookId: string) => void;
  borrowedBookIds: string[];
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '978-0525559474',
    category: 'Fiction',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1599185186578-0ba91c2a15c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwbm92ZWx8ZW58MXx8fHwxNzYyNzgzNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A dazzling novel about all the choices that go into a life well lived.',
    publishedYear: 2020
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    category: 'Self-Help',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeXxlbnwxfHx8fDE3NjI3NjY2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An easy and proven way to build good habits and break bad ones.',
    publishedYear: 2018
  },
  {
    id: '3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    category: 'History',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1472173148041-00294f0814a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3xlbnwxfHx8fDE3NjI3MTE4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A brief history of humankind from the Stone Age to modern times.',
    publishedYear: 2011
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '978-0593135204',
    category: 'Science Fiction',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1732304722020-be33345c00c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9va3xlbnwxfHx8fDE3NjI3NDQwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A lone astronaut must save Earth from disaster in this gripping sci-fi adventure.',
    publishedYear: 2021
  },
  {
    id: '5',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    isbn: '978-1250301697',
    category: 'Mystery',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1523712900580-a5cc2e0112ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYyNzA4MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A gripping psychological thriller about a woman who shoots her husband.',
    publishedYear: 2019
  },
  {
    id: '6',
    title: 'Educated',
    author: 'Tara Westover',
    isbn: '978-0399590504',
    category: 'Biography',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1582739010387-0b49ea2adaf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rfGVufDF8fHx8MTc2Mjc4OTU0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A memoir about a young woman who leaves her survivalist family.',
    publishedYear: 2018
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '978-0441172719',
    category: 'Science Fiction',
    available: false,
    coverUrl: 'https://images.unsplash.com/photo-1732304722020-be33345c00c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9va3xlbnwxfHx8fDE3NjI3NDQwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A science fiction masterpiece set on the desert planet Arrakis.',
    publishedYear: 1965
  },
  {
    id: '8',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    category: 'Fiction',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1599185186578-0ba91c2a15c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwbm92ZWx8ZW58MXx8fHwxNzYyNzgzNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A dystopian social science fiction novel and cautionary tale.',
    publishedYear: 1949
  }
];

export function BookCatalog({ user, onNavigate, onLogout, onViewBook, borrowedBookIds }: BookCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockBooks.map(book => book.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="catalog"
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Book Catalog</h1>
          <p className="text-gray-600">Browse our collection of {mockBooks.length} books</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isBorrowed = borrowedBookIds.includes(book.id);
            const isAvailable = book.available && !isBorrowed;

            return (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] relative">
                  <ImageWithFallback
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">
                        {isBorrowed ? 'Borrowed' : 'Unavailable'}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-gray-900">{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{book.category}</Badge>
                    <span className="text-gray-500">{book.publishedYear}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => onViewBook(book.id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
