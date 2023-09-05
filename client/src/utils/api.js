import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
    // baseURL: "http://localhost:8000/api"
    baseURL: "https://realestate-fullstack-mern.vercel.app//api"
});

export const getAllProperties = async() => {
    try{

        //api call from server
        const response = await api.get("/residency/all", {
            timeout: 10 * 1000,
        })

        if( response.status === 400 || response.status === 500 ) {
            throw response.data;
        } 

        return response.data;

    } catch(error) {
        toast.error("Something went wrong");
        throw error;
    }
}

export const getProperty = async(id) => {
    
    try {

        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000
        })

        if( response.status === 400 || response.status === 500) {
            throw response.data;
        }

        return response.data;

    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}


export const createUser = async (email, token) => {
    try {   
        await api.post(`/user/register`, {email}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch(error) {
        toast.error("Something went wronf, Please try again");
        throw error;
    }
}

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id: propertyId,
            date: dayjs(date).format("DD/MM/YYYY")
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
     )
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
}

export const removeBooking = async (propertyId, email, token) => {
    try {   

        await api.post(`/user/canclebooking/${propertyId}`, {
            email,
            id: propertyId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      )

    } catch (error) {
        toast.error("Somthing went wrong")
        throw error;
    }
}

export const getAllBookings = async (email, token) => {
    if(!token) return 
  try {
    const res = await api.post(
      `/user/allbookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data, "booked visits");
    return res.data["bookedVisits"];

    
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error
  }
}

export const toFav = async (id, email, token) => {
    try {
        const res = await api.post(`/user/toFav/${id}`, {
            email
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )

    } catch (error) {
        toast.error("Something went wrong");
        throw toast;
    }
}

export const getAllFav = async(email, token) => {
    if(!token) return
    try {

        const res = await api.post(`/user/getAllFav`, {
            email
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data["favResidenciesID"]

    } catch (error) {
        toast.error("Something went wrong");
        throw error
    }
}

export const createResidency = async (data, token) => {
    try {

        const res = await api.post(`/residency/create`,{
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        

    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}

