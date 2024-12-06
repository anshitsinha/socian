'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', regNo: '', program: '', school: '', contact: '', email: '', password: '', clubs: [] });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, clubs: checked ? [...form.clubs, value] : form.clubs.filter(c => c !== value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="regNo" placeholder="Registration No." onChange={handleChange} />
      <input type="text" name="program" placeholder="Program of Study" onChange={handleChange} />
      <input type="text" name="school" placeholder="School/Centre" onChange={handleChange} />
      <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <h3>Select Clubs</h3>
      {['Dance Club', 'Debating Club', 'Drama Club'].map(club => (
        <label key={club}>
          <input type="checkbox" name="clubs" value={club} onChange={handleChange} />
          {club}
        </label>
      ))}

      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
