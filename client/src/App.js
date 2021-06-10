import React, { useEffect, useState } from 'react';
import Navbar from './app/components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './app/components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
