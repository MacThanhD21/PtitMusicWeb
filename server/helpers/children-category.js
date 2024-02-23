const ProductCategory = require("../models/product-category.model");
module.exports.getChildren = async (parentId) =>{
    let result = []
    const findChildren = async (parentId) => {
        const childrenCategory = await ProductCategory.find({
            deleted: false,
            status: "active",
            parent_id: parentId
        });
        for(const item of childrenCategory){
            result.push(item);
            findChildren(item.id);
        }
    }
    await findChildren(parentId);
    return result;
}