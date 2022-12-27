import express from "express";

import {
  createSport,
  deleteSport,
  getSportById,
  getSports,
  updateSport,
} from "../controllers/sport.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/sports", getSports);
router.get("/sports/:id", getSportById);

// ---------------------  POST ---------------------
router.post("/createSport", createSport);

// ---------------------  PUT ---------------------
router.put("/updateSport/:id", updateSport);

// ---------------------  DELETE ---------------------
router.delete("/deleteSport/:id", deleteSport);

export default router;
