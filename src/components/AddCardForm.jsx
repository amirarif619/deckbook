import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addCard } from '../redux/cardSlice'
import { useLazyGetCardsQuery } from '../redux/cardApiSlice';

function AddCardForm() {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [trigger, { data: searchResults, isLoading, error }] = useLazyGetCardsQuery()
    const dispatch = useDispatch();

   const handleSearch = () => {
    trigger(searchTerm);
   }

   const handleAddCard = (card) => {
    dispatch(addCard(card));
   }

    return (
        <div>
            <h2>Add a New Card</h2>
            <input
            type="text"
            placeholder="Enter a card name"
            value={ searchTerm } 
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {searchResults && searchResults.data.map(card => (
                <div key={card.id}>
                    <h3>{card.name}</h3>
                    <img src={card.images.small} alt={card.name} />
                    <p>Set: {card.set.name}</p>
                    <button onClick={() => handleAddCard(card)}>Add Card</button>
                </div>
            ))}
        </div>
    )
}

export default AddCardForm;