import React, { useState, useEffect } from 'react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', rollNumber: '' });
  const [updateRollNumber, setUpdateRollNumber] = useState(null);
  const [updateForm, setUpdateForm] = useState({});
  const baseUrl = 'http://localhost:5010/students';

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data); // Set the data to state if successful
      } catch (err) {
        console.error('Error fetching students:', err.message);
      }
    };

    fetchStudents();
  }, []);

  // Add a new student
  const addStudent = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setForm({ name: '', rollNumber: '' });
      window.location.reload(); // Refresh to show the updated list
    } catch (err) {
      console.error('Error adding student:', err.message);
    }
  };

  // Update student completely
  const updateStudent = async () => {
    try {
      const response = await fetch(`${baseUrl}/${updateRollNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateForm),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUpdateRollNumber(null);
      setUpdateForm({});
      window.location.reload(); // Refresh to show the updated list
    } catch (err) {
      console.error('Error updating student:', err.message);
    }
  };

  // Delete a student
  const deleteStudent = async (name) => {
    try {
      const response = await fetch(`${baseUrl}/${name}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.reload(); // Refresh to show the updated list
    } catch (err) {
      console.error('Error deleting student:', err.message);
    }
  };

  return (
    <div>
      <h1>Student Manager</h1>
    </div>
  );
};

export default Student;
