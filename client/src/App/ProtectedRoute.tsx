import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AxiosCall from "../utils/AxiosCall";
import { useAppDispatch } from "../Redux/Hooks";
import { getUser } from "../Redux/slices/auth";

function ProtectedRoute() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const user = JSON.parse(
      localStorage.getItem("access_current_user") as string
    );
    if (!user) {
      navigate("/login");
    }
    const data = await AxiosCall({
      Url: "/api/auth/user/authenticate",
      Method: "Get",
      Headers: {
        token: user.accessToken,
      },
    });

    if (!data.success) {
      navigate("/login");
    }

    dispatch(getUser(user.accessToken));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;
