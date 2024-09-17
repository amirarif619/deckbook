// src/redux/cardsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [], // This will hold the list of cards
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload); // Add a new card to the collection
    },
    updateCard: (state, action) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload; // Update card details
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload); // Remove card by ID
    },
  },
});

export const { addCard, updateCard, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;
