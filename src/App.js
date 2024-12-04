
import React, { useState } from 'react';
import { Container, Grid, Button, Box, TextField } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styled from 'styled-components';






const Title = styled.h1`
  color: #3498db;
  
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
  text-align: center;
  // text-decoration: underline;
`;

const App = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <Title>Task Management Dashboard</Title>
      <Box my={4}>
        <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Tasks"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => setFilter('all')}>All Tasks</Button>
          <Button onClick={() => setFilter('completed')}>Completed</Button>
          <Button onClick={() => setFilter('pending')}>Pending</Button>
          <Button onClick={() => setFilter('overdue')}>Overdue</Button>
        </Grid>
      </Grid>
      <TaskList filter={filter} searchQuery={searchQuery} />
    </Container>
  );
};

export default App;
