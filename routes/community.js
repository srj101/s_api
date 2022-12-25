import express from "express";

import { getCommunites } from "../controllers/community.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/comunites", getCommunites);

// ---------------------  POST ---------------------

// ---------------------  PUT ---------------------

// ---------------------  DELETE ---------------------

export default router;
