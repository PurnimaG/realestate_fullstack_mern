import React, { useState } from 'react';
import "./Header.css";
import {BiMenuAltRight} from 'react-icons/bi';
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const getMenuStyles = (showMenu) => {
    if(document.documentElement.clientWidth  <= 800) {
      return { right: !showMenu && "-100%"}
    }
  }

  return (
    <section className='h-wrapper'>
        <div className='h-container flexCenter paddings innerWidth'>
            <img src="./logo.png" alt="logo"  width={60}/>
            <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
              <div className='h-menu flexCenter' style={getMenuStyles(showMenu)}>
                  <a href=''>Residencies</a>
                  <a href=''>Our Values</a>
                  <a href=''>Contact Us</a>
                  <a href=''>Get Started</a>
                  <button className='button'>
                      <a href=''>Contactt</a>
                  </button>
              </div>
            </OutsideClickHandler>
            
            <div className='menu-icon' onClick={()=> setShowMenu((prev)=>!prev)}>
              <BiMenuAltRight size={30} />
            </div>
        </div>
        
    </section>
  )
}

export default Header
