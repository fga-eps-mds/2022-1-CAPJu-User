import { Router } from "express";
import UserController from "./controllers/UserController.js";
import { protect } from "./middleware/authMiddleware.js";
import { ROLE } from "./schemas/role.js";

const routes = Router();

routes.get("/user", UserController.user);
routes.post("/newUser", UserController.createUser);
routes.get("/allUser", protect, UserController.allUser);
routes.post("/login", UserController.login);
routes.post("/requestRecovery", UserController.requestRecoveryMail);
routes.post("/updatePassword", UserController.updatePassword);
routes.put("/updateRole", protect, UserController.editRoleUser);

export default routes;
