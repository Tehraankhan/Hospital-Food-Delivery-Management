const express = require("express")

const UserRouter = express.Router();

const {signup ,signin}= require("../Controller/userController")

UserRouter.post("/signin",signin)

UserRouter.post("/signup",signup)


module.exports = UserRouter;
