import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Registration() {
  const [success, setSuccess] = useState(false);
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

      setSuccessMsg("Registration successful!");
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
    <div className="container mt-5">
      <div className="card shadow p-4 bg-white rounded">
        <h3 className="card-title mb-3">Register New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
          </div>
          <button type="submit" className="btn btn-success hover-effect" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {successMsg && (
          <div className="alert alert-success mt-3" role="alert">
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
