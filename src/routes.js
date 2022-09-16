import { Router } from "express";
import UserController from "./controllers/UserController.js";
import { protect, authRole } from "./middleware/authMiddleware.js";
import { ROLE } from "./schemas/role.js";

const routes = Router();

routes.get("/user", UserController.user);
routes.post("/newUser", UserController.createUser);
routes.get(
  "/allUser",
  protect,
  authRole([ROLE.DIRETOR]),
  UserController.allUser
);
routes.post("/login", UserController.login);
routes.post("/requestRecovery", UserController.requestRecoveryMail);
routes.post("/updatePassword", UserController.updatePassword);
routes.post(
  "/deleteUser:id",
  authRole([ROLE.DIRETOR]),
  UserController.deleteUser
);
routes.put(
  "/updateRole",
  protect,
  authRole([ROLE.DIRETOR]),
  UserController.editRoleUser
);
routes.post(
  "/acceptRequest/:userId",
  protect,
  authRole([ROLE.DIRETOR]),
  UserController.acceptRequest
);
routes.delete(
  "/deleteRequest/:userId",
  protect,
  authRole([ROLE.DIRETOR]),
  UserController.deleteRequest
);
routes.delete(
  "/setUnityAdmin",
  protect,
  authRole([ROLE.DIRETOR]),
  UserController.setUnityAdmin
);

export default routes;
