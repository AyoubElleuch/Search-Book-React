import React from 'react';
import SearchBar from './components/SearchBar';
import BooksCollection from './components/BooksCollection';
import FullPageBook from './components/FullPageBook';
import { useSelector } from "react-redux";
import './App.css';

function App() {
  const selectedBook = useSelector((state:any) => state.search.selectedBook);

  return (
    <div className="App">
      <SearchBar />
      { selectedBook === null ? <BooksCollection /> : <FullPageBook book={selectedBook}/>}
    </div>
  );
}

export default App;
