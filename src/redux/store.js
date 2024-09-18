import {configureStore} from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import cardReducer from './cardSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        cards: cardReducer,
    },
})