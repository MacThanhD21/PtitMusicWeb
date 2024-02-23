const express = require("express");
const router = express.Router();
const multer  = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud");
const validate = require("../../validates/admin/account-validate");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",upload.single("avatar"),validate.checkFormCreate,uploadCloud.upload,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single("avatar"),validate.checkFormEdit,uploadCloud.upload,controller.editPatch);
router.delete("/delete/:id",controller.delete);
router.patch("/change-status/:status/:id",controller.changeStatus);
module.exports = router;