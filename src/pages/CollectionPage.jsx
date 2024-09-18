import DashboardLayout from "../components/DashboardLayout"
import { useSelector } from 'react-redux';

function CollectionPage() {

  const cardList = useSelector((state) => state.cards.cardList);

  return (
    
    <DashboardLayout>
    <h2>CollectionPage</h2>
    {cardList.map(card => (
      <div key={card.id}>
        <h3>{card.name}</h3>
        <p>{card.set.name}</p>
      </div>
    ))}
    </DashboardLayout>
  )
}

export default CollectionPage