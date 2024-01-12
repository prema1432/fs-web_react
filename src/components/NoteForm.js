import React from 'react';
import { Grid, Paper, TextField, Button, TextareaAutosize } from '@mui/material';

const NoteForm = ({ title, body, handleTitleChange, handleBodyChange, handleSubmit }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <form>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={handleTitleChange}
            />
            <br />
            <TextareaAutosize
              rowsMin={3}
              placeholder="Content"
              value={body}
              onChange={handleBodyChange}
              style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NoteForm;
