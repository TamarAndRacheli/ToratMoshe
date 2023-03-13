const express = require("express");
const handwritingController = require("../controllers/handwriting-controller");
const handwritingRouter = express.Router();


handwritingRouter.route("/")
    .post(handwritingController.addHandwriting)
    .delete(handwritingController.deleteHandwrting)
handwritingRouter.route("/folder/:id")
    .get(handwritingController.getHandwritingsDesByFolderId)
handwritingRouter.route("/:id")
    .get(handwritingController.getHandwritingByIdWithPeirushim)
    .put(handwritingController.updateDescription)
handwritingRouter.route("/:id")// אפשר לשלוח שתי פרמטרים בנתיב?
    .put(handwritingController.updatePath)
handwritingRouter.route("/peirushim")
    .post(handwritingController.addPeirush)
handwritingRouter.route("/comments")
    .get(handwritingController.getAllComments) 
    .post(handwritingController.addComment)
handwritingRouter.route("/corrections")
    .post(handwritingController.addCorrections)

module.exports = handwritingRouter;