import express from "express";
import { bookVisit, cancleBooking, createUser, getAllBookings, getAllFav, toFav } from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router()

// route to register a user
router.post("/register", jwtCheck, createUser);
// route to book visit
router.post("/bookVisit/:id",jwtCheck, bookVisit);
// route to get all bookings
router.post("/allbookings", getAllBookings);
// route to cancle booking
router.post("/canclebooking/:id",jwtCheck, cancleBooking);
// route to add or remove from fav list
router.post("/toFav/:rid", jwtCheck, toFav)
// route ro get all fav propertirs
router.post("/getAllFav",jwtCheck, getAllFav);

export { router as userRoute}