import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useDispatch, useSelector } from "react-redux";
import { getuserCartProducts } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { currentUser } from "../../features/user/userSlice";
import SignupController from "../../controllers/AuthController.js/signupController";
const Headerr = () => {
  const { t } = useTranslation();
  const {handlelogOut} = SignupController();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    color: "#ffff",
    "& .MuiBadge-badge": {
      right: -5,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (!user) {
      dispatch(currentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      dispatch(getuserCartProducts());
    }
  }, [dispatch, user]);

  console.log(count, "count");

  return (
    <>
      <header className="flex p-4  items-center justify-around bg-white  sticky top-0 z-10 ">
        <div className="mt-1">
          <Link to={"/"}>
            <h1 className="text-2xl font-medium">SimplyShop</h1>
          </Link>
        </div>
        <div className="relative hidden sm:block">
          <input
            type="text"
            className="placeholder:pl-[40px] rounded-full border-2 sm:p-2  sm:w-80 italic font-semibold bg-input-bg-color"
            style={{ textIndent: "45px" }}
            placeholder={t("search...")}
          />
          <SearchIcon className="absolute top-1 sm:top-3 left-6" />
        </div>
        <div>
          <div className="auth flex items-center gap-5">
          {user && Object.keys(user).length !== 0 ? (
              <>
                <Link
                  to="/signup"
                  className="bg-gray-900 text-gray-200 py-2 px-3 rounded hover:bg-gray-800 hover:text-gray-100"
                >
                  Sign up for free
                </Link>
                <button
                  className="bg-transparent text-black p-2  rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
                  onClick={handlelogOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent text-black p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-900 text-gray-200 py-2 px-3 rounded hover:bg-gray-800 hover:text-gray-100"
                >
                  Sign up for free
                </Link>
              </>
            )}
          </div>
       
        </div>
        <div className="hidden  ">
          <LanguageSelector className="hidden" />
        </div>
        <div className="">
          <StyledBadge badgeContent={count} color="primary">
            <ShoppingCartIcon style={{ color: "blue" }} />
          </StyledBadge>
        </div>
        <div className="lg:hidden ">
          <Sidebar />
        </div>
      </header>
    </>
  );
};

export default Headerr;
