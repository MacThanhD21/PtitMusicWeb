const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/create-tree");
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    };
    
    const records = await ProductCategory.find(find);
    for(const record of records){
        const createdUser = await Account.findOne({_id: record.createdBy.account_id});
        if(createdUser){
            record.createdBy.fullName = createdUser.fullName;
        }

        const updatedBy = record.updatedBy.slice(-1)[0];
        if(updatedBy){
            const updatedUser = await Account.findOne({_id: updatedBy.account_id});
            updatedBy.fullName = updatedUser.fullName;
        }
    }
    const newRecords = createTreeHelper.create(records);
    res.render("admin/pages/product-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
}
module.exports.create = async (req,res) => {

    let find = {
        deleted: false
    };
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.create(records);

    res.render("admin/pages/product-category/create",{
        pageTitle: "Tạo danh mục",
        records: newRecords
    });
}

module.exports.createPost = async(req,res) =>{

    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments({});
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {account_id: res.locals.user.id};
    try{ 
        await ProductCategory.create(req.body);
        req.flash("success", "Tạo danh mục thành công");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
    catch(error){
        req.flash("error","Tạo danh mục thất bại");
        res.redirect("back");
    }
}

module.exports.edit = async (req,res) => {

    const records = await ProductCategory.find({deleted: false});
    const newRecords = createTreeHelper.create(records);
    let find = {
        deleted: false,
        _id: req.params.id
    };
    const data = await ProductCategory.findOne(find);

    res.render("admin/pages/product-category/edit",{
        pageTitle: "Tạo danh mục",
        records: newRecords,
        data:data
    });
}

module.exports.editPatch = async (req,res) => {
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    };
    try{
        req.body.positon = parseInt(req.body.positon);

        await ProductCategory.updateOne({_id: req.params.id},{
            ...req.body,
            $push:{updatedBy:updatedBy}
        });
        req.flash("success","Cập nhật thành công");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
    catch(error){
        req.flash("error","Cập nhật thất bại");
        res.redirect("back");
    }
}

module.exports.deleteItem = async (req, res) =>{
    try{
        await ProductCategory.updateOne({_id : req.params.id},{
            deleted: true, 
            deletedBy:{
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        });
        req.flash("success","Xóa thành công");
    }
    catch(error){
        console.log(error);
        req.flash("error","Xóa không thành công");
    }   
    res.redirect("back");
}

module.exports.changeStatus = async (req, res) => {
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    };
    try{
        const status = req.params.status;
        const id = req.params.id;
        await ProductCategory.updateOne({_id:id},{
            status: status,
            $push:{updatedBy:updatedBy}
        });
        req.flash("success","Cập nhật trạng thái thành công");
    }
    catch(error){
        req.flash("error","Cập nhật trạng thái không thành công");
    }
    res.redirect("back");
}
