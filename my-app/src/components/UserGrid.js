import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home'
import './UserGrid.css';

const UserGrid = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://reqres.in/api/users?page=1');
        setUsers(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <nav className="navbar">
          <span className="brand">UserHub</span>
          <button className="button space" onClick={() => setUsers([])}>
            Home
          </button>
          <button className="button" onClick={fetchUsers}>
            Get Users
          </button>
        </nav>
  
        {users.length === 0 ? (
          <Home />
        ) : (
          <div>
            {isLoading ? (
              <div className="loader">Loading...</div>
            ) : (
              <div className="user-grid">
                {users.map((user) => (
                  <div key={user.id} className="user-card">
                    <img src={user.avatar} alt={user.first_name} className="user-avatar" />
                    <div className="user-name">{`${user.first_name} ${user.last_name}`}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default UserGrid;
