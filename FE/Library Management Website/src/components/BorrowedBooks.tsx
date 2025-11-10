import React from 'react';
import { Navigation } from './Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calendar, BookOpen, AlertCircle } from 'lucide-react';
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
  coverUrl: string;
}

interface BorrowedBook extends Book {
  borrowedDate: string;
  dueDate: string;
}

interface BorrowedBooksProps {
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  borrowedBooks: BorrowedBook[];
  onReturnBook: (bookId: string) => void;
  onViewBook: (bookId: string) => void;
}

export function BorrowedBooks({
  user,
  onNavigate,
  onLogout,
  borrowedBooks,
  onReturnBook,
  onViewBook
}: BorrowedBooksProps) {
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (daysUntilDue <= 3) {
      return <Badge className="bg-orange-500">Due Soon</Badge>;
    } else {
      return <Badge variant="default">Active</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="borrowed"
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">My Borrowed Books</h1>
          <p className="text-gray-600">
            You currently have {borrowedBooks.length} book{borrowedBooks.length !== 1 ? 's' : ''} borrowed
          </p>
        </div>

        {borrowedBooks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No borrowed books</h3>
              <p className="text-gray-600 mb-6">Browse the catalog to borrow your first book</p>
              <Button onClick={() => onNavigate('catalog')}>
                Browse Catalog
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-gray-600">Active Loans</CardTitle>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-gray-900">{borrowedBooks.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-gray-600">Due This Week</CardTitle>
                  <Calendar className="w-5 h-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-gray-900">
                    {borrowedBooks.filter(book => getDaysUntilDue(book.dueDate) <= 7 && getDaysUntilDue(book.dueDate) >= 0).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-gray-600">Overdue</CardTitle>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-gray-900">
                    {borrowedBooks.filter(book => getDaysUntilDue(book.dueDate) < 0).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Borrowed Books</CardTitle>
                <CardDescription>Manage your current book loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Borrowed Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {borrowedBooks.map((book) => {
                        const daysUntilDue = getDaysUntilDue(book.dueDate);
                        return (
                          <TableRow key={book.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-16 rounded overflow-hidden">
                                  <ImageWithFallback
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-900">{book.title}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.borrowedDate}</TableCell>
                            <TableCell>
                              <div>
                                <p>{book.dueDate}</p>
                                <p className="text-gray-500">
                                  {daysUntilDue >= 0
                                    ? `${daysUntilDue} days left`
                                    : `${Math.abs(daysUntilDue)} days overdue`}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(daysUntilDue)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => onViewBook(book.id)}
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => onReturnBook(book.id)}
                                >
                                  Return
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="md:hidden space-y-4">
                  {borrowedBooks.map((book) => {
                    const daysUntilDue = getDaysUntilDue(book.dueDate);
                    return (
                      <Card key={book.id}>
                        <CardContent className="p-4">
                          <div className="flex space-x-3 mb-3">
                            <div className="w-16 h-20 rounded overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 mb-1">{book.title}</p>
                              <p className="text-gray-600">{book.author}</p>
                              <div className="mt-2">
                                {getStatusBadge(daysUntilDue)}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-gray-600 mb-3">
                            <div>
                              <p className="text-gray-500">Borrowed</p>
                              <p>{book.borrowedDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Due</p>
                              <p>{book.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => onViewBook(book.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => onReturnBook(book.id)}
                            >
                              Return Book
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
