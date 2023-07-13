import localforage from "localforage";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { permissionsPages } from "./rolesConfig";
import { Box } from "@mui/material";
import Loading2 from "../animations/Loading2";

const routePermissions = {
  "/dashboard/consultorios": "canViewConsulting",
};

const RolesAuth = ({ children }) => {
  const currentRoute = useLocation().pathname;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localforage.getItem("user").then((res) => {
      setUser(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  useEffect(() => {
    // Si todavía está cargando o el usuario aún no ha sido cargado, no hacemos nada
    if (isLoading || user === null) {
      return;
    }

    // Si el usuario ya ha sido cargado, verificamos los permisos
    const roleId = user.user?.roleId;
    const currentPermissions = routePermissions[currentRoute];

    if (!permissionsPages?.[roleId]?.[currentPermissions]) {
      navigate(permissionsPages[roleId]?.routerDefault); // redirige a una ruta por defecto si no tiene permisos
    }
  }, [isLoading, user, currentRoute, navigate]);

  // Si el usuario aún no ha sido cargado, no renderizamos nada
  if (isLoading || user === null) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        sx={{ height: "100vh" }}
      >
        <Loading2 />
      </Box>
    );
  }

  return <div>{children}</div>;
};

export default RolesAuth;
