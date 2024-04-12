import React from "react";

import Header from "../../Components/Header/Header";
import "./Home.scss";
import { useAppSelector } from "../../Redux/Hooks";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.UserReducer);
  return (
    <>
      <Header />
      <main className="home-main-container">
        <div>
          <img
            src={currentUser.profile}
            alt=""
            className="w-32 h-32 rounded-full"
          />
        </div>
        <h2 className="text-center text-[4rem] text-gray-900 font-semibold">
          Welcome{" "}
          <span className="text-orange-400">{currentUser.username}</span>
        </h2>
        <Link
          to={`mailto:${currentUser.email}`}
          className="text-[1.6rem] inline-block underline
        "
        >
          {currentUser.email}
        </Link>
      </main>
    </>
  );
};
