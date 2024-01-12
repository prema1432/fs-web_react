import React, {useState, useEffect} from 'react';
import {fetchNotes, deleteNote} from '../api';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from 'react-router-dom';

const NoteListPage = () => {
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

    // const handleEdit = (noteId) => {
    //     console.log(`Editing note with id: ${noteId}`);
    // };

    const handleDelete = (noteId) => {
        setDeleteConfirmation({open: true, noteIdToDelete: noteId});
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
            setDeleteConfirmation({open: false, noteIdToDelete: null});
        }
    };

    const handleDeleteCanceled = () => {
        setDeleteConfirmation({open: false, noteIdToDelete: null});
    };

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

    return (
        <div>
            <h2>Notes List</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                            <TableCell sx={{fontWeight: 'bold'}}>Id</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Title</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Body</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Created At</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.map((note) => (
                            <TableRow key={note.id}>
                                <TableCell>{note.id}</TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{fontWeight:'bold',color:"red"}}>
                                        {note.title}

                                    </Typography>
                                </TableCell>
                                <TableCell>{note.body}</TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{fontWeight: 'bold', color: 'blue'}}>
                                        Created:
                                    </Typography>
                                    {formatDateTime(note.created_at)}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        component={Link}
                                        to={`/edit/${note.id}`}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(note.id)}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default NoteListPage;
