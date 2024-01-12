import React, { useState } from 'react';
import { createNote } from '../api';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteCreatePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async () => {
    try {
      await createNote({ title, body });
      navigate('/notes'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error creating note:', error);

    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <NoteForm
        title={title}
        body={body}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
        handleSubmit={handleSubmit}
      />
      <ToastContainer />
    </div>
  );
};

export default NoteCreatePage;
