import express from "express";

import {
  createSport,
  deleteSport,
  getSportById,
  getSports,
  updateSport,
} from "../controllers/sport.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/sports", getSports);
router.get("/sports/:id", getSportById);

// ---------------------  POST ---------------------
router.post("/createSport", verifyUser, createSport);

// ---------------------  PUT ---------------------
router.put("/updateSport/:id", verifyUser, updateSport);

// ---------------------  DELETE ---------------------
router.delete("/deleteSport/:id", verifyUser, deleteSport);

export default router;
