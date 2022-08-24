import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  RegisterPage,
  Dashboard,
  Tickets,
  TicketViewPage,
  Users,
  Reports,
  Settings,
} from "./pages";
import CreateTicketPage from "./pages/CreateTicketPage";
import Protected from "./pages/Protected";
import { AuthContext } from "./contexts/AuthContext";
const Router = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            auth ? <Protected auth={auth} /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" exact element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />}></Route>
          <Route path="tickets/:id" exact element={<TicketViewPage />} />
          <Route path="tickets/new" exact element={<CreateTicketPage />} />

          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/login"
          element={auth ? <Navigate to="/" /> : <Login auth={auth} />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <RegisterPage auth={auth} />}
        />
      </Routes>
    </>
  );
};

export default Router;
