
import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  tasks: loadFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks); 
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) {
        state.tasks[index] = action.payload;
        saveToLocalStorage(state.tasks); 
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.tasks); 
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state.tasks); 
      }
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveToLocalStorage(state.tasks);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      saveToLocalStorage(state.tasks); 
    },
  },
});


export const { addTask, editTask, deleteTask, toggleCompleted, reorderTasks, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
