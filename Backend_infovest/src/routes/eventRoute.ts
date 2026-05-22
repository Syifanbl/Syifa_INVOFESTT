import  express  from "express";
import { createEvent, getEvents, deleteEvent, showEvent, updateEvent } from "../controllers/eventController.js";


const router = express.Router();

router.get("/" ,getEvents);
router.post("/", createEvent); // menyimpan data event 
router.delete("/:id", deleteEvent);
router.get("/:id", showEvent);
router.put("/:id", updateEvent);

export default router;
