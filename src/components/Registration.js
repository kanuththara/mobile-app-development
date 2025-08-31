import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Registration() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be 10 digits and numeric");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: serverTimestamp()
      });

      setSuccessMsg("🎉 Registration successful!");
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card shadow p-5 rounded-4" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="card-title mb-4 text-primary border-start border-4 border-primary ps-3">
            Register New User
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter your full name"
                required
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="example@mail.com"
                required
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="10-digit phone number"
                maxLength={10}
                required
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
              style={{ fontWeight: '600', fontSize: '1.1rem' }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {successMsg && (
            <div className="alert alert-success mt-4 d-flex align-items-center" role="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {successMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registration;
