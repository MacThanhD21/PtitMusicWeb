const express = require("express");
const router = express.Router();
const multer  = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category-validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",upload.single("thumbnail"),validate.checkFormCreate,uploadCloud.upload,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single("thumbnail"),validate.checkFormEdit,uploadCloud.upload,controller.editPatch);
router.delete("/delete/:id",controller.deleteItem);
router.patch("/change-status/:status/:id",controller.changeStatus);
module.exports = router;