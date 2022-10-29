import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux";
import PaymentPage from "./payment/PaymentPage/PaymentPage"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ApplyExpert from "./pages/ApplyExperts";
import { Button } from 'antd'
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Notifications from "./pages/Notifications";
import PublicRoute from './components/PublicRoute';
import Userslists from './pages/Admin/Userslists';
import ExpertsList from './pages/Admin/ExpertsList';
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import ExpertAppointments from "./pages/Doctor/ExpertAppointments";
import { showLoading, hideLoading } from "./redux/alertsSlice";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && <div className='spinner-parent'>
        <div className="spinner-border" role="status">

        </div>

      </div>}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route
          path="/apply-Expert"
          element={

            <ApplyExpert />

          }
        />
        <Route
          path="/notifications"
          element={

            <Notifications />

          }
        />
     
      <Route
        path="/admin/userslist"
        element={
          <ProtectedRoute>
            <Userslists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/expertslist"
        element={
          <ProtectedRoute>
            <ExpertsList />
          </ProtectedRoute>
        }
      />
      <Route
          path="/expert/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      <Route
          path="/book-appointment/:expertId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
                <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expert/appointments"
          element={
            <ProtectedRoute>
                <ExpertAppointments />
            </ProtectedRoute>
          }
        />
      
        <Route
          path='/payment'
          element={
            <ProtectedRoute>
               <PaymentPage />
            </ProtectedRoute>
          }
        />
</Routes>

    </BrowserRouter>
  );

}

export default App;
