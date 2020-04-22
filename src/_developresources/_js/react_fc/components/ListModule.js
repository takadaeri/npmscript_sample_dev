import { createSlice } from '@reduxjs/toolkit';

const ListModule = createSlice({
    name: 'list',
    initialState: [],
    reducers: {
      setListItems: (state, action) => {
        action.payload.forEach(item => {
          state.push(item);
        });
      },
      addList: (state, action) => [...state, action.payload],
      deleteList: (state, action) => state.filter(el => el.id !== action.payload),
      doneList: (state, { payload }) => state.map(item => ({ ...item, done: item.id === payload ? !item.done : item.done })),
    }
});

export default ListModule;