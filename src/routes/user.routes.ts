import express from "express"
import { getUserHandler } from "../controllers/user.controller"

const router = express.Router()

// Get all closed tickets
router.route("/:id").get(getUserHandler)

export default router
