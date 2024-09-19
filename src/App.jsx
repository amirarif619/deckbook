import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.user);

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
