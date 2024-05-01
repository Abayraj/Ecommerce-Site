import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    color: "#ffff",
    "& .MuiBadge-badge": {
      right: -3,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <>
      <header className="dark:bg-gray-900 w-screen p-5 sm:flex flex-col">
        <div>
          <h1 className="text-2xl font-bold text-white">PixelMart</h1>
        </div>
          <div className="relative">
            <input
              type="text"
              className="placeholder:pl-[40px] border-2 p-2 rounded-full sm:w-60 italic font-semibold bg-input-bg-color"
              style={{ textIndent: "40px" }}
              placeholder={t("search...")}
            />
            <SearchIcon className="absolute bottom-2 left-6" />
          </div>
        <div className="hidden sm:inline-block">
          <button className="rounded-full p-2 w-24 text-white">
            {t("login")}
          </button>
        </div>
        <div>
        <Link
                          to={`/signup`} 
                          className="hidden sm:inline-block border-2 rounded-full p-2 w-24 bg-slate-950 text-white"
                        >

                          SignUp
                        </Link>
          <button >
            {t("sign up")}
          </button>
        </div>
        <div className="mt-2 hidden sm:inline-block">
          <LanguageSelector  />
        </div>
        <div>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </div>
      </header>
    </>
  );
};
