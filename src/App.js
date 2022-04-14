import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
// import components
// import HomePage from './components/home_page';
import Login from './components/login';
import Signup from './components/signup';
import ForgetPassword from './components/forget_password';
import ResetPassword from './components/reset_password';
import Footer from './components/footer';
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import CreateTicket from './components/create_ticket';
import EditTicket from './components/edit_ticket';
import ManageProjects from './components/manage_projects';
import UserApproval from './components/user_approval';

// App component
export default function App() {
  return (
    <Router>

        <Routes >
        <Route path = "/" element = {
            <Login />
        }/>

        <Route path = "/login/:msg" element = {
            <Login />
        }/>

        <Route path = "/sign-up" element = {
            <Signup />
        } />

        <Route path = "/forget-password" element = {
            <ForgetPassword />
        } />

        <Route path = "/reset-password/:reset_code" element = {
            <ResetPassword />
        } />

        {/* <Route path = "/home-page/:user_type/:user_name" element = { <HomePage /> } /> */}
        <Route path="/dashboard/:user_type" element={
          <>
            <Navbar/>
            <Dashboard/>
          </>} />

        <Route path="/tickets/create/:user_type" element={
        <>
          <Navbar/>
          <CreateTicket/>
        </>} />

        <Route path="/manage-projects/:user_type" element={
        <>
          <Navbar/>
          <ManageProjects/>
        </>} />

        <Route path="/edit/:user_type/:id" element={
        <>
          <Navbar/>
          <EditTicket/>
        </>} />

        <Route path="/user-approval/:user_type" element={
        <>
          <Navbar/>
          <UserApproval />
        </>} />

        {/* <Route path="/ticket/create/:user_type/:user_name" component={CreateTicket} />
        <Route path="/manage-projects/:user_type/:user_name" component={ManageProjects} />
        <Route path="/edit/:id" component={EditTicket} /> */}
        </Routes>
        <Footer />
    </Router>
  );
}

