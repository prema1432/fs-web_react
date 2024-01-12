import React, { useEffect, useState } from "react";
import { paginationNotes } from "../api";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const NotesPagination = () => {
  const [paginationData, setPaginationData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const response = await paginationNotes(page + 1, rowsPerPage);
        setPaginationData(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotesData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    // Manually update the URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', newPage + 1);
    window.history.pushState({}, '', newUrl.toString());

    // Update the state
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Manually update the URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', 1);
    newUrl.searchParams.set('page_size', event.target.value);
    window.history.pushState({}, '', newUrl.toString());

    // Update the state
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPaginationData = async (page, rowsPerPage) => {
    try {
      const response = await paginationNotes(page, rowsPerPage);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching paginated notes (page: ${page}, rowsPerPage: ${rowsPerPage}):`, error);
    }
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
            {(rowsPerPage > 0
              ? paginationData.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : paginationData.results
            ).map((note) => (
              <TableRow key={note.id}>
                <TableCell>{note.id}</TableCell>
                <TableCell>{note.title}</TableCell>
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
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onPageChange={(event, newPage) => {
          setPage(newPage);
          fetchPaginationData(newPage + 1, rowsPerPage);
        }}
      />
    </div>
  );
};

export default NotesPagination;
