import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loader/Loading";

import { MdOutlineLogout } from "react-icons/md";
import { useAppSelector } from "../../Redux/Hooks";
// import { LoginUser } from "../../Redux/slices/auth";

function Header() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showProfilePopUp, setProfilePopUp] = useState(false);
  const { currentUser } = useAppSelector((state) => state.UserReducer);

  const Logout = () => {
    setLoading(true);

    setTimeout(async () => {
      localStorage.clear();
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <Loading size={30} />
        </div>
      ) : (
        <header
          className="py-8 bg-[#4b4b6d]"
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <nav className="max-width flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-16 h-16 bg-[#68b3dc] text-white text-[2.5rem] font-bold flex justify-center items-center rounded-full">
                A
              </span>
              <h2 className="text-[2rem] font-semibold">ccuknox</h2>
            </div>

            <ul className="flex gap-4 items-center">
              <li
                className="cursor-pointer relative"
                onClick={() => setProfilePopUp(!showProfilePopUp)}
              >
                <img
                  src={currentUser.profile}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
                {showProfilePopUp && (
                  <div className="absolute top-14 rounded-md -left-10 bg-slate-200 w-[150px] rounded  text-[#3d3d3d] text-[1.4rem] font-medium">
                    <h2 className="hover:bg-gray-300 px-5 py-2">
                      {currentUser.username}
                    </h2>
                    <Link
                      className="hover:bg-gray-300 px-5 py-2 w-full inline-block"
                      to={""}
                    >
                      {currentUser.email}
                    </Link>
                  </div>
                )}
              </li>

              <li
                className="cursor-pointer flex gap-2 items-center"
                onClick={Logout}
                title="logout"
              >
                <span className="text-[1.4rem]">Logout</span>
                <MdOutlineLogout size={24} />
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default Header;
