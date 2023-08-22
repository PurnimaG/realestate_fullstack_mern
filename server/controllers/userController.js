import asyncHandler from 'express-async-handler';
import {prisma} from '../config/prismaConfig.js';

export const createUser = asyncHandler(async(req, res ) => {
    console.log("creating user ");

    let {email} = req.body;

    // Check if user esists 
    const userExists = await prisma.user.findUnique({where: {email : email}});

    // if not create one
    if(!userExists) {
        //Create user document inside user collection
        const user = await prisma.user.create({ data: req.body});
        res.send({
            message: "User registered successfully",
            user: user
        })
    } else {
        res.status(201).send({message: "User already registered"});
    }

    console.log(email);
});

// Function to book visit 
export const bookVisit = asyncHandler(async(req, res) =>{
    const { email, date } = req.body;
    const { id } = req.params;

    try {
        //Check if user already booked a visit

        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true },
          });

        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({message: "This residency already booked by you"});        
        } else {
            // update data in booked visits field
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: { push: { id, date } },
                },
            });
            res.send("Your visit is booked successfully");
        }

    } catch (err) {
        throw new Error(err.message);
    }
});

// Function to get all the bookings
export const getAllBookings = asyncHandler(async(req, res) => {
    const { email } = req.body;

    try {
        //get the booked visits for the given email 
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {
                bookedVisits: true
            }
        })
        res.status(200).send(bookings);

    } catch (err) {
        throw new Error(err.message);
    }
});

//Function to cancle booking
export const cancleBooking = asyncHandler(async(req, res) => {

    const { email } = req.body;
    const { id } = req.params;

    try {

        //get user with all booked visits for the email
        const user = await prisma.user.findUnique({
            where: {email},
            select: { bookedVisits :  true}
        });

        //get the index of given property id in booked visits
        const index = user.bookedVisits.findIndex((visit) => visit.id === id);

        if(index === -1) {
            res.status(404).json({message: "booking not found"});
        } else {
            // delete one element for the index
            user.bookedVisits.splice(index, 1);

            //update user booked visit record with the new array
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            });

            res.status(200).send("Booking cancled successfully"); 
        }

    } catch (err) {
        throw new Error(err.message);
    }
});

//Function to add prperty in fav list
export const toFav = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const {rid} = req.params;

    try {

        //get user data for the email 
        const user = await prisma.user.findUnique({
            where: {email}
        });

        //check if property id exixts in fav list, if its available remove from the list else add
        if(user.favResidenciesID.includes(rid)) {
            const updatedUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message: "Removed from fav list", user: updatedUser});
        } else {
            const updatedUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            });

            res.send({message: "Update fav lits", user: updatedUser});
        }

    } catch(err) {
        throw new Error(err.message);
    }
});

//Function to get all fav properties
export const getAllFav = asyncHandler(async(req, res) => {

    const {email} = req.body;

    try {

        const favRes = await prisma.user.findUnique({
            where: {email},
            select: {
                favResidenciesID: true
            }
        })

        res.status(200).send(favRes);

    } catch (err) {
        throw new Error(err.message);
    }

})
