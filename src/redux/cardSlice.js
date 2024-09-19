import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardList: [],
  selectedCard: null,
  searchQuery: '',
  newCardResults: []
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload; 
    },
    setSelectedCard: (state, action) => {
        state.selectedCard = action.payload; 
        state.showModal = true;
    },
    clearSelectedCard: (state) => {
      state.selectedCard = null;
      state.showModal = false; 
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; 
    },
    setNewCardResults: (state, action) => {
      state.newCardResults = action.payload;
    },
    addCard: (state, action) => {
      state.cardList.push(action.payload);
    },
    removeCard: (state, action) => {
      state.cardList = state.cardList.filter(card => card.id !== action.payload)
    },
    updateCard: (state, action) => {
      const { id, updates } = action.payload;
      const cardIndex = state.cardList.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        state.cardList[cardIndex] = { ...state.cardList[cardIndex], ...updates };
      }
    },
  },
});

export const { setCards, setSelectedCard, clearSelectedCard, setSearchQuery, setNewCardResults, addCard, removeCard, updateCard } = cardSlice.actions;
export default cardSlice.reducer;
