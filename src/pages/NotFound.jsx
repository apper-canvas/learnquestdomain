import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="Search" size={40} className="text-primary" />
        </div>
        
        <h1 className="text-6xl font-display text-primary mb-4">404</h1>
        <h2 className="text-2xl font-display text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. Let's get you back to learning!
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <ApperIcon name="Home" className="mr-2" size={16} />
              Go Home
            </Link>
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to="/math">
                <ApperIcon name="Calculator" className="mr-1" size={14} />
                Math Zone
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to="/reading">
                <ApperIcon name="BookOpen" className="mr-1" size={14} />
                Reading Zone
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;