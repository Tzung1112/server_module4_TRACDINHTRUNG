import express from "express";
import userController from "../../controllers/user.controller";
const Router=express.Router()

Router.post("/login", userController.login) 

Router.post("/", userController.register) 

export default Router;