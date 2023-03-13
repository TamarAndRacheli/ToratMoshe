const express = require("express");
const approvalsController = require("../controllers/approvals-controller");
const approvalRouter = express.Router();

//האם תמיד נכול לשלוח בבדי

approvalRouter.route("/corrections")
    .get(approvalsController.getAllCorrection) 
    .put(approvalsController.updateHandwriting)
    // .delete(approvalsController.deleteCorrection)

approvalRouter.route("/peirushim")
    .get(approvalsController.getAllPeirushim) 
    .delete(approvalsController.deletePeirush)
approvalRouter.route("/peirushim/:id")
    .get(approvalsController.getHandwritingByIdWithPeirushim)
    .put(approvalsController.approvePeirush)

approvalRouter.route("/comments")
    .get(approvalsController.getAllComments) 
    .delete(approvalsController.deleteComment)
approvalRouter.route("/comments/:id")
    .put(approvalsController.approveComment)
    .get(approvalsController.getComment)



module.exports = approvalRouter;