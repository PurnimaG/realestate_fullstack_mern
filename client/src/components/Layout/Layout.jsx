import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailsContext from '../../context/userDetailsContext'
import { useMutation } from 'react-query'
import { createHashRouter } from 'react-router-dom'
import { createUser } from '../../utils/api'
import useBookings from '../../hooks/useBookings'
import useFavourites from '../../hooks/useFavourites'

const Layout = () => {

  useBookings();
  useFavourites();

  const { isAuthenticated, user, getAccessTokenWithPopup} = useAuth0();
  const { setUserDetails } = useContext(UserDetailsContext);

  const {mutate} = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token)
  })

  useEffect(() => {

    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email"
        }
      })
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({...prev, token: res}));
      mutate(res);
    }
    
    isAuthenticated && getTokenAndRegister()
  }, [isAuthenticated]);


  return (
    <>  
        <div style={{ background: "var(--black)"}}>
            <Header />
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout
