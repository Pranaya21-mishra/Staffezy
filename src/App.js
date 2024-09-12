import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialData = [
  { id: uuidv4(), name: 'John Doe', email: 'john@example.com' },
  { id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com' },
];

function App() {
  const [data, setData] = useState(initialData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch data if needed
  }, []);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addData = () => {
    if (validateInputs()) {
      setData([...data, { id: uuidv4(), name, email }]);
      setName('');
      setEmail('');
      setErrors({ name: '', email: '' });
    }
  };

  const updateData = () => {
    if (validateInputs()) {
      setData(data.map(item =>
        item.id === editId ? { ...item, name, email } : item
      ));
      setName('');
      setEmail('');
      setEditId(null);
      setErrors({ name: '', email: '' });
    }
  };

  const deleteData = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const editData = (item) => {
    setName(item.name);
    setEmail(item.email);
    setEditId(item.id);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>
      <div className="mb-4 flex-1 flex-col ">         
        <input 
          type="text"
          className={`border p-2 mr-2   ${errors.name ? 'border-red-500' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        /> 
       
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
       


        <input
          type="email"
          className={`border p-2 mr-2 mt-5 ${errors.email ? 'border-red-500' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        
        {editId ? (
          <button onClick={updateData} className="bg-blue-500 text-white p-2">Update</button>
        ) : (
          <button onClick={addData} className="bg-green-500 text-white p-2 mt-4 ">Add</button>
        )}
      </div>
      <ul>
        {data.map(item => (
          <li key={item.id} className="border-b p-2 flex justify-between items-center">
            <div>
              <strong>{item.name}</strong> - {item.email}
            </div>
            <div>
              <button onClick={() => editData(item)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
              <button onClick={() => deleteData(item.id)} className="bg-red-500 text-white p-1">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
