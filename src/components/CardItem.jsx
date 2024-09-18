import { useDispatch } from "react-redux";
import { removeCard } from "../redux/cardSlice";


function CardItem({card}) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeCard(card.id));
    }

    return (
        <div>
            <h3>{card.name}</h3>
            <p>{card.set.name}</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}

export default CardItem