import express from "express";
import { createResidency, getAllResidency, getResidencyById } from '../controllers/residencyController.js';

const router = express.Router()

// route to register a user
router.post("/create", createResidency);

// route to get all residencies
router.get("/all", getAllResidency);

// route to get residency by id
router.get("/:id", getResidencyById);

export { router as residencyRoute}