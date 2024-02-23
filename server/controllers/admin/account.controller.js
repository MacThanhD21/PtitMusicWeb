const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination");
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    };

    const totalItem = await Account.countDocuments(find);
    let paginationObject = paginationHelper(1, 4, req.query, totalItem);
    paginationObject.totalItem = totalItem;

    const records = await Account.find(find).select("-password -token").limit(paginationObject.limitItem).skip(paginationObject.skip);
    for(const record of records){
        const role = await Role.findOne({_id: record.role_id, deleted: false});
        record.role = role;

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
    res.render("admin/pages/account/index",{
        pageTitle: "Danh sách tài khoản",
        records: records,
        pagination: paginationObject
    });
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };
    const roles = await Role.find(find);
    res.render("admin/pages/account/create",{
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    })
}

module.exports.createPost = async (req, res) => {
    
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    if(emailExist){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
    }
    else{
        req.body.password = md5(req.body.password);
        req.body.createdBy = {account_id: res.locals.user.id};
        try{
            await Account.create(req.body);
            req.flash("success","Tạo mới tài khoản thành công");
        }
        catch(error){
            req.flash("error","Tạo mới tài khoản không thành công");
        }
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const data = await Account.findOne({_id: id, deleted: false});
    const roles = await Role.find({deleted: false});
    res.render("admin/pages/account/edit",{
        pageTitle: "Cập nhật tài khoản",
        data: data,
        roles: roles
    });
}

module.exports.editPatch = async (req,res) =>{
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id: { $ne: id},
        email: req.body.email,
        deleted: false
    });
    if(emailExist){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
    }
    else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }
        else{
            delete req.body.password;
        }
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        };
        try{
            await Account.updateOne({_id: id},{
                ...req.body,
                $push:{updatedBy:updatedBy}
            });
            req.flash("success","Cập nhật tài khoản thành công");
        }
        catch(error){
            req.flash("error","Cập nhật tài khoản không thành công");
        }
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.delete = async (req,res) =>{
    const id = req.params.id;
    try{
        await Account.updateOne({_id: id},{
            deleted: true, 
            deletedAt:{
                account_id: res.locals.user.id,
                deletedBy: new Date()
            }
        });
        req.flash("success","Xóa thành công");
    }
    catch(error){
        req.flash("Xóa thất bại");
    }
    res.redirect("back");
}

module.exports.changeStatus = async (req,res) =>{
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    };
    try{
        await Account.updateOne({_id: id},{
            status: status,
            $push:{updatedBy:updatedBy}
        });
        req.flash("success", "Cập nhật tài khoản thành công");
    }
    catch(error){
        req.flash("error", "Cập nhật tài khoản thất bại");
    }
    res.redirect("back");
}