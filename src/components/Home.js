import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">MobileApp</Link>
        
        {/* Toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/registration" className="btn btn-primary">Registration</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/about" className="btn btn-secondary">About</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/users" className="btn btn-secondary">User List</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-5">
        <h1>Welcome to Mobile App Development</h1>
        <p>Manage your data efficiently using our mobile app.</p>
        <Link to="/registration" className="btn btn-primary me-2">Register</Link>
        <Link to="/about" className="btn btn-secondary">About</Link>
      </div>
    </>
  );
}

export default Home;
