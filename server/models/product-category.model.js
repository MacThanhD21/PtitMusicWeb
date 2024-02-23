const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    createdBy:{
        account_id: String,
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    deletedBy:{
        account_id: String,
        deletedAt: Date
    },
    updatedBy:[
        {
            account_id: String,
            updatedAt: Date
        }
    ]
});

const Product = mongoose.model("ProductsCategory", productCategorySchema, "products-category");

module.exports = Product;