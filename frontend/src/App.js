
import './App.css';
// import AdminLogin from './components/AdminComponent/AdminLogin';
// import AdminDashboard from './components/AdminComponent/AdminDashboard';
// import UpdateUser from './components/AdminComponent/UpdateUser'
import { Routes, Route } from 'react-router-dom';

import CustomerLogin from './pages/customer/login/'
import CustomerDashboard from './pages/customer/dashboard';
import AdminDashboard from './pages/admin/dashboard';
import RegisterUser from './pages/admin/registerUser';
import AllUsers from './pages/admin/allUsers';
import AdminLogin from './pages/admin/login';
import AdminLogout from './pages/admin/logout';
import UpdateUser from './pages/admin/updateUser';
function App() {
  return (
    <Routes>
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="adminl" element={<AdminLogin />} />
      {/* <Route path="admindashboard" element={<AdminDashboard />}/> */}
      {/* <Route path="updateuser" element={<UpdateUser />}/> */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/logout" element={<AdminLogout />} />
      <Route path='/admin/registeruser' element={<RegisterUser />} />
      <Route path='/admin/allusers' element={<AllUsers />} />
      <Route path='/admin/updateuser/:uid' element={<UpdateUser />} />
    </Routes>
  );
}

export default App;
