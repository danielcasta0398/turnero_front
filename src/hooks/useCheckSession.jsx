import { useLocation, useNavigate } from "react-router-dom";
import { getDataStorage } from "../utils/getDataStorage";

export const useCheckSession = async (Ids, path, redirectTo = null) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = (await getDataStorage("user")) || {};

  const dashboardRoutes = {
    1: "/dashboard",
    2: "/dashboard/turnos",
    3: `/verturnostv/${user?.id}`,
    4: `/verturnero/${user?.id}`,
    5: `/dashboard/turnos`,
  };

  if (user) {
    if (currentPath === "/login") {
      return navigate(dashboardRoutes[user.roleId]);
    }
  }

  if (currentPath === "/login") return;

  if (currentPath === path) {
    const {
      user: { roleId },
    } = await getDataStorage("user");

    const existId = Ids.find((id) => id === roleId);

    if (!existId) {
      redirectTo ? navigate(redirectTo) : navigate("/login");
    }
  }
};
