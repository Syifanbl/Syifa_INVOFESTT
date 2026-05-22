import  { Router }  from "express";
import { createCategories, getCategories, deleteCategories, updateCategories } from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategories); // menyimpan data event 
router.delete("/:id", deleteCategories);
router.put("/:id", updateCategories);

export default router;