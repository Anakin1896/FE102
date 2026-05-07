import React, { useState } from 'react';
import BooksCatalog from './components/BooksCatalog';
import AddBookModal from './components/AddBookModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libraryData, setLibraryData] = useState([]); 

  return (
    <>
      <BooksCatalog 
        books={libraryData} 
        onAddBook={() => setIsModalOpen(true)} 
      />

      {isModalOpen && (
        <AddBookModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default App;