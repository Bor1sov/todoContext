import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;