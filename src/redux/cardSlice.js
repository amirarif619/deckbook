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
    }
  },
});

export const { setCards, setSelectedCard, clearSelectedCard, setSearchQuery, setNewCardResults, addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
