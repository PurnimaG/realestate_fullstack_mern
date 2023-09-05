import React,  {useState, useContext } from 'react'
import {Modal, Button} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useMutation } from 'react-query';
import UserDetailsContext from '../../context/userDetailsContext';
import { bookVisit } from '../../utils/api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const BookingModal = ({opened, setOpen, propertyId, email}) => {

    const {userDetails , setUserDetails} = useContext(UserDetailsContext);
    const [value, setValue]  = useState(null);

    const handleBookingSuccess = () => {
        toast.success("You have booked your visit", {
          position: "bottom-right",
        });
        setUserDetails((prev) => ({
          ...prev,
          bookings: [
            ...prev.bookings,
            {
              id: propertyId,
              date: dayjs(value).format("DD/MM/YYYY"),
            },
          ],
        }));
      };

      console.log(userDetails, "userDetails");
    
      const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, userDetails.token),
        onSuccess: () => handleBookingSuccess(),
        onError: ({ response }) => toast.error(response.data.message),
        onSettled: () => setOpened(false),
      });

  return (
    <Modal
        opened={opened}
        setOpened={setOpen}
        title="Select your date of Visit"
        centered
        onClose={() => setOpen(false)}
    >
        <div className='flexColCenter'>
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value || isLoading} onClick={() => mutate()}>
                Book Visit
            </Button>
        </div>
    </Modal>
  )
}

export default BookingModal
