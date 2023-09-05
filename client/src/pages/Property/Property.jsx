import React, { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import './Property.css';
import { useMutation, useQuery } from 'react-query';
import { getProperty, removeBooking } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart } from 'react-icons/ai';
import { FaShower } from 'react-icons/fa';
import { AiTwotoneCar } from 'react-icons/ai';
import { MdLocationPin, MdMeetingRoom }  from 'react-icons/md';
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import UserDetailsContext from '../../context/userDetailsContext';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import Heart from '../../components/Heart/Heart';

const Property = () => {
  const {propertyId} = useParams();
  
  const {data, isLoading, isError} = useQuery(["resd", propertyId], () => getProperty(propertyId) );

  const [modalOpen, setModalOpen] = useState(false);
  const { validateLogin } = useAuthCheck();
  const {user} = useAuth0(); 

  const {userDetails : { token, bookings }, setUserDetails} = useContext(UserDetailsContext);

  const {mutate: cancelBooking, isLoading: canceling} = useMutation({
    mutationFn: () => removeBooking(propertyId, user?.email, token), 
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev, 
        bookings: prev.bookings.filter((booking) => booking?.id != propertyId)
      }))

      toast.success("Booking Cancled", {position: 'bottom-right'});
    }
  })

  if(isLoading) {
    return(
      <div className='wrapper'> 
        <div className='flexCenter paddings'>
          <PuffLoader />
        </div>
      </div>
    )
  }

  if(isError) {
    return(
      <div className='wrapper'>
        <div className='flexCenter paddings'>
          Error while fetching the property details
        </div>
      </div>
    )
  }

console.log(bookings, "bookings");

  return (
    <div className='wrapper'>
      <div className='flexColStart paddings innerWidth property-container'>

          {/* Like Buttons */}
          <div className='like'>
            <Heart id={propertyId} />
          </div>

          {/* Image */}
          <img src={data?.image} alt="home image" />

          <div className='flexCenter property-details'>

            <div className='flexColStart left'>
              <div className='flexStart head'>
                <span className='primaryText'>{data.title}</span>
                <span className='orangeText' style={{fontSize: '1.5rem'}}>$ {data.price}</span>
              </div>

              <div className='flexStart facilities'>
                <div className='flexStart facility'>
                  <FaShower size={20} color="#1f3e72" />
                  <span>{data?.facilities.bathrooms} Bathrooms</span>
                </div>
                <div className='flexStart facility'>
                  <AiTwotoneCar size={20} color="#1f3e72" />
                  <span>{data?.facilities.parking} Parkings</span>
                </div>
                <div className='flexStart facility'>
                  <MdMeetingRoom ize={20} color="#1f3e72" />
                  <span>{data?.facilities.bedrooms} Rooms</span>
                </div>
              </div>

              <span className='secondaryText' style={{textAlign: "justify"}}>
                {data?.description}
              </span>

              <div className='flexStart' style={{gap: "1rem"}}>
                <MdLocationPin size={25} />
                <span className='secondaryText'>
                  {data?.address}
                  {data?.city}
                  {data?.country}
                </span>
              </div>

              {
                bookings && bookings.map((booking) => booking.id).includes(propertyId) ? (
                  <>
                    <Button w={"100%"} color="red" onClick={() => cancelBooking()}>
                    Cancle Booking
                    </Button>
                    <span>Your visit already booked for the date {bookings.filter((booking) => booking?.id === propertyId)[0].date}</span>
                  </>
                ) : (
                  <button className='button' onClick={() => {
                    validateLogin() && setModalOpen(true);
                  }}>
                    Book your visits
                  </button> 
                )
              }


              <BookingModal 
                opened={modalOpen}
                setOpen={setModalOpen}
                propertyId={propertyId}
                email= { user?.email}
              />
            </div>  

            <div className='map'>
              <Map 
                address={data?.address} 
                city={data?.city} 
                country={data?.country} 
                
              />

            </div>
          </div>
        </div>
    </div>
  )
}

export default Property
