import { Router } from "express";
import UserController from "./controllers/UserController.js";
import RoleController from "./controllers/RoleController.js";
import { protect, canCreateUser } from "./middleware/authMiddleware.js";

const routes = Router();

routes.get("/user", UserController.user);
routes.post("/newUser", protect, canCreateUser, UserController.createUser);
routes.get("/allUser", protect, UserController.allUser);
routes.post("/login", UserController.login);
routes.post("/requestRecovery", UserController.requestRecoveryMail);
routes.post("/updatePassword", UserController.updatePassword);
routes.post("/acceptUser", UserController.acceptUser);

routes.get("/newRole", protect, RoleController.createRole);
routes.get("/Role", protect, RoleController.allRoles);
routes.post("/deleteRole", protect, RoleController.deleteRole);
routes.put("/editRole", protect, RoleController.editRole);

//criar rota que mostrará todas as permissões

export default routes;
