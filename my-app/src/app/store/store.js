import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import userReducer from '../../features/User/userSlice';
export const store = configureStore({
  reducer: {
    users : userReducer
  },
});
