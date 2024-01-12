import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteById, updateNote } from '../api';
import NoteForm from '../components/NoteForm';

const NoteEditPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetchNoteById(id)
      .then(response => {
        const { title, body } = response.data;
        setNote(response.data);
        setTitle(title);
        setBody(body);
      })
      .catch(error => console.error('Error fetching note:', error));
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async () => {
    try {
      await updateNote(id, { title, body });
      navigate(`/notes/`);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Note</h2>
      <NoteForm
        title={title}
        body={body}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default NoteEditPage;
