'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/login');
  };

  if (!user || !role) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {role}</p>
      
      {role === 'student' && (
        <div>
          <h2>Your Clubs</h2>
          <ul>
            {user.clubs.length > 0 ? (
              user.clubs.map((club, idx) => <li key={idx}>{club}</li>)
            ) : (
              <p>You have not joined any clubs.</p>
            )}
          </ul>
        </div>
      )}

      {role === 'teacher' && (
        <div>
          <h2>Pending Requests</h2>
          <ul>
            {user.pendingRequests.length > 0 ? (
              user.pendingRequests.map((req, idx) => (
                <li key={idx}>
                  {req.name} ({req.registrationNo})
                  <button>Approve</button>
                  <button>Delete</button>
                </li>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
          </ul>
          <h2>Club Members</h2>
          <ul>
            {user.clubMembers.length > 0 ? (
              user.clubMembers.map((member, idx) => <li key={idx}>{member.name}</li>)
            ) : (
              <p>No club members yet.</p>
            )}
          </ul>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
