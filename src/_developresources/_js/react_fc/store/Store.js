import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ListModule from '@/react_fc/components/ListModule';

const rootReducer = combineReducers({
    list: ListModule.reducer,
});

export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    });
    return store;
};