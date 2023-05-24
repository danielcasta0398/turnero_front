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
import Turnos from "../pages/Turnos";
import ViewTurnos from "../components/turnos/ViewTurnos";
import Televisor from "../pages/Televisor";
import CreateTv from "../components/televisores/CreateTv";
import ViewTvs from "../components/televisores/ViewTvs";
import ViewTurnTv from "../components/televisores/ViewTurnTv";
import NewTable from "../components/table/NewTable";
import ComoponentUploadImg from "../components/televisores/ComoponentUploadImg";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verturnero/:id" element={<TakeTurn />} />
        <Route path="/verturnostv/:id" element={<ViewTurnTv />} />
        {/* Rutas para navegar al apartado de Dashboard */}
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
          <Route element={<Turnos />}>
            <Route path="/dashboard/turnos" element={<ViewTurnos />} />
            <Route path="/dashboard/crearturnero" element={<CreateTurnero />} />
            <Route path="/dashboard/roles" element={<ViewRoles />} />
            <Route path="/dashboard/botones" element={<ViewButtons />} />
          </Route>
          {/* Rutas para navegar al apartado de Televisores */}
          <Route element={<Televisor />}>
            <Route path="/dashboard/tv" element={<ViewTvs />} />
            <Route path="/dashboard/creartv" element={<CreateTv />} />
            <Route path="/dashboard/botones" element={<ViewButtons />} />
            <Route
              path="/dashboard/imagenes"
              element={<ComoponentUploadImg />}
            />
          </Route>
        </Route>
        {/* Esta ruta es para testear componentes */}
        <Route path="/test" element={<NewTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
