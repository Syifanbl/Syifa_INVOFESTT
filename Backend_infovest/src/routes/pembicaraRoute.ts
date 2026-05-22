import express from "express";
import { getPembicara, createPembicara, showPembicara, deletePembicara, updatePembicara } from "../controllers/pembicaraController.js";

const router = express.Router();

router.get("/", getPembicara);
router.get("/:id", showPembicara);
router.post("/", createPembicara);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);

export default router;




