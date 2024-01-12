import React, {useEffect, useState} from "react";
import {paginationNotes} from "../api";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";

const NotesPagination = () => {
    const [paginationData, setPaginationData] = useState({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });
    const [page, setPage] = useState(1); // Start from page 1
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchNotesData = async () => {
            try {
                const response = await paginationNotes(page, rowsPerPage);
                setPaginationData({
                    count: response.data.count,
                    next: response.data.next,
                    previous: response.data.previous,
                    results: response.data.results,
                });
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotesData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rowsPerPage
    };

    const handleTablePageChange = (event, newPage) => {
        // Handle any specific logic related to TablePagination here
        setPage(newPage + 1); // +1 because Material-UI Pagination component is 1-based
    };

    return (
        <div>
            <h2>Pagination Data</h2>
            <FormControl>
                <InputLabel>Rows per Page</InputLabel>
                <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Body</TableCell>
                            {/* Add other fields as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationData.results.map((note) => (
                            <TableRow key={note.id}>
                                <TableCell>{note.id}</TableCell>
                                <TableCell>{note.title}</TableCell>
                                <TableCell>{note.body}</TableCell>
                                {/* Add other fields as needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={paginationData.count}
                rowsPerPage={rowsPerPage}
                page={page - 1} // Material-UI Pagination component is 0-based
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onPageChange={handleTablePageChange}
            />

        </div>
    );
};

export default NotesPagination;
