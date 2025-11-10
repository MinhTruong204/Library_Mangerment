import React from 'react';
import { Navigation } from './Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, BookMarked, Clock, TrendingUp } from 'lucide-react';

type Page = 'dashboard' | 'catalog' | 'borrowed' | 'profile';

interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
}

interface DashboardProps {
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  borrowedBooksCount: number;
}

export function Dashboard({ user, onNavigate, onLogout, borrowedBooksCount }: DashboardProps) {
  const stats = [
    {
      title: 'Books Borrowed',
      value: borrowedBooksCount.toString(),
      icon: BookMarked,
      color: 'bg-blue-500'
    },
    {
      title: 'Available Books',
      value: '1,247',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Due This Week',
      value: borrowedBooksCount > 0 ? '1' : '0',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Recently Added',
      value: '23',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your library today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-gray-600">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('catalog')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Book Catalog
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('borrowed')}
              >
                <BookMarked className="w-4 h-4 mr-2" />
                View My Borrowed Books
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('profile')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Check Due Dates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Added Books</CardTitle>
              <CardDescription>Check out our newest additions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['The Midnight Library', 'Atomic Habits', 'Project Hail Mary'].map((book, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900">{book}</p>
                      <p className="text-gray-500">Added this week</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => onNavigate('catalog')}
              >
                View All Books
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
