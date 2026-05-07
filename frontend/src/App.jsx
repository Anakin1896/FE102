import React, { useState, useEffect } from 'react';
import BooksCatalog from './components/BooksCatalog';
import AddBookModal from './components/AddBookModal';
import { getBooks } from './services/api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libraryData, setLibraryData] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setLibraryData(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <BooksCatalog 
        books={libraryData} 
        onAddBook={() => setIsModalOpen(true)} 
      />

      {isModalOpen && (
        <AddBookModal
          onClose={() => setIsModalOpen(false)}
          onBookAdded={fetchBooks}
        />
      )}
    </>
  );
}

export default App;