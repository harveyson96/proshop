import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
  getUserbyId,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";
const router = express.Router();


router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router
.route("/profile")
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

router
  .route("/:id")
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserbyId)
  .delete(protect, admin, deleteUser);
export default router;
