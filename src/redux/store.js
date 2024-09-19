import {configureStore} from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import cardReducer from './cardSlice';
import { cardApi } from './cardApiSlice';
import userReducer from './userSlice'; 

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        cards: cardReducer,
        user: userReducer,
        [cardApi.reducerPath]: cardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardApi.middleware),

})