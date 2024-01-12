import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote } from '../api';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    noteIdToDelete: null,
  });

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotesData();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };

  const handleDelete = (noteId) => {
    setDeleteConfirmation({ open: true, noteIdToDelete: noteId });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteNote(deleteConfirmation.noteIdToDelete);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deleteConfirmation.noteIdToDelete)
      );
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setDeleteConfirmation({ open: false, noteIdToDelete: null });
    }
  };

  const handleDeleteCanceled = () => {
    setDeleteConfirmation({ open: false, noteIdToDelete: null });
  };

  return (
    <div>
      <h2>Welcome to the Notes App!</h2>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} md={4} lg={4} key={note.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'blue', mb: 1 }}>
                  {note.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {note.body}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Created At: {formatDateTime(note.created_at)}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  component={Link}
                  to={`/edit/${note.id}`}
                  variant="contained"
                  sx={{ backgroundColor: 'green', color: 'white' }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDelete(note.id)}
                  variant="contained"
                  sx={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.open} onClose={handleDeleteCanceled}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this note?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCanceled}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
