import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [newMarks, setNewMarks] = useState({
    name: '',
    marks: ['', '', '', '', '']
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/marks');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error fetching students. Please try again.');
    }
  };

  const handleInputChange = (index, value) => {
    setNewMarks(prevState => {
      const updatedMarks = [...prevState.marks];
      updatedMarks[index] = value;
      return { ...prevState, marks: updatedMarks };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/marks', newMarks);
      fetchStudents();
      setNewMarks({
        name: '',
        marks: ['', '', '', '', '']
      });
      toast.success('Marks submitted successfully!');
    } catch (error) {
      console.error('Error submitting marks:', error);
      toast.error('Error submitting marks. Please try again.');
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/marks/${studentId}`);
      fetchStudents();
      toast.success('Student marks deleted successfully!');
    } catch (error) {
      console.error('Error deleting student marks:', error);
      toast.error('Error deleting student marks. Please try again.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h1>Student Marks</h1>
      <div className="fixed-table-container">
        <h3 className="table-title">Marks Table</h3>
        <table className='tablescroll'>
          <thead id="heading">
            <tr>
              <th>Name</th>
              <th>CS3301</th>
              <th>CS3302</th>
              <th>CS3304</th>
              <th>CS3305</th>
              <th>NM3308</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='tablebody'>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.marks[0]?.mark}</td>
                <td>{student.marks[1]?.mark}</td>
                <td>{student.marks[2]?.mark}</td>
                <td>{student.marks[3]?.mark}</td>
                <td>{student.marks[4]?.mark}</td>
                <td>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={fetchStudents}>Refresh</button>
      <div className='marks'>
        <h2>Add Marks</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={newMarks.name} onChange={(e) => setNewMarks({ ...newMarks, name: e.target.value })} />
          <br />
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div key={index}>
              <label>Subject {num}:</label>
              <input type="text" value={newMarks.marks[index]} onChange={(e) => handleInputChange(index, e.target.value)} />
            </div>
          ))}
          <button type="submit">Submit Marks</button>
        </form>
      </div>
    </div>
  );
}

export default App;
