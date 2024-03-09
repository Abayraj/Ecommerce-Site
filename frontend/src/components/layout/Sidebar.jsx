import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const CustomBurgerIcon = () => <img src="path/to/your/icon.png" />;

const Sidebar = () => {
  var styles = {
    
    bmBurgerButton: {
      position: 'relative',
      top:'2px',
      width: '20px',
      height: '20px'

   
    },
    
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'none'
    }
  }
  return (
    <Menu styles={ styles }isOpen={true} width={ '310px' } right>  
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/about">About</a>
      <a id="contact" className="menu-item" href="/contact">Contact</a>
    </Menu>
  );
};

export default Sidebar;
