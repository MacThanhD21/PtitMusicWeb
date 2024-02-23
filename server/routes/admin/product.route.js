const express = require("express");
const router = express.Router();
const multer  = require("multer");
const upload = multer();

const productValidate = require("../../validates/admin/product-validate");
const controller = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud");

router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
router.get("/create",controller.create);
router.post("/create",upload.single("thumbnail"),productValidate.checkFormCreate,uploadCloud.upload,controller.createProduct);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single("thumbnail"),productValidate.checkFormEdit,uploadCloud.upload,controller.editProduct);
module.exports = router;