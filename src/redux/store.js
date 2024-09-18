import {configureStore} from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import cardReducer from './cardSlice';
import { cardApi } from './cardApiSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        cards: cardReducer,
        [cardApi.reducerPath]: cardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardApi.middleware),

})