import React, { useRef } from "react";
// import {Link} from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';


const Header = () => {
  const { t } = useTranslation();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    color: '#febd69',
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
<>
  <div className="bg-navbg flex h-24 sm:flex items-center justify-between sm:justify-around pt-6 px-4 md:px-6 lg:px-8">
    <div>
      <h1 className="text-2xl sm:text-4xl font-medium">pixelMart</h1>
    </div>
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <div className="relative">
        <input
          type="text"
          className="placeholder:pl-[40px] border-2 p-2 rounded-full w-60 italic font-semibold bg-input-bg-color"
          style={{ textIndent: '40px' }}
          placeholder={t('search...')}
        />
        <SearchIcon className="absolute bottom-2 left-6" />
      </div>
      <div className="hidden sm:inline-block">
        <button className="rounded-full p-2 w-24 text-black">
          {t('login')}
        </button>
        <button className="border-2 rounded-full p-2 w-24 bg-slate-950 text-white">
          {t('sign up')}
        </button>
        <LanguageSelector />
      </div>
      <div className="mt-2">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </div>
  </div>
</>

  );
};

export default Header;
