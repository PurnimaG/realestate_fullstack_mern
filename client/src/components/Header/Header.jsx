import React, { useState } from 'react';
import "./Header.css";
import {BiMenuAltRight} from 'react-icons/bi';
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthecheck from '../../hooks/useAuthCheck';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [modalOpened , setModalOpened ] = useState(false);
  const {validateLogin} = useAuthecheck();

  console.log(validateLogin());

  const handleAddPropertyClick = () => {
    if(validateLogin() ) {
      setModalOpened(true);
    }
  }

  const getMenuStyles = (showMenu) => {
    if(document.documentElement.clientWidth  <= 800) {
      return { right: !showMenu && "-100%"}
    }
  }

  return (
    <section className='h-wrapper'>
        <div className='h-container flexCenter paddings innerWidth'>
            <Link to="/">
              <img src="./logo.png" alt="logo"  width={60}/>
            </Link>
            
            <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
              <div className='h-menu flexCenter' style={getMenuStyles(showMenu)}>
                  
                  <NavLink to="/properties">Properties</NavLink>
                  
                  <a href='mailto:purnima.om.gurjar@gmail.com'>Contact</a>

                  <div onClick={handleAddPropertyClick}> Add Property </div>
                  <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
                  {
                    !isAuthenticated ? 
                    <button className='button' onClick={loginWithRedirect}> Login </button>
                    : <ProfileMenu user={user} logout={logout} />
                  }
                  
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
