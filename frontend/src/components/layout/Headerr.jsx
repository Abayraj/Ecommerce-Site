import React, { useEffect } from 'react'
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search"
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useDispatch, useSelector } from 'react-redux';
import { getuserCartProducts } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
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

    const dispatch = useDispatch();
    const {count} = useSelector((state) => state.cart);
    console.log(count,"count")
  
    useEffect(() => {
      dispatch(getuserCartProducts());
    }, [dispatch]);
    return (

        <>
            <header className='flex p-4  items-center justify-around bg-white  sticky top-0 z-10 '>
                <div className='mt-1'>
                    <h1 className='text-2xl font-medium'>SimplyShop</h1>
                </div>
                <div className="relative hidden sm:block">
                    <input
                        type="text"
                        className="placeholder:pl-[40px] rounded-full border-2 sm:p-2  sm:w-80 italic font-semibold bg-input-bg-color"
                        style={{ textIndent: "45px" }}
                        placeholder={t("search...")}
                    />
                    <SearchIcon className="absolute top-1 sm:top-3 left-6"/>
                </div>
                <div>
                <Link
                          to={"/signup"} 
                          className="hidden sm:inline-block border-2 rounded-full p-2 text-center w-24 bg-slate-950 text-white"
                        >
                            {t("signUp")}
                        </Link>
                </div>
                <div className="hidden  ">
                    <LanguageSelector className="hidden" />
                </div>
                <div className=''>
                    <StyledBadge badgeContent={count} color="primary" >
                        <ShoppingCartIcon  style={{ color: 'blue' }}   />
                    </StyledBadge>
                </div>
                <div className='lg:hidden '>
                    <Sidebar />
                </div>

            </header>
        </>
    )
}

export default Headerr
