import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export const Header = () => {
    const { t } = useTranslation();
    const StyledBadge = styled(Badge)(({ theme }) => ({
      color: "#0D0C22",
      "& .MuiBadge-badge": {
        right: -3,
        top: 8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
        
      },
    }));
  return (
    <>
    
    <header className="bg-navbg  flex gap-5 justify-between h-24 sm:flex items-center sm:justify-around pt-6 px-4 md:px-6 lg:px-8 w-[100%]">
        <div>
            <h1 className="text-2xl font-bold ">PixelMart</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              className= "placeholder:pl-[40px] border-2 p-2 rounded-full sm:w-60 italic font-semibold bg-input-bg-color"
              style={{ textIndent: "40px" }}
              placeholder={t("search...")}
            />
            <SearchIcon className="absolute bottom-2 left-6" />
          </div>
        </div>
        <div className="hidden sm:inline-block">
          <button className="rounded-full p-2 w-24 text-black">
          {t("login")}
          </button>
        </div>
        <div>
          <button className="border-2 rounded-full p-2 w-24 bg-slate-950 text-white">
          {t("sign up")}
          </button>
        </div>
        <div className="mt-2">
          <LanguageSelector />
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
