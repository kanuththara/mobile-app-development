import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // You can create this file to add custom styles if needed

function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4e73df' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">📱 MobileApp</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/registration" className="btn btn-warning text-dark">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="btn btn-outline-light">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="btn btn-outline-light">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3 text-primary">Welcome to Mobile App Dashboard</h1>
          <p className="lead text-muted mb-4">
            Manage your user data with ease using React & Firebase.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/registration" className="btn btn-primary btn-lg me-3">Get Started</Link>
            <Link to="/about" className="btn btn-outline-secondary btn-lg">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4 text-dark">✨ Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">🔥 Firebase Integration</h5>
                  <p className="card-text">Real-time user data storage and updates via Firestore.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">⚛️ React Components</h5>
                  <p className="card-text">Clean, reusable UI powered by functional components.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">📱 Mobile Friendly</h5>
                  <p className="card-text">Responsive layout optimized for any device size.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
