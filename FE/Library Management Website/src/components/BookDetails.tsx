import React from 'react';
import { Navigation } from './Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Calendar, BookOpen, Hash } from 'lucide-react';
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

interface BookDetailsProps {
  bookId: string;
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onBorrowBook: (book: Book) => void;
  isBorrowed: boolean;
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
    description: 'A dazzling novel about all the choices that go into a life well lived. Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.',
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
    description: 'An easy and proven way to build good habits and break bad ones. This book provides a practical framework for improving every day. James Clear reveals strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors.',
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
    description: 'A brief history of humankind from the Stone Age to modern times. Sapiens explores how Homo sapiens came to dominate the world through the power of imagination and cooperation. A fascinating journey through our history.',
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
    description: "A lone astronaut must save Earth from disaster in this gripping sci-fi adventure. Ryland Grace wakes up on a spaceship with no memory of why he's there. His crewmates are dead. He's millions of miles from home. And he might be humanity's last hope.",
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
    description: 'A gripping psychological thriller about a woman who shoots her husband and then never speaks another word. A criminal psychotherapist becomes obsessed with uncovering her motive.',
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
    description: 'A memoir about a young woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University. A remarkable story about the transformative power of education.',
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
    description: 'A science fiction masterpiece set on the desert planet Arrakis. The story of Paul Atreides, a brilliant young man born into a great destiny beyond his understanding.',
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
    description: 'A dystopian social science fiction novel and cautionary tale. Winston Smith works for the Ministry of Truth in London, chief city of Airstrip One.',
    publishedYear: 1949
  }
];

export function BookDetails({ bookId, user, onNavigate, onLogout, onBorrowBook, isBorrowed }: BookDetailsProps) {
  const book = mockBooks.find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation
          currentPage="catalog"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userName={user.name}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p>Book not found</p>
        </div>
      </div>
    );
  }

  const isAvailable = book.available && !isBorrowed;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="catalog"
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('catalog')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative">
                  <ImageWithFallback
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <Badge variant={isAvailable ? 'default' : 'secondary'}>
                      {isBorrowed ? 'You borrowed this' : isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  {isAvailable ? (
                    <Button
                      className="w-full"
                      onClick={() => onBorrowBook(book)}
                    >
                      Borrow This Book
                    </Button>
                  ) : isBorrowed ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => onNavigate('borrowed')}
                    >
                      View in My Books
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      Currently Unavailable
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-gray-900 mb-2">{book.title}</CardTitle>
                    <CardDescription className="text-gray-600">by {book.author}</CardDescription>
                  </div>
                  <Badge variant="outline">{book.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Hash className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">ISBN</p>
                      <p className="text-gray-900">{book.isbn}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">Published Year</p>
                      <p className="text-gray-900">{book.publishedYear}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="text-gray-900">{book.category}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-gray-900 mb-3">Borrowing Information</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-600">
                      <li>• Standard borrowing period: 14 days</li>
                      <li>• Can be renewed once if no one is waiting</li>
                      <li>• Late returns incur a small daily fee</li>
                      <li>• Maximum 5 books can be borrowed at once</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
