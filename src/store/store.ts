import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import  loginReducer  from './LoginSlice';
import todoReducer from './TodoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    todo: todoReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;