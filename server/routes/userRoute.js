import express from "express";
import { bookVisit, cancleBooking, createUser, getAllBookings, getAllFav, toFav } from "../controllers/userController.js";

const router = express.Router()

// route to register a user
router.post("/register", createUser);
// route to book visit
router.post("/bookVisit/:id", bookVisit);
// route to get all bookings
router.post("/allbookings", getAllBookings);
// route to cancle booking
router.post("/canclebooking/:id", cancleBooking);
// route to add or remove from fav list
router.post("/toFav/:rid", toFav)
// route ro get all fav propertirs
router.post("/getAllFav", getAllFav);

export { router as userRoute}