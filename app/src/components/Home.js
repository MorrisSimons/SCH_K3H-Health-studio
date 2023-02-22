import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the home page</h1>
      <Link to="/about">
        <button>Go to About</button>
      </Link>
    </div>
  );
}

export default Home;
