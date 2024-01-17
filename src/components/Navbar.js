import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FS WEB FRONTEND
        </Typography>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
            <li>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            </li>
            <li>
              <Button color="inherit" component={Link} to="/notes">
                Notes List
              </Button>
            </li>
            <li>
              <Button color="inherit" component={Link} to="/webnotes">
                Web Notes List
              </Button>
            </li>
                        <li>
              <Button color="inherit" component={Link} to="/notespg">
                Notes Pagination
              </Button>
            </li>
            <li>
              <Button color="inherit" component={Link} to="/create">
                Create Note
              </Button>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
