import express from "express";

import {
  createSport,
  deleteSport,
  getSportById,
  getSports,
  sportsUser,
  updateSport,
} from "../controllers/sport.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/sports", getSports);
router.get("/sports/:id", getSportById);
router.get("/sports/users/:id", sportsUser);
// ---------------------  POST ---------------------
router.post("/createSport", createSport);

// ---------------------  PUT ---------------------
router.put("/updateSport/:id", updateSport);

// ---------------------  DELETE ---------------------
router.delete("/deleteSport/:id", deleteSport);

export default router;
