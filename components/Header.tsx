
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">
          Vibe Coding Workshop
        </div>
        <nav>
          <a href="https://github.com/easypie65" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Teacher's GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
