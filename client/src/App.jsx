import './App.css';
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Layout from './components/Layout/Layout';
import Properties from './pages/Properties/Properties';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Property from './pages/Property/Property';
import UserDetailsContext from './context/userDetailsContext';
import Bookings from './pages/Bookings/Bookings';
import Favourites from './pages/Favourites/Favourites';


function App() {

  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null 
  })
 
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails}} >
      <QueryClientProvider client={queryClient}>
       <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  {/* IF no id given in the url render properties page else remder propery page with details */}
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
              
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
