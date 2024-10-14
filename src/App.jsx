import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'; 
import { setUser } from './redux/userSlice';
import { setCards } from './redux/cardSlice'
function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser))); 
    }

    const savedCards = localStorage.getItem('cardList');
    if (savedCards) {
      dispatch(setCards(JSON.parse(savedCards))); 
    }
  }, [dispatch]);

 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>

        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/collection" element={<CollectionPage />}/>

        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/" element={<Navigate to="/login"/>}/>

      </Routes>
    </Router>
  );
}

export default App;
