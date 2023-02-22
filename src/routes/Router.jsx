import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboarAdmin from "../components/dashboard/DashboarAdmin";
import CreateUser from "../components/usuarios/CreateUser";
import ViewUsers from "../components/usuarios/ViewUsers";
import ViewRoles from "../components/usuarios/ViewRoles";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import TakeTurn from "../pages/TakeTurn";
import Usuarios from "../pages/Usuarios";
import Consultorio from "../pages/Consultorio";
import ViewConsultorios from "../components/consultorios/ViewConsultorios";
import CreateConsultorio from "../components/consultorios/CreateConsultorio";
import Turneros from "../pages/Turneros";
import ViewTurneros from "../components/turneros/ViewTurneros";
import CreateTurnero from "../components/turneros/CreateTurnero";
import ViewButtons from "../components/turneros/ViewButtons";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verturnero/:id" element={<TakeTurn />} />
        <Route element={<Dashboard />}>
          <Route path="/dashboard" element={<DashboarAdmin />} />
          <Route element={<Usuarios />}>
            <Route path="/dashboard/crearusuario" element={<CreateUser />} />
            <Route path="/dashboard/usuarios" element={<ViewUsers />} />
            <Route path="/dashboard/roles" element={<ViewRoles />} />
          </Route>
          <Route element={<Consultorio />}>
            <Route
              path="/dashboard/consultorios"
              element={<ViewConsultorios />}
            />
            <Route
              path="/dashboard/crearconsultorio"
              element={<CreateConsultorio />}
            />
            <Route path="/dashboard/roles" element={<ViewRoles />} />
          </Route>
          <Route element={<Turneros />}>
            <Route path="/dashboard/turneros" element={<ViewTurneros />} />
            <Route path="/dashboard/crearturnero" element={<CreateTurnero />} />
            <Route path="/dashboard/roles" element={<ViewRoles />} />
            <Route path="/dashboard/botones" element={<ViewButtons />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
