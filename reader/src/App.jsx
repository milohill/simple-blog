import './App.css';
import React, { useEffect, useState } from 'react';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './components/style.css';

const App = () => {
  return (
    <div className="app">
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
