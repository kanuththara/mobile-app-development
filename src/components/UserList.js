import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // Fetch data from Firebase Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  // Sorting function
  const sortBy = (key) => {
    const isAsc = sortKey === key ? !sortAsc : true;
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? (isAsc ? 1 : -1) : (isAsc ? -1 : 1)
    );
    setUsers(sorted);
    setSortKey(key);
    setSortAsc(isAsc);
  };

  // Filtered list based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-hover table-striped">
        <thead>
            <tr>
            <th onClick={() => sortBy("name")}>
            Name {sortKey === "name" ? (sortAsc ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => sortBy("email")}>
            Email {sortKey === "email" ? (sortAsc ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => sortBy("phone")}>
            Phone {sortKey === "phone" ? (sortAsc ? "↑" : "↓") : ""}
            </th>
            </tr>
        </thead>

        
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
