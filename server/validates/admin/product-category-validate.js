module.exports.checkFormCreate = (req,res,next)=>{
    if(req.body.title && req.file){
        next();
    }
    else{
        req.flash("error","Tạo danh mục thất bại");
        res.redirect("back");
    }
}
module.exports.checkFormEdit = (req,res,next)=>{
    if(req.body.title && req.body.position != ""){
        next();
    }
    else{
        req.flash("error","Cập nhật không thành công");
        res.redirect("back");
    }
}