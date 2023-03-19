const express = require("express");
const usersController = require("../controllers/users-controller");
const userController = require("../controllers/users-controller");
const usersRouter = express.Router();
const verifyJWT = require("../middleware/verifyJWT")

usersRouter.route("/logIn")
    .get( userController.logIn)
    
usersRouter.route("/register")
    .post( userController.register)

usersRouter.route("/updatePassword1")
    .put( userController.updatePassword1)

usersRouter.route("/updatePassword2")
    .get(userController.updatePassword2)

usersRouter.route("/updatePassword3")
    .put(userController.updatePassword3)

usersRouter.route("/CancelReceiptEmails/:id")
    .put(verifyJWT, userController.cancelReceiptEmails)

usersRouter.route("/receiptEmails/:id")
    .put(verifyJWT, userController.confirmReceiptEmails)

usersRouter.route("/emailToManager")
    .get(usersController.sendEmailToManger)

usersRouter.route("/emailToUsers")
    .get(verifyJWT,usersController.sendEmailToUsers)
    
usersRouter.route("/authorization")
    .put(verifyJWT, userController.updateUserAuthorization)

usersRouter.route("/usersList")
    .get(userController.getAllUsers)

    


module.exports = usersRouter;


