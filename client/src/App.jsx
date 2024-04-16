import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Feedback from './pages/PromotionManagement/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import PromotionManagement from './pages/PromotionManagement/PromotionManagement';
import PromotionCreateForm from './pages/PromotionManagement/PromotionCreateForm';
import PromotionUpdateForm from './pages/PromotionManagement/PromotionUpdateForm';
import PromotionPage from './pages/PromotionManagement/PromotionPage';
import SupplyManagement from './pages/SupplierManagement/SupplyManagement';
import SupplierCreateForm from './pages/SupplierManagement/SupplierCreateForm';
import Orders from './pages/SupplierManagement/Orders';
import SupplierUpdateForm from './pages/SupplierManagement/SupplierUpdateForm';
import InventoryCreateForm from './pages/InventoryManagement/InventoryItemCreateForm';
import InventoryUpdateForm from './pages/InventoryManagement/InventoryUpdateForm';
import SupplyRequestForm from './pages/InventoryManagement/SupplyRequest';
import InventoryManagement from './pages/InventoryManagement/InventoryManagement';
import PrescriptionCreateForm from './pages/PrescriptionManagement/PrescriptionCreateForm';
import PrescriptionAssign from './pages/PrescriptionManagement/PrescriptionAssignPage';
import PrescriptionNotification from './pages/PrescriptionManagement/PrescriptionNotifications';
import PrescriptionManagement from './pages/PrescriptionManagement/PrescriptionManagement';

//user management
import SignIn from './pages/UserManagement/SignIn';
import SignUp from './pages/UserManagement/SignUp';
import Profile from './pages/UserManagement/Profile';
import UserTable from './pages/UserManagement/Usertable';
import UserManagement from './pages/UserManagement/UserManagement';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path='/promotion-management' element={<PromotionManagement />} />
      <Route path='/create-promotion' element={<PromotionCreateForm />} />
      <Route path='/update-promotion/:id' element={<PromotionUpdateForm />} />
      <Route path='/promotions' element={<PromotionPage />} />
      <Route path="/supplier-management" element={<SupplyManagement/>} />
      <Route path="/create-supplier" element={<SupplierCreateForm/>} />
      <Route path='/update-supplier/:id' element={<SupplierUpdateForm />} />     
      <Route path="/orders" element={<Orders/>} />
      
      <Route path="/create-prescription" element={<PrescriptionCreateForm/>} />
      <Route path="/prescription-management" element={<PrescriptionManagement/>} />
      <Route path="/prescription-assign" element={<PrescriptionAssign/>} />
      <Route path="/notifications" element={<PrescriptionNotification/>} />

      <Route path="/inventory-management" element={<InventoryManagement/>} />
      <Route path="/create-inventory" element={<InventoryCreateForm/>} />
      <Route path="/update-inventory/:id" element={<InventoryUpdateForm/>} />
      {/* <Route path='/update-inventory/:id' element={<InventoryUpdateForm/>}/> */}
      <Route path='/supply-request' element={<SupplyRequestForm/>}/>   

      {/* user manager */}
        <Route path="/user-table" element={<UserTable />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>    
        {/* here */}

      
      </Routes>
  </Router>
  )
}
