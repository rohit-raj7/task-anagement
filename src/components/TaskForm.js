import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/tasksSlice';
import { Button, TextField, Grid } from '@mui/material';

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    dueDate: taskToEdit?.dueDate || '',
    completed: taskToEdit?.completed || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      dispatch(editTask({ ...task, id: taskToEdit.id }));
    } else {
      dispatch(addTask({ ...task, id: Date.now() }));
    }
    setTaskToEdit(null);
    setTask({ title: '', description: '', dueDate: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Task Title" 
            name="title" 
            value={task.title} 
            onChange={handleChange} 
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Task Description" 
            name="description" 
            value={task.description} 
            onChange={handleChange} 
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Due Date" 
            type="date" 
            name="dueDate" 
            value={task.dueDate} 
            onChange={handleChange} 
            InputLabelProps={{ shrink: true }} 
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {taskToEdit ? 'Edit Task' : 'Add Task'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
