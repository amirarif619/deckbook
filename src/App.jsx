

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>

        <Route path="/dashboard" element={<DashboardPage/>}/>

        <Route path="/collection" element={<CollectionPage />}/>

        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/" element={<Navigate to="/login"/>}/>

      </Routes>
    </Router>
  );
}

export default App;
