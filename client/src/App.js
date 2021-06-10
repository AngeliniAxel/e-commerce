import React, { useEffect, useState } from 'react';
import Navbar from './app/components/Navbar/Navbar';
import Footer from './app/components/Footer/Footer';
import Home from './app/components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
