import React from 'react';

function About() {
  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="card shadow p-5 rounded-4" style={{ backgroundColor: '#ffffff' }}>
          <h2 className="mb-4 text-primary border-start border-4 border-primary ps-3">
            About Mobile App Development
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            This app is developed to demonstrate mobile app skills using <strong>React</strong> and <strong>Firebase</strong>.
            It aims to provide a clean and responsive user interface for managing user data efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
