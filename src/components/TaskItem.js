import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleted } from '../redux/tasksSlice';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTask(task.id));
    setOpen(false);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const handleToggleCompleted = () => dispatch(toggleCompleted(task.id));

  return (
    <Card variant="outlined" style={{ marginBottom: '10px', backgroundColor: task.completed ? '#d3ffd3' : '#fff' }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">{task.dueDate}</Typography>
        <Button onClick={handleToggleCompleted} color={task.completed ? 'secondary' : 'primary'}>
          {task.completed ? 'Completed' : 'Mark as Completed'}
        </Button>
        <Button onClick={handleDeleteClick} color="error">Delete</Button>
      </CardContent>

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskItem;
