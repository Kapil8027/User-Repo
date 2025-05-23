import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Assignments() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [assignments, setAssignments] = useState([]);

  // Fetch assignments on component load
  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost:4200/assignments', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setAssignments(res.data);
    } catch (err) {
      alert('Failed to fetch assignments');
    }
  };

  // Upload a new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('assignment', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:4200/assignments', formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      alert('Assignment uploaded');
      setTitle('');
      setDescription('');
      setFile(null);
      fetchAssignments(); // Refresh list
    } catch (err) {
      alert('Upload failed');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Upload Assignment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <h3 style={{ marginTop: '40px' }}>Your Assignments</h3>
      {assignments.length === 0 ? (
        <p>No assignments uploaded yet.</p>
      ) : (
        <ul>
          {assignments.map((a, i) => (
            <li key={i}>
              <strong>{a.title}</strong> - {a.description} -{' '}
              <a
                href={`http://localhost:4200/${a.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Assignments;
