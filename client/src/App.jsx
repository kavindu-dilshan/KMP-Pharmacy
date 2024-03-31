import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Feedback from './pages/PromotionManagement/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import PromotionManagement from './pages/PromotionManagement/PromotionManagement';
import PromotionCreateForm from './pages/PromotionManagement/PromotionCreateForm';
import PromotionUpdateForm from './pages/PromotionManagement/PromotionUpdateForm';

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path='/promotions' element={<PromotionManagement />} />
      <Route path='/create-promotion' element={<PromotionCreateForm />} />
      <Route path='/update-promotion/:id' element={<PromotionUpdateForm />} />
    </Routes>
  </Router>
  )
}
