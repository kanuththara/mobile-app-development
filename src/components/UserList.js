import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    }, (error) => {
      console.error('Error fetching users:', error);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      alert('Name must be at least 3 characters');
      return;
    }
    if (!email.includes('@')) {
      alert('Invalid email format');
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert('Phone must be 10 digits and numeric');
      return;
    }

    if (!editingUser) {
      alert('No user selected for update');
      return;
    }

    try {
      const userRef = doc(db, 'users', editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      alert('User updated successfully!');
      setEditingUser(null);
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Error updating user');
    }
  };

  const sortBy = (key) => {
    const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(newOrder);

    const sorted = [...users].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase() || '';
      const valB = b[key]?.toString().toLowerCase() || '';

      if (valA < valB) return newOrder === 'asc' ? -1 : 1;
      if (valA > valB) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setUsers(sorted);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 bg-white rounded">
        <h3 className="card-title mb-3">Registered Users</h3>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name"
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Edit Form */}
        {editingUser && (
          <form onSubmit={handleUpdate} className="mb-4 border p-3 rounded bg-light">
            <h5>Update User</h5>
            <div className="row">
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  maxLength={10}
                  minLength={10}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success hover-effect me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        )}

        {/* User Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th onClick={() => sortBy('name')} style={{ cursor: 'pointer' }}>
                  Name {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => sortBy('email')} style={{ cursor: 'pointer' }}>
                  Email {sortKey === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => sortBy('phone')} style={{ cursor: 'pointer' }}>
                  Phone {sortKey === 'phone' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2 hover-effect"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary btn-sm hover-effect"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserList;
