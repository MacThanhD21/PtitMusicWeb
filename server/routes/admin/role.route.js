const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",controller.createPost);
router.delete("/delete/:id",controller.deleteItem);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",controller.editPatch);
router.get("/permissions",controller.permission);
router.patch("/permissions",controller.permissionPatch);
module.exports = router;