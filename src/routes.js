import { Router } from "express";
import UserController from "./controllers/UserController.js";

const routes = Router();

routes.get("/user", UserController.user);
routes.post("/newUser", UserController.createUser);

export default routes;
