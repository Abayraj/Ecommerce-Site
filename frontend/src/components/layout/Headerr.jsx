import React from 'react'
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search"
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
const Headerr = () => {
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
            <header className='bg-gray-700 flex p-4  items-center justify-around sm:gap-20 sticky top-0 z-10'>
                <div className='mt-1'>
                    <h1 className='text-2xl font-medium'>PixelMart</h1>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        className="placeholder:pl-[40px] rounded-full border-2 sm:p-2  sm:w-80 italic font-semibold bg-input-bg-color"
                        style={{ textIndent: "45px" }}
                        placeholder={t("search...")}
                    />
                    <SearchIcon className="absolute top-1 sm:top-3 left-6" />
                </div>
                <div>
                    <button className='hidden sm:inline-block border-2 rounded-full p-2 w-24 bg-slate-950 text-white'> {t("sign up")}</button>
                </div>
                <div className="mt-2 hidden sm:inline-block">
                    <LanguageSelector />
                </div>
                <div className='hidden sm:inline-block'>
                    <StyledBadge badgeContent={4} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </div>
                <div className='inline-block sm:hidden'>
                    <Sidebar />
                </div>

            </header>
        </>
    )
}

export default Headerr
