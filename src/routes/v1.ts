import express from "express";
const Router=express.Router();

import userApi from "./apis/user.api";
Router.use("/users", userApi)

import authenApi from "./apis/auth.api";
Router.use("/auth",authenApi)

export default Router;