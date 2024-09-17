import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        hideSidebar: (state) => {
            state.isVisible = false;
        },
        showSidebar: (state) => {
            state.isVisible = true;
        }
    }
});

export const { hideSidebar, showSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;